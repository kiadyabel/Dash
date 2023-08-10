import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import DataGrid from "./DataGrid";
import ChartKpis from "./ChartKpis";
import ChartChargeQy from "./ChartChargeQy";

import { useSelectedName } from "./OnClickValueKpis";

const BodyKpis = () => {
  const { selectedName } = useSelectedName(); // valeur dans le parametre venant de la click du table
  return (
    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 1 }} sx={{ mt: 1 }}>
      <Grid item xs={8}>
        <DataGrid />
      </Grid>
      <Grid item xs={4}>
        <Typography
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
        <ChartKpis />

        <Box sx={{ mb: 3 }}>
          <ChartChargeQy />
        </Box>
      </Grid>
    </Grid>
  );
};

export default BodyKpis;
