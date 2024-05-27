import { extendTheme } from "@chakra-ui/react";
import "@fontsource/montserrat";

export const theme = extendTheme({
  colors: {
    dark: "#0e2630",
    med: "#214858",
    light: "#507483",
    lighter: "#c4dce6",
    lightest: "#e4f0f5",
    fontDark: "#131313",
    fontMed: "#3b3b3b",
    fontLight: "#f5fefd",
  },
  fonts: {
    body: "Montserrat",
    heading: "Montserrat",
    mono: "Menlo, monospace",
  },
});
