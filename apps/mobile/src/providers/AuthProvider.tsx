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

WebBrowser.maybeCompleteAuthSession();

type AuthContextType = {
  isLoading: boolean;
  login: () => Promise<void>;
  signup: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const auth0Domain = String(process.env.EXPO_PUBLIC_AUTH0_DOMAIN || "").trim();
const clientId = String(process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID || "").trim();
const auth0Audience = String(
  process.env.EXPO_PUBLIC_AUTH0_AUDIENCE || "",
).trim();

type TokenResponse = {
  access_token: string;
  token_type?: string;
  expires_in?: string | number;
  scope?: string;
};

function buildAuthUrl(redirectUri: string, isSignup: boolean) {
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "token",
    redirect_uri: redirectUri,
    scope: "openid profile email",
  });

  if (auth0Audience) {
    params.set("audience", auth0Audience);
  }

  if (isSignup) {
    params.set("screen_hint", "signup");
  }

  return `https://${auth0Domain}/authorize?${params.toString()}`;
}

async function getRedirectUri() {
  const scheme = Constants.expoConfig?.scheme;
  return AuthSession.makeRedirectUri({
    scheme,
  });
}

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

  const login = async () => {
    if (!auth0Domain || !clientId) {
      throw new Error("Missing Auth0 configuration");
    }

    const redirectUri = await getRedirectUri();
    const result = await AuthSession.startAsync({
      authUrl: buildAuthUrl(redirectUri, false),
    });

    if (result.type === "success") {
      const tokens = result.params as TokenResponse;
      if (!tokens.access_token) {
        return;
      }
      await storage.setItem("auth_token", tokens.access_token);
      const userData = {
        id: "auth0-user",
        email: "user@example.com",
        token: tokens.access_token,
      };
      setUser(userData);
      await storage.setItem("user_data", userData);
    }
  };

  const signup = async () => {
    if (!auth0Domain || !clientId) {
      throw new Error("Missing Auth0 configuration");
    }

    const redirectUri = await getRedirectUri();
    const result = await AuthSession.startAsync({
      authUrl: buildAuthUrl(redirectUri, true),
    });

    if (result.type === "success") {
      const tokens = result.params as TokenResponse;
      if (!tokens.access_token) {
        return;
      }
      await storage.setItem("auth_token", tokens.access_token);
      const userData = {
        id: "auth0-user",
        email: "user@example.com",
        token: tokens.access_token,
      };
      setUser(userData);
      await storage.setItem("user_data", userData);
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
    [isLoading],
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
