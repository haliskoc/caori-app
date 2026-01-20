import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth/auth0';
import * as jose from 'jose';

// Bu endpoint mobil uygulamadan gelen authentication isteklerini işler
// Giriş yapan kullanıcıyı mobil uygulamaya deep link ile yönlendirir

const getSecret = () => {
    const secret = process.env.AUTH0_SECRET || 'fallback-secret-key-for-development';
    return new TextEncoder().encode(secret);
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const redirectUri = searchParams.get('redirect_uri') || 'calmet://auth';
    const state = searchParams.get('state') || '';

    try {
        // Mevcut oturumu kontrol et
        const session = await auth0.getSession();

        if (!session?.user) {
            // Kullanıcı giriş yapmamış, login sayfasına yönlendir
            // Login sonrası bu endpoint'e geri dönecek
            const currentUrl = new URL(request.url);
            const returnTo = `/api/v1/mobile-auth?redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
            const loginUrl = new URL('/auth/login', currentUrl.origin);
            loginUrl.searchParams.set('returnTo', returnTo);
            return NextResponse.redirect(loginUrl);
        }

        // Kullanıcı zaten giriş yapmış, mobil token oluştur
        const secret = getSecret();

        const mobileToken = await new jose.SignJWT({
            sub: session.user.sub,
            email: session.user.email,
            name: session.user.name,
            picture: session.user.picture,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('30d')
            .sign(secret);

        // Refresh token oluştur
        const refreshToken = await new jose.SignJWT({
            sub: session.user.sub,
            type: 'refresh',
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('90d')
            .sign(secret);

        // Mobil uygulamaya deep link ile yönlendir
        const callbackUrl = new URL(redirectUri);
        callbackUrl.searchParams.set('token', mobileToken);
        callbackUrl.searchParams.set('refresh_token', refreshToken);
        callbackUrl.searchParams.set('user', JSON.stringify({
            id: session.user.sub,
            email: session.user.email,
            name: session.user.name,
            picture: session.user.picture,
        }));
        if (state) {
            callbackUrl.searchParams.set('state', state);
        }

        return NextResponse.redirect(callbackUrl.toString());
    } catch (error) {
        console.error('Mobile auth error:', error);

        // Hata durumunda mobil uygulamaya hata bildir
        const errorUrl = new URL(redirectUri);
        errorUrl.searchParams.set('error', 'auth_failed');
        errorUrl.searchParams.set('error_description', 'Authentication failed');

        return NextResponse.redirect(errorUrl.toString());
    }
}

// POST: Token doğrulama endpoint'i
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { token } = body;

        if (!token) {
            return NextResponse.json({ error: 'Token required' }, { status: 400 });
        }

        const secret = getSecret();

        // Token'ı doğrula
        const { payload } = await jose.jwtVerify(token, secret);

        return NextResponse.json({
            valid: true,
            user: {
                id: payload.sub,
                email: payload.email,
                name: payload.name,
            },
        });
    } catch {
        return NextResponse.json({ valid: false, error: 'Invalid token' }, { status: 401 });
    }
}

// Token refresh endpoint'i
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { refreshToken } = body;

        if (!refreshToken) {
            return NextResponse.json({ error: 'Refresh token required' }, { status: 400 });
        }

        const secret = getSecret();

        // Refresh token'ı doğrula
        const { payload } = await jose.jwtVerify(refreshToken, secret);

        if (payload.type !== 'refresh') {
            return NextResponse.json({ error: 'Invalid token type' }, { status: 400 });
        }

        // Yeni access token oluştur
        const newAccessToken = await new jose.SignJWT({
            sub: payload.sub,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('30d')
            .sign(secret);

        return NextResponse.json({
            accessToken: newAccessToken,
        });
    } catch {
        return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
    }
}
