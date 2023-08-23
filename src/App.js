import { DateProvider } from "./utils/DateContext";
import AppBarDash from "./general/sideBare/AppBarDash";
import Monitoring from "./components/monitoring/Monitoring";
import Authentification from "./components/login/Authentification";

function App() {
  return (
    <DateProvider component="div">
      {/* <Authentification/> */}
      <AppBarDash />
      <Monitoring />
    </DateProvider>
  );
}

export default App;
