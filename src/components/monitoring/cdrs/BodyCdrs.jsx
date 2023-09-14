// Import de React et des composants nécessaires depuis MUI
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import DataGrid from "./DataGrid"; // Import d'un composant DataGrid depuis un chemin relatif
import ChartFichier from "./ChartFichier"; // Import d'un composant ChartFichier depuis un chemin relatif
import ChartCdrs from "./ChartCdrs"; // Import d'un composant ChartCdrs depuis un chemin relatif
import { useSelectedType } from "./onClickValueCdrs"; // Import d'un hook custom depuis un chemin relatif
import { useTranslation } from "react-i18next"; // utiliser pour la translation


// Définition du composant BodyCdrs
const BodyCdrs = () => {
  // Utilisation du hook custom useSelectedType pour obtenir la valeur sélectionnée.
  const { selectedType } = useSelectedType();

  const {t}=useTranslation(); // translation 

  // Rendu du composant
  return (
    <Grid
      container
      rowSpacing={0}
      columnSpacing={{ xs: 1, sm: 2, md: 1 }}
      sx={{ mt: 1 }}
    >
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
          sx={{
            color: "#0A6EBD",
            backgroundColor: "#D8D9DA",
            mb: 2,
            padding: 2,
            borderRadius: "5px",
            display: { xs: "none", sm: "none", md: "block" },
          }}
          component="div"
        >
          {t("evaluation_cdr")} :{"  "} {selectedType}
          {/* Utilisation de la valeur sélectionnée */}
        </Typography>
        {/* Rendu des composants ChartFichier et ChartCdrs */}
        <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
          <Box sx={{ mb: 3 }}>
            <ChartFichier /> {/* Rendu du composant ChartFichier */}
          </Box>
          <Box>
            <ChartCdrs /> {/* Rendu du composant ChartCdrs */}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default BodyCdrs; // Export du composant
