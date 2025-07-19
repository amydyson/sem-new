// theme.tsx
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#D8E6ED",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          fontFamily: "Roboto, sans-serif",
          backgroundColor: "#D8E6ED",
        },
      },
    },
  },
});

export default theme;
