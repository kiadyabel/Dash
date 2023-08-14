import React from "react";
import BodyCdrs from "./BodyCdrs";
import { SelectedTypeProvider } from "./onClickValueCdrs";
import { Box } from "@mui/material";
const IndexCdrs = () => {
  return (
    <SelectedTypeProvider>
      <Box>
        <BodyCdrs />
      </Box>
    </SelectedTypeProvider>
  );
};

export default IndexCdrs;
