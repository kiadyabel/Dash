import { Box } from "@mui/material";
import BodyKpis from "./BodyKpis";
import { SelectedNameProvider } from "./OnClickValueKpis";

const IndexKpis = () => {
  return (
    <SelectedNameProvider>
      <Box>
        <BodyKpis />
      </Box>
    </SelectedNameProvider>
  );
};

export default IndexKpis;
