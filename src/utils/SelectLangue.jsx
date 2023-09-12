import React from "react";
import i18n from "../TranslationI18n";
import { Select, MenuItem } from "@mui/material";
//import { useTranslation } from "react-i18next";
import FlagFr from "../utils/image/france.png"
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
          border: "none",
          ml: 3,
        }}
        defaultValue={i18n.language}
        onChange={(e) => onChangeLanguage(e.target.value)}
      >
        <MenuItem value="fr">
          <img src={FlagFr} alt="fr" style={{ alignItems: "center" }} /> FR
        </MenuItem>
        <MenuItem value="en">
          <img src={FlagEn} alt="en" style={{ alignItems: "center" }} /> EN
        </MenuItem>
        {/* Ajoutez d'autres langues ici avec leurs icônes */}
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
