import React from "react";
import { Box, Modal, Typography, useMediaQuery } from "@mui/material";
import ChartFichier from "./ChartFichier"; // Import d'un composant ChartFichier depuis un chemin relatif
import ChartCdrs from "./ChartCdrs"; // Import d'un composant ChartCdrs depuis un chemin relatif
import { useSelectedType } from "./onClickValueCdrs"; // Import d'un hook custom depuis un chemin relatif
import { useTranslation } from "react-i18next"; // utiliser pour la translation


const MobileRender = ({ isModalOpen, closeModal }) => {
  const { t } = useTranslation(); // translation

  // Utilisation du hook custom useSelectedType pour obtenir la valeur sélectionnée
  const { selectedType } = useSelectedType();
  // Vérifie si l'écran est de taille tablette en utilisant le breakpoint "md"
  const isTabletScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isPhoneScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));

  // Condition pour définir la largeur du div en fonction de la taille de l'écran
  const divWidth = isTabletScreen ? "400px" : isPhoneScreen ? "380px" : "auto";
  // Condition pour définir la hauteru du div en fonction de la taille de l'écran
  const divHeight = isTabletScreen
    ? "maxContent"
    : isPhoneScreen
    ? "500px"
    : "auto";

  return (
    <Modal open={isModalOpen} onClose={closeModal}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: divWidth,
          height: divHeight,
          backgroundColor: "#f5f5f5",
          boxShadow: "2px 6px 14px black",
          paddingBottom: 20,
          paddingLeft: 8,
          paddingRight: 8,
        }}
      >
        <Typography
          component="div"
          sx={{
            color: "#0A6EBD",
            backgroundColor: "#D8D9DA",
            mb: 2,
            padding: 2,
          }}
        >
          {/*affichage du titre de graphSource selon la langue selectionée et affichage de type la valeur sélectionnée */}
          {t("evaluation_cdr")} : {"  "} {selectedType}
        </Typography>
        {/* Rendu des composants ChartFichier et ChartCdrs */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ mb: 3 }}>
            <ChartFichier /> {/* Rendu du composant ChartFichier */}
          </Box>
          <Box>
            <ChartCdrs /> {/* Rendu du composant ChartCdrs */}
          </Box>
        </Box>
      </div>
    </Modal>
  );
};

export default MobileRender;
