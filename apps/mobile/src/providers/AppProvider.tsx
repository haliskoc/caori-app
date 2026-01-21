import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { initDb } from "@/db";
import { AuthUser, createGuestUser, getSessionUser, loginUser, logoutUser, registerUser } from "@/lib/auth";
import { TrackerProvider } from "@/providers/TrackerProvider";
import { LoadingScreen } from "@/components/LoadingScreen";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (input: { email: string; password: string }) => Promise<void>;
  register: (input: { email: string; name?: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const bootstrap = async () => {
      try {
        await initDb();
        const session = await getSessionUser();
        if (active) {
          if (session) {
            setUser(session);
          } else {
            const guest = await createGuestUser();
            setUser(guest);
          }
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    void bootstrap();
    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (input: { email: string; password: string }) => {
    const session = await loginUser(input);
    setUser(session);
  }, []);

  const register = useCallback(async (input: { email: string; name?: string; password: string }) => {
    const session = await registerUser(input);
    setUser(session);
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
    }),
    [user, loading, login, register, logout]
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={value}>
      {user ? <TrackerProvider userId={user.id}>{children}</TrackerProvider> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AppProvider");
  }
  return context;
}
