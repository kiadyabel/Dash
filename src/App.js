import SideBarMenu from "./general/sideBare/SideBarMenu";
import { DateProvider } from "./utils/DateContext";

function App() {
  return (
    <DateProvider>
      <div>
        <SideBarMenu />
      </div>
    </DateProvider>
  );
}

export default App;
