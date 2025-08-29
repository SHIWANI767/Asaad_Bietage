import React, { useState, useEffect } from "react";
import { Box, Button, styled, ThemeProvider } from "@mui/material";
import { useRouter } from "next/router";
import Topbar from "./Topbar";
import { useContext } from "react";
import SettingsContext from "@/context/SettingsContext";
import { createCustomTheme, darkTheme, lighttheme } from "@/theme";
const MainLayout = styled("div")(({ theme }) => ({
  minHeight: "calc(100vh - 120px)",
  paddingTop: "130px",
  backgroundRepeat: "no-repeat",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "url(/images/back_dark.svg)"
      : "url(/images/lightLogin.svg)",
  backgroundPosition: "top left",
  backgroundSize: "cover",
  zIndex: "2",
}));

const Root1 = styled("div")(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  height: "100vh",
  "& .MainLayoutmain": {
    zIndex: "1",
    overflow: "hidden",
    position: "relative",
    // backgroundColor: "#061008",
    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)),url(/images/login_back_dark.svg)"
        : "linear-gradient(rgba(209,209,209,.5), rgba(209,209,209,.5)),url(/images/lightLogin.svg)",
    backgroundPosition: "bottom center",
    backgroundRepeat: "no-repeat",
    height: "100dvh",
    backgroundSize: "cover",
  },

  "& .MainLayout": {
    height: "calc(100vh - 64px)",
    position: "relative",
    overflowY: "auto",
    paddingTop: "80px",
  },
  "& .lineBorderlogin": {
    position: "absolute",
    zIndex: "-1",
    opacity: "0.1",
    bottom: "9%",
    width: "auto",
    maxWidth: "100%",
  },
  "& .lineBorderloginRignt": {
    position: "absolute",
    zIndex: "-1",
    opacity: "0.1",
    bottom: "17%",
    width: "auto",
    maxWidth: "100%",
    right: "0",
  },
  "& .lineBorderloginleft": {
    position: "absolute",
    zIndex: "-1",
    opacity: "0.1",
    bottom: "17%",
    width: "auto",
    maxWidth: "100%",
    left: "0",
  },
}));
export const btnArr = [
  { name: "Contact Us", route: "/" },
  { name: "Terms", route: "/" },
  { name: "Policy", route: "/" },
];
export default function LoginLayout({ children }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const themeSetting = useContext(SettingsContext);
  const theme = createCustomTheme({
    mode: themeSetting.settings.theme === "DARK" ? "dark" : "light",
  });

  const background = themeSetting.settings.theme === "DARK" ? "root1" : "root";
  return (
    <ThemeProvider
      theme={themeSetting.settings.theme === "DARK" ? darkTheme : lighttheme}
    >
      <Root1 className={background}>
        <div className="MainLayoutmain">
          <Topbar />

          <div className="MainLayout">{children}</div>
        </div>
      </Root1>
    </ThemeProvider>
  );
}
