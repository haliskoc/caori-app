import { Suspense } from "react";
import { LoginScreen } from "@/components/features/auth/login-screen";
import { t } from "@/lib/core/i18n";

function LoginFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fffcf9]">
      <p className="text-sm font-bold text-emerald-700">{t("Yükleniyor…")}</p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginScreen />
    </Suspense>
  );
}
