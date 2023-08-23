import React from "react";
import { Box, Typography } from "@mui/material";
import ChartKpis from "./ChartKpis"; // Import d'un composant ChartKpis depuis un chemin relatif
import ChartChargeQy from "./ChartChargeQy"; // Import d'un composant ChartChargeQy depuis un chemin relatif
import { useSelectedName } from "./OnClickValueKpis"; // Import d'un hook custom depuis un chemin relatif

const MobileRender = () => {
  // Utilisation du hook custom useSelectedName pour obtenir la valeur sélectionnée
  const { selectedName } = useSelectedName();
  return (
    <div>
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
        TREND de KPIs:{"  "} {selectedName}
        {/* Utilisation de la valeur sélectionnée */}
      </Typography>
      {/* Rendu des composants ChartKpis et ChartChargeQy */}
      <Box sx={{ display:"flex", flexDirection:"column" }}>
        <Box sx={{ mb: 3 }}>
          <ChartKpis /> {/* Rendu du composant ChartKpis */}
        </Box>
        <Box>
          <ChartChargeQy /> {/* Rendu du composant ChartChargeQy */}
        </Box>
      </Box>
    </div>
  );
};

export default MobileRender;
