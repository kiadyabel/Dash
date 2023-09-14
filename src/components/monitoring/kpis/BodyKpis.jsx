// Import de React et des composants nécessaires depuis MUI
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import DataGrid from "./DataGrid"; // Import d'un composant DataGrid depuis un chemin relatif
import ChartKpis from "./ChartKpis"; // Import d'un composant ChartKpis depuis un chemin relatif
import ChartChargeQy from "./ChartSlots"; // Import d'un composant ChartChargeQy depuis un chemin relatif
import { useSelectedName } from "./OnClickValueKpis"; // Import d'un hook custom depuis un chemin relatif
import { useTranslation } from "react-i18next"; // utiliser pour la translation

// Définition du composant BodyKpis
const BodyKpis = () => {
  // Utilisation du hook custom useSelectedName pour obtenir la valeur sélectionnée.
  const { selectedName } = useSelectedName();

  const { t } = useTranslation(); // translation

  // Rendu du composant
  return (
    <Grid container columnSpacing={{ xs: 1, md: 1 }} sx={{ mt: 1 }}>
      {/* Section gauche */}
      <Grid item xs={12} md={8}>
        <Box>
          <DataGrid /> {/* Rendu du composant DataGrid */}
        </Box>
      </Grid>
      {/* Section droite */}
      <Grid item xs={12} md={4}>
        {/* Titre */}
        <Typography
          component="div"
          sx={{
            color: "#0A6EBD",
            backgroundColor: "#D8D9DA",
            mb: 2,
            padding: 2,
            borderRadius: "5px",
            display: { xs: "none", sm: "none", md: "block" },
          }}
        >
          {t("evaluation_kpi")} :{"  "} {selectedName}
          {/* Utilisation de la valeur sélectionnée */}
        </Typography>
        {/* Rendu des composants ChartKpis et ChartChargeQy */}
        <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
          <Box sx={{ mb: 3 }}>
            <ChartKpis /> {/* Rendu du composant ChartKpis */}
          </Box>
          <Box>
            <ChartChargeQy /> {/* Rendu du composant ChartChargeQy */}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default BodyKpis; // Export du composant
