import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { LangProvider } from "./context/LangContext";

function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LangProvider>
  );
}

export default App;
