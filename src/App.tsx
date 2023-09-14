import { ThemeProvider, responsiveFontSizes } from "@mui/material";
import "./App.css";
import AllRoutes from "./routes";
import theme from "./themes/theme";

const clonedTheme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={clonedTheme}>
      <AllRoutes />
    </ThemeProvider>
  );
}

export default App;
