import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { AppRoutes } from "./routes";
import { LangProvider } from "./context/LangContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster
            position="top-center"
            richColors
            closeButton
            duration={4000}
          />
        </BrowserRouter>
      </AuthProvider>
    </LangProvider>
  );
}

export default App;