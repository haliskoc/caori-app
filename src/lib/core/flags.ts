export type FeatureFlags = {
  aiVisual: boolean;
  googleFit: boolean;
  darkMode: boolean;
};

export const defaultFlags: FeatureFlags = {
  aiVisual: false,
  googleFit: false,
  darkMode: true,
};

const FLAG_KEY = "calai.flags.v1";

export function loadFlags(): FeatureFlags {
  if (typeof window === "undefined") {
    return defaultFlags;
  }
  try {
    const raw = window.localStorage.getItem(FLAG_KEY);
    if (!raw) {
      return defaultFlags;
    }
    const parsed = JSON.parse(raw) as Partial<FeatureFlags>;
    return { ...defaultFlags, ...parsed };
  } catch {
    return defaultFlags;
  }
}

export function saveFlags(flags: FeatureFlags) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(FLAG_KEY, JSON.stringify(flags));
}
