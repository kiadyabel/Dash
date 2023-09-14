import React from "react";
import BodyCdrs from "./BodyCdrs"; // Importation de la composante 'BodyKpis' depuis le fichier local "./BodyKpis"

import { SelectedTypeProvider } from "./onClickValueCdrs"; // Importation de la composante 'SelectedTypeProvider' depuis le fichier local "./OnClickValueCdrs"
import { Box } from "@mui/material";


// composant prinsipale du CDR
const IndexCdrs = () => {
  return (
    // Utilisation du composant 'SelectedTypeProvider' pour fournir un contexte de données
    <SelectedTypeProvider>
      <Box>
        <BodyCdrs />
      </Box>
    </SelectedTypeProvider>
  );
};


// Exportation de la composante 'IndexCDRs' en tant que composant par défaut
export default IndexCdrs;
