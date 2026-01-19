import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";
import { storage } from "../lib/storage";
import { useStore } from "../store";
import { nanoid } from "nanoid/non-secure";

WebBrowser.maybeCompleteAuthSession();

type AuthContextType = {
  isLoading: boolean;
  login: (email?: string, password?: string) => Promise<void>;
  signup: (email: string, name: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const auth0Domain = String(process.env.EXPO_PUBLIC_AUTH0_DOMAIN || "").trim();
const clientId = String(process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID || "").trim();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      const storedUser = await storage.getItem("user_data", null);
      if (storedUser) {
        setUser(storedUser);
      }
      setIsLoading(false);
    };

    initialize();
  }, [setUser]);

  const login = async (email?: string) => {
    // If no email provided, try Auth0
    if (!email && auth0Domain && clientId) {
      // Existing Auth0 logic would go here
      return;
    }

    // Local Auth logic
    setIsLoading(true);
    try {
      const userData = {
        id: email ? `local-${email}` : "guest",
        email: email || "guest@calai.app",
        name: email?.split("@")[0] || "Guest",
      };
      await storage.setItem("user_data", userData);
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, name: string) => {
    setIsLoading(true);
    try {
      const userData = {
        id: `local-${nanoid(8)}`,
        email: email,
        name: name,
      };
      await storage.setItem("user_data", userData);
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await storage.setItem("auth_token", null);
    await storage.setItem("user_data", null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isLoading,
      login,
      signup,
      logout,
    }),
    [isLoading, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
