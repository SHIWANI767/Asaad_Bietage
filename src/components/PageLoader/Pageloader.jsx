import React, { useContext } from "react";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import { ThemeProvider, Typography } from "@mui/material";
import SettingsContext from "@/context/SettingsContext";
import { createCustomTheme, darkTheme, lighttheme } from "@/theme";
import Logo from "../Logo";
const RootContainer = styled("div")(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
  left: 0,
  position: "fixed",
  top: 0,
  width: "100%",
  zIndex: 2000,
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg, #0C0C0B 0%, #000000 100%)"
      : "#fff",
}));
const LoaderImage = styled("img")`
width: auto;
max - width: 100 %;
`;

export default function Pageloader() {
  const themeSetting = useContext(SettingsContext);
  return (
    <ThemeProvider
      theme={themeSetting.settings.theme === "DARK" ? darkTheme : lighttheme}
    >
      <RootContainer>
        <Box align="center">
          {/* <Typography variant="h3" color="primary">feugye</Typography> */}
          {/* <LoaderImage src="/images/logo.svg" alt="loader" /> */}
          <Logo />
        </Box>
      </RootContainer>
    </ThemeProvider>
  );
}
