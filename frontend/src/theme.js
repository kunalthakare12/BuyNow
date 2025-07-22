import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // blue
    },
    secondary: {
      main: "#ff9800", // orange
    },
    background: {
      default: "#f5f5f5",
      paper: "#fff",
    },
    text: {
      primary: "#222",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 500 },
  },
});

export default theme;