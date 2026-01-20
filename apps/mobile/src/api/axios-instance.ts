import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { storage } from '../lib/storage';
import { router } from 'expo-router';

// Production ve development URL'leri
const API_URLS = {
  production: process.env.EXPO_PUBLIC_API_URL_PRODUCTION || 'https://calmet.vercel.app/api/v1',
  development: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
};

const BASE_URL = __DEV__ ? API_URLS.development : API_URLS.production;

// Token refresh durumunu takip et
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  config: InternalAxiosRequestConfig;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.config.headers.Authorization = `Bearer ${token}`;
      prom.resolve(api(prom.config));
    }
  });
  failedQueue = [];
};

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 saniye timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - token ekle
api.interceptors.request.use(
  async (config) => {
    const token = await storage.getItem<string | null>('auth_token', null);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - hata yönetimi ve token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Network hatası
    if (!error.response) {
      console.log('Network error - offline mode');
      return Promise.reject({
        ...error,
        message: 'Bağlantı hatası. İnternet bağlantınızı kontrol edin.',
        isNetworkError: true,
      });
    }

    // 401 Unauthorized - Token süresi dolmuş veya geçersiz
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Zaten refresh işlemi yapılıyor, kuyruğa ekle
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Token refresh dene
        const refreshToken = await storage.getItem<string | null>('refresh_token', null);

        if (refreshToken) {
          const response = await axios.post(`${BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          if (response.data?.accessToken) {
            await storage.setItem('auth_token', response.data.accessToken);
            if (response.data.refreshToken) {
              await storage.setItem('refresh_token', response.data.refreshToken);
            }

            processQueue(null, response.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return api(originalRequest);
          }
        }

        // Refresh token yoksa veya başarısızsa logout yap
        await handleLogout();
        processQueue(error, null);

      } catch (refreshError) {
        await handleLogout();
        processQueue(error, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // 403 Forbidden
    if (error.response?.status === 403) {
      console.log('Access denied - insufficient permissions');
    }

    // 404 Not Found
    if (error.response?.status === 404) {
      console.log('Resource not found');
    }

    // 500 Server Error
    if (error.response?.status >= 500) {
      console.log('Server error');
      return Promise.reject({
        ...error,
        message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.',
        isServerError: true,
      });
    }

    return Promise.reject(error);
  }
);

// Logout helper
async function handleLogout() {
  await storage.removeItem('auth_token');
  await storage.removeItem('refresh_token');
  await storage.removeItem('user_data');

  // Login sayfasına yönlendir
  try {
    router.replace('/(auth)/login');
  } catch (e) {
    console.log('Router not ready for navigation');
  }
}

// API health check
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await api.get('/health', { timeout: 5000 });
    return response.status === 200;
  } catch {
    return false;
  }
}

// Retry helper for failed requests
export async function retryRequest<T>(
  requestFn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  throw lastError;
}

export default api;
