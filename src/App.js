import { DateProvider } from "./utils/DateContext";
import { ColorProvider } from "./utils/ColorContext";
import { SliderValuesProvider } from "./utils/SliderValueContext";
import AppBarDash from "./general/sideBare/AppBarDash";
import Monitoring from "./components/monitoring/Monitoring";
// import Authentification from "./components/login/Authentification";

function App() {
  return (
    /** Utilisation du composant 'SelectedTypeProvider' pour fournir un contexte de la date */
    <DateProvider>
      {/** Utilisation du composant 'SelectedTypeProvider' pour fournir un contexte du couleur */}
      <ColorProvider>
        {/** Utilisation du composant 'SelectedTypeProvider' pour fournir un contexte du valeur et couleur du slider dans le filtre */}
        <SliderValuesProvider>
          {/* <Authentification/> */}
          <AppBarDash />
          <Monitoring />
        </SliderValuesProvider>
      </ColorProvider>
    </DateProvider>
  );
}

export default App;
