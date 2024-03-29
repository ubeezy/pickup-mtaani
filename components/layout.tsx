import { createTheme,ThemeProvider } from "@mui/material";
import { Box } from "@mui/material";
import Container from '@mui/material/Container';
import { useState, useMemo } from "react";
import { PaletteMode } from "@mui/material";
import {  useSelector, } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";

import Navbar from './navbar';
import { getDesignTokens } from "../styles/theme";

interface Props {
  children: React.ReactNode;
}

interface RootState {
    theme: {
      darkMode:boolean
    };
}


export default function Layout({ children }: Props) {
  const [mode, setMode] = useState<PaletteMode>("light");
  const router = useRouter();
  const currentRoute:string = router.pathname;
  const colorMode:Boolean = useSelector((state: RootState) => state.theme.darkMode);
  useMemo(() => {
    setMode((prevMode: PaletteMode) =>
      prevMode === "light" ? "dark" : "light"
    );
  }, [colorMode]);


  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Mtaani - affordable and convenient collection points</title>
      </Head>
       <Navbar />
      <Box component="main">
        <Container disableGutters maxWidth={"md"} component="main">
          {children}
        </Container>
      </Box>
    </ThemeProvider>
  );
}