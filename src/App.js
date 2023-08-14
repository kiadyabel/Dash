import { DateProvider } from "./utils/DateContext";
import AppBarDash from "./general/sideBare/AppBarDash";
import Monitoring from "./components/monitoring/Monitoring";

function App() {
  return (
    <DateProvider component="div">
      <AppBarDash />
      <Monitoring />
    </DateProvider>
  );
}

export default App;
