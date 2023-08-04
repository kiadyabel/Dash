import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import DataGrid from "./DataGrid";
import ChartKpis from "./ChartKpis";
import ChartChargeQy from "./ChartChargeQy";

const BodyCdrs = () => {
  return (
    <Grid
      container
      rowSpacing={0}
      columnSpacing={{ xs: 1, sm: 2, md: 1 }}
      sx={{ mt: 1 }}
    >
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
          TREND de KPIs
        </Typography>
        <ChartChargeQy />
        <Box sx={{ mb: 3 }}></Box>
        <ChartKpis />
      </Grid>
    </Grid>
  );
};

export default BodyCdrs;
