import React, { useEffect } from "react";
import { ThemeProvider, responsiveFontSizes } from "@mui/material";
import "./App.css";
import AllRoutes from "./routes";
import theme from "./themes/theme";
import ScrollToTop from "./presentation/ScrollToTop";
import { loadStateFn } from "./utils/localStorage";
import i18n from "./i18n/i18n";

const clonedTheme = responsiveFontSizes(theme);

function App() {
  useEffect(() => {
    const storedLanguage = loadStateFn("selectedLanguage");
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

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
