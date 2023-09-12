import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: require("./en.json"), // Importez les traductions en anglais
    },
    fr: {
      translation: require("./fr.json"), // Importez les traductions en français
    },
  },
  lng: "fr", // Langue par défaut
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
