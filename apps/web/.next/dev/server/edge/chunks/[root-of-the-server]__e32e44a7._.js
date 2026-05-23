(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__e32e44a7._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/ [middleware-edge] (unsupported edge import 'crypto', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`crypto`));
}),
"[project]/apps/web/src/lib/auth/auth0.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth0",
    ()=>auth0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth0$2f$nextjs$2d$auth0$2f$dist$2f$server$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@auth0/nextjs-auth0/dist/server/index.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth0$2f$nextjs$2d$auth0$2f$dist$2f$server$2f$client$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth0/nextjs-auth0/dist/server/client.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
;
const appBaseUrl = process.env.APP_BASE_URL || process.env.AUTH0_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) || "http://localhost:3000";
const isProduction = ("TURBOPACK compile-time value", "development") === "production";
let domain = process.env.AUTH0_DOMAIN;
if (!domain && process.env.AUTH0_ISSUER_BASE_URL) {
    try {
        domain = new URL(process.env.AUTH0_ISSUER_BASE_URL).host;
    } catch  {
        domain = undefined;
    }
}
const auth0 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth0$2f$nextjs$2d$auth0$2f$dist$2f$server$2f$client$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Auth0Client"]({
    appBaseUrl,
    domain,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    secret: process.env.AUTH0_SECRET,
    signInReturnToPath: "/dashboard",
    routes: {
        callback: "/auth/callback",
        login: "/auth/login",
        logout: "/auth/logout"
    },
    session: {
        cookie: {
            sameSite: "lax",
            secure: isProduction
        }
    },
    async onCallback (error, context) {
        if (error) {
            console.error("Auth0 callback error:", error.message);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/login", appBaseUrl));
        }
        const returnTo = context.returnTo && context.returnTo !== "/" ? context.returnTo : "/dashboard";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(returnTo, appBaseUrl));
    }
});
}),
"[project]/apps/web/src/lib/core/proxy.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "proxy",
    ()=>proxy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$auth0$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/auth/auth0.ts [middleware-edge] (ecmascript)");
;
async function proxy(request) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$auth0$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["auth0"].middleware(request);
}
const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
    ]
};
}),
"[project]/apps/web/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$proxy$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/core/proxy.ts [middleware-edge] (ecmascript)");
;
function middleware(request) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$proxy$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["proxy"])(request);
}
const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__e32e44a7._.js.map