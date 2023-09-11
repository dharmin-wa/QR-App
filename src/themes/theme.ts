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
});

export default theme;
