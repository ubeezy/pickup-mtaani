import { PaletteMode } from "@mui/material";
import { Roboto,Fira_Sans } from 'next/font/google';

export const roboto = Fira_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: { main: "#38BCF7",secondary:"#aab4be" },
          secondary: { main: "#000",secondary:"#fff" },
          warning:{main:"#c1004b",},
          contrastText: "#fff",
          text: {
            primary: "#000",
            secondary: "#334155",
          },
          contrast:{main:"#CCF9FF"},
          background: {
            default: "#F5F5F5",
            paper: "#fff",
          },
        }
      : {
          // palette values for dark mode
          primary: { main: "#38BCF7",secondary:"#B5CDF5" },
          secondary: { main: "#B5CDF5",secondary:"#aab4be" },
          warning:{main:"#c1004b"},
          contrast:{main:"#1e293b"},
          divider: "#323952",
          contrastText: "#000",
          background: {
            default: "#0B1222",
            paper: "#1D2A3B",
          },
          text: {
            primary: "#B5CDF5",
            secondary: "#B3C5EE",
          },
        }),
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h6: {
      fontSize: "15pt",
    },
    subtitle1: {
      fontSize: "12pt",
    },
    body1: {
      fontSize: "10pt",
    },
  }
});