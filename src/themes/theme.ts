import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4181E0",
      light: "#3DD598",
    },
    secondary: {
      main: "#F8B500",
      light: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Inter"].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
