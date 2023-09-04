import { DateProvider } from "./utils/DateContext";
import { ColorProvider } from "./utils/ColorContext";
import { SliderValuesProvider } from "./utils/SliderValueContext";
import AppBarDash from "./general/sideBare/AppBarDash";
import Monitoring from "./components/monitoring/Monitoring";
// import Authentification from "./components/login/Authentification";

function App() {
  return (
    <DateProvider >
      <ColorProvider>
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
