import React from "react";
import i18n from "../TranslationI18n";
import { Select, MenuItem } from "@mui/material";
//import { useTranslation } from "react-i18next";
import FlagFr from "../utils/image/france.png";
import FlagEn from "../utils/image/anglais.png";

const LanguageSwitcher = () => {
  // const {i18n}=useTranslation() //pour changer la langue
  const onChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <Select
        sx={{
          background: "tranparent",
          height: "30px",
          color: "white",
          fontSize: "12px",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ml: 3,
        }}
        defaultValue={i18n.language}
        onChange={(e) => onChangeLanguage(e.target.value)}
      >
        <MenuItem
          value="fr"
          sx={{
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "3px",
          }}
        >
          <img src={FlagFr} alt="fr" /> <span>FR</span>
        </MenuItem>
        <MenuItem
          value="en"
          sx={{
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "3px",
          }}
        >
          <img src={FlagEn} alt="en" /> <span>EN</span>
        </MenuItem>
        {/* Ajoutez d'autres langues ici avec leurs icônes */}
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
