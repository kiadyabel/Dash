import React from "react";
import BodyCdrs from "./BodyCdrs";
import { SelectedTypeProvider } from "./onClickValueCdrs";
const IndexCdrs = () => {
  return (
    <SelectedTypeProvider>
      <BodyCdrs />
    </SelectedTypeProvider>
  );
};

export default IndexCdrs;
