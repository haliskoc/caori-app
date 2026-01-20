import { router } from 'expo-router';

/**
 * Güvenli geri gitme fonksiyonu.
 * Eğer navigasyon geçmişinde geri gidilecek bir ekran yoksa,
 * varsayılan olarak ana sayfaya yönlendirir.
 * 
 * @param fallbackRoute Geri gidilecek ekran yoksa yönlendirilecek route (varsayılan: '/(tabs)')
 */
export function safeGoBack(fallbackRoute: string = '/(tabs)') {
    if (router.canGoBack()) {
        router.back();
    } else {
        // Geri gidilecek ekran yoksa, varsayılan route'a yönlendir
        router.replace(fallbackRoute as any);
    }
}

/**
 * Navigasyon geçmişinde geri gidip gidemeyeceğimizi kontrol eder
 */
export function canGoBack(): boolean {
    return router.canGoBack();
}
