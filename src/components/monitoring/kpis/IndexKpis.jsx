import { Box } from "@mui/material";
import BodyKpis from "./BodyKpis";// Importation de la composante 'BodyKpis' depuis le fichier local "./BodyKpis"


import { SelectedNameProvider } from "./OnClickValueKpis"; // Importation de la composante 'SelectedNameProvider' depuis le fichier local "./OnClickValueKpis"

// composant prinsipale du KPI'
const IndexKpis = () => {
  return (
    // Utilisation du composant 'SelectedNameProvider' pour fournir un contexte de données
    <SelectedNameProvider>
      <Box>
        <BodyKpis /> 
      </Box>
    </SelectedNameProvider>
  );
};

// Exportation de la composante 'IndexKpis' en tant que composant par défaut
export default IndexKpis;
