import { ThemeProvider, responsiveFontSizes } from "@mui/material";
import "./App.css";
import AllRoutes from "./routes";
import theme from "./themes/theme";
import ScrollToTop from "./presentation/ScrollToTop";

const clonedTheme = responsiveFontSizes(theme);

function App() {
  return (
    <>
      <ScrollToTop />
      <ThemeProvider theme={clonedTheme}>
        <AllRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
