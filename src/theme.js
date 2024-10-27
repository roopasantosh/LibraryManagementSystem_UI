import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Montserrat"', "sans-serif"].join(","),
    fontWeightBold: 700,
    fontWeightLight: 400,
    fontWeightMedium: 600,
    fontWeightRegular: 500,
  },
  overrides: {},
  palette: {
    primary: {
      main: "#01313f",
    },
    secondary: {
      main: "#ee3638",
    },
  },
});

export default theme;
