import React from "react";
import { Box, Typography, Modal, useMediaQuery } from "@mui/material";
import ChartKpis from "./ChartKpis"; // Import d'un composant ChartKpis depuis un chemin relatif
import ChartChargeQy from "./ChartSlots"; // Import d'un composant ChartChargeQy depuis un chemin relatif
import { useSelectedName } from "./OnClickValueKpis"; // Import d'un hook custom depuis un chemin relatif
import { useTranslation } from "react-i18next"; // utiliser pour la translation

const MobileRender = ({ isModalOpen, closeModal }) => {
  const { t } = useTranslation(); // translation

  // Utilisation du hook custom useSelectedName pour obtenir la valeur sélectionnée
  const { selectedName } = useSelectedName();
  // Vérifie si l'écran est de tailleup tablette en utilisant le breakpoint "md"
  const isTabletScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isPhoneScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));

  // Condition pour définir la largeur du div en fonction de la taille de l'écran
  const divWidth = isTabletScreen ? "400px" : isPhoneScreen ? "380px" : "auto";
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
          {t("evaluation_kpi")} :{"  "} {selectedName}
          {/* Utilisation de la valeur sélectionnée */}
        </Typography>
        {/* Rendu des composants ChartKpis et ChartChargeQy */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ mb: 3 }}>
            <ChartKpis /> {/* Rendu du composant ChartKpis */}
          </Box>
          <Box>
            <ChartChargeQy /> {/* Rendu du composant ChartChargeQy */}
          </Box>
        </Box>
      </div>
    </Modal>
  );
};

export default MobileRender;
