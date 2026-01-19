import en from "./en.json";
import tr from "./tr.json";
import fr from "./fr.json";
import ru from "./ru.json";

export const locales = {
  en,
  tr,
  fr,
  ru,
};

export type LocaleCode = keyof typeof locales;
export type Dictionary = typeof en;
