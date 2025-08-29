import React, { useContext } from "react";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import { ThemeProvider, Typography } from "@mui/material";
import SettingsContext from "@/context/SettingsContext";
import { createCustomTheme, darkTheme, lighttheme } from "@/theme";
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
  background: "#222",
}));
const LoaderImage = styled("img")`
width: auto;
max - width: 100 %;
`;

export default function PageLoading() {
  const themeSetting = useContext(SettingsContext);
  return (
    <ThemeProvider
      theme={themeSetting.settings.theme === "DARK" ? darkTheme : lighttheme}
    >
      <RootContainer>
        <Box align="center">
          {/* <Typography variant="h3" color="primary">feugye</Typography> */}
          <LoaderImage src="/images/logo.svg" alt="loader" />
        </Box>
      </RootContainer>
    </ThemeProvider>
  );
}
