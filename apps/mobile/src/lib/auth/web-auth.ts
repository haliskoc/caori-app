import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { Platform } from 'react-native';
import { storage } from '../storage';

// Web sitesi base URL
const WEB_BASE_URL = process.env.EXPO_PUBLIC_API_URL_PRODUCTION?.replace('/api/v1', '')
    || 'https://calmet.vercel.app';

// Deep link scheme
const REDIRECT_URI = 'calmet://auth';

export type WebAuthResult = {
    success: boolean;
    token?: string;
    refreshToken?: string;
    user?: {
        id: string;
        email: string;
        name: string;
        picture?: string;
    };
    error?: string;
};

/**
 * Web sitesinde oturum açarak mobil uygulamaya token döndürür
 */
export async function loginWithWeb(): Promise<WebAuthResult> {
    try {
        // Benzersiz state oluştur (CSRF koruması için)
        const state = Math.random().toString(36).substring(7);
        await storage.setItem('auth_state', state);

        // Web auth URL'ini oluştur
        const authUrl = `${WEB_BASE_URL}/api/v1/mobile-auth?redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${state}`;

        // Tarayıcıyı aç ve sonucu bekle
        const result = await WebBrowser.openAuthSessionAsync(authUrl, REDIRECT_URI);

        if (result.type === 'success' && result.url) {
            // Deep link URL'ini parse et
            const params = Linking.parse(result.url);

            // State doğrula
            const savedState = await storage.getItem<string>('auth_state', '');
            if (params.queryParams?.state && params.queryParams.state !== savedState) {
                return { success: false, error: 'Invalid state - possible CSRF attack' };
            }

            // Hata kontrolü
            if (params.queryParams?.error) {
                return {
                    success: false,
                    error: params.queryParams.error_description as string || 'Authentication failed',
                };
            }

            // Token'ları al
            const token = params.queryParams?.token as string;
            const refreshToken = params.queryParams?.refresh_token as string;
            const userJson = params.queryParams?.user as string;

            if (!token) {
                return { success: false, error: 'No token received' };
            }

            // Token'ları kaydet
            await storage.setItem('auth_token', token);
            if (refreshToken) {
                await storage.setItem('refresh_token', refreshToken);
            }

            // Kullanıcı bilgilerini parse et
            let user;
            if (userJson) {
                try {
                    user = JSON.parse(decodeURIComponent(userJson));
                    await storage.setItem('user_data', user);
                } catch (e) {
                    console.warn('Failed to parse user data:', e);
                }
            }

            // State'i temizle
            await storage.removeItem('auth_state');

            return {
                success: true,
                token,
                refreshToken,
                user,
            };
        }

        if (result.type === 'cancel') {
            return { success: false, error: 'User cancelled' };
        }

        return { success: false, error: 'Authentication failed' };
    } catch (error) {
        console.error('Web login error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

/**
 * Deep link handler - uygulama açıldığında çağrılır
 */
export async function handleAuthDeepLink(url: string): Promise<WebAuthResult> {
    try {
        const params = Linking.parse(url);

        // Auth callback değilse ignore
        if (params.path !== 'auth') {
            return { success: false, error: 'Not an auth callback' };
        }

        // Hata kontrolü
        if (params.queryParams?.error) {
            return {
                success: false,
                error: params.queryParams.error_description as string || 'Authentication failed',
            };
        }

        const token = params.queryParams?.token as string;
        const refreshToken = params.queryParams?.refresh_token as string;
        const userJson = params.queryParams?.user as string;

        if (!token) {
            return { success: false, error: 'No token in callback' };
        }

        // Token'ları kaydet
        await storage.setItem('auth_token', token);
        if (refreshToken) {
            await storage.setItem('refresh_token', refreshToken);
        }

        // Kullanıcı bilgilerini parse et
        let user;
        if (userJson) {
            try {
                user = JSON.parse(decodeURIComponent(userJson));
                await storage.setItem('user_data', user);
            } catch (e) {
                console.warn('Failed to parse user data:', e);
            }
        }

        return {
            success: true,
            token,
            refreshToken,
            user,
        };
    } catch (error) {
        console.error('Deep link handler error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

/**
 * Web oturumunu sonlandır
 */
export async function logoutFromWeb(): Promise<void> {
    await storage.removeItem('auth_token');
    await storage.removeItem('refresh_token');
    await storage.removeItem('user_data');
    await storage.removeItem('auth_state');
}
