import BodyKpis from "./BodyKpis";
import { SelectedNameProvider } from "./OnClickValueKpis";

const IndexKpis = () => {
  return (
    <SelectedNameProvider>
      <BodyKpis />
    </SelectedNameProvider>
  );
};

export default IndexKpis;
