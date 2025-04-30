import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import de from "./locales/de.json"; // add others as needed

i18n.use(initReactI18next).init({
  lng: navigator.language.split("-")[0] ?? "en",
  fallbackLng: "en",
  resources: { en: { translation: en }, de: { translation: de } },
  interpolation: { escapeValue: false },
});

export default i18n;
