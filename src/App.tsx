import { ThemeProvider } from "@mui/material";
import "./App.css";
import AllRoutes from "./routes";
import theme from "./themes/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AllRoutes />
    </ThemeProvider>
  );
}

export default App;
