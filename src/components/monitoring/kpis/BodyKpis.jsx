import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import DataGrid from "./DataGrid";
import ChartKpis from "./ChartKpis";
import ChartChargeQy from "./ChartChargeQy";

import { useSelectedName } from "./OnClickValueKpis";

const BodyKpis = () => {
  const { selectedName } = useSelectedName(); // valeur dans le parametre venant de la click du table
  return (
    <Grid container columnSpacing={{ xs: 1, md: 1 }} sx={{ mt: 1 }}>
      <Grid item xs={12} md={8}>
        <Box>
          <DataGrid />
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography
          component="div"
          sx={{
            color: "#0A6EBD",
            backgroundColor: "#D8D9DA",
            mb: 2,
            padding: 2,
            borderRadius: "5px",
          }}
        >
          TREND de KPIs: {selectedName}
        </Typography>
        <Box sx={{ mb: 3 }}>
          <ChartKpis />
        </Box>
        <Box>
          <ChartChargeQy />
        </Box>
      </Grid>
    </Grid>
  );
};

export default BodyKpis;
