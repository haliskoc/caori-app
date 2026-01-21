import en from "./en.json";
import tr from "./tr.json";
import es from "./es.json";
import fr from "./fr.json";
import ru from "./ru.json";
import pt from "./pt.json";

export const locales = {
  en,
  tr,
  es,
  fr,
  ru,
  pt,
};

export type LocaleCode = keyof typeof locales;
export type Dictionary = typeof en;
