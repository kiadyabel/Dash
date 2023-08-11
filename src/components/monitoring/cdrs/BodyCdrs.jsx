import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import DataGrid from "./DataGrid";
import ChartFichier from "./ChartFichier";
import ChartCdrs from "./ChartCdrs";
import { useSelectedType } from "./onClickValueCdrs";


const BodyCdrs = () => {
  const { selectedType } = useSelectedType(); // valeur dans le parametre venant de la click du table

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
          Evolution du nombre de CDRs par type: {selectedType}
        </Typography>
        <Box sx={{ mb: 3 }}>
          <ChartFichier />
        </Box>
        <Box>
          <ChartCdrs />
        </Box>
      </Grid>
    </Grid>
  );
};

export default BodyCdrs;
