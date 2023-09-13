import React from "react";
import TabsPanel from "./TabsPanel"; // rendue du tabspanel
import Vignette from "./Vignette"; // rendu du vigniette
import { Box } from "@mui/material";

const Monitoring = () => {
  return (
    <Box component="main" sx={{ pl: 1, pr: 1, mt: 9}}>
      <Vignette />
      <TabsPanel />
    </Box>
  );
};

export default Monitoring;
