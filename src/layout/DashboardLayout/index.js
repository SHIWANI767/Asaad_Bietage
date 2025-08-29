import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { styled, ThemeProvider } from "@mui/system";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import { Box } from "@mui/material";
import AppContext from "@/context/AppContext";
import SettingsContext from "@/context/SettingsContext";
import { darkTheme, lighttheme } from "@/theme";
import CustomStatus from "@/components/CustomStatus";
import HandleDocusealContract from "@/pages/dashboard/exchanges/HandleDocusealContract";
import Pageloader from "@/components/PageLoader/Pageloader";

const RootContainer = styled("div")(({ theme }) => ({
  "& .MainLayoutmain": {
    zIndex: "1",
    overflow: "hidden",
    position: "relative",
    backgroundSize: "cover",

    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(180deg, #0C0C0B 0%, #000000 100%)"
        : "#fff",
    // backgroundImage:
    //   theme.palette.mode === "dark"
    //     ? "url(/images/dash_back.svg)"
    //     : "url(/images/login_back_light.svg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
  },

  background: "rgb(5 11 9)",
  // overflow: "hidden",
  position: "relative",
  // height: "100vh",
  height: "100%",
  "& .wrapper1": {
    // backgroundColor: "#000",
    // background: "rgba(13, 18, 16, 0.65)",
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    backgroundSize: "cover",
    position: "relative",
    paddingTop: 75,
    minHeight: "calc(100dvh - 77px)",
    "@media (min-width: 1199px)": {
      paddingLeft: "220px",
      // paddingRight: "30px",
    },
    // "@media (min-width: 1280px)": {
    //   paddingLeft: "256px",
    // },
    "@media (max-width:767px)": {
      paddingTop: "70px !important",
    },
  },
}));

const WrapperContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
});

const ContentContainer = styled("div")(({ theme }) => ({
  flex: "1 1 auto",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  padding: "52px 25px 25px 70px",
  borderRadius: "50px",
  "@media (max-width:1200px)": {
    padding: "20px",
  },

  [theme.breakpoints.down("md")]: {
    padding: "15px",
  },
}));

const DashboardLayout = ({ children }) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { isDashboardLoading, userLoggedIn, userData } = useContext(AppContext);
  const themeSetting = useContext(SettingsContext);
  const [useDocusealContract, setUseDocusealContract] = useState(false);

  useEffect(() => {
    if (userData?.isRejected) {
      setUseDocusealContract(true);
    }
  }, [userData?.isRejected]);

  return (
    <ThemeProvider
      theme={themeSetting.settings.theme === "DARK" ? darkTheme : lighttheme}
      style={{ background: "rgb(5 11 9)" }}
    >
      <RootContainer>
        <Box className="MainLayoutmain">
          <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
          <NavBar
            onMobileClose={() => setMobileNavOpen(false)}
            openMobile={isMobileNavOpen}
          />
          <div className="wrapper1">
            <WrapperContainer>
              {!isDashboardLoading ? (
                <ContentContainer
                  id="main-scroll"
                  style={{ position: "relative" }}
                >
                  <CustomStatus />
                  {children}
                </ContentContainer>
              ) : (
                <Pageloader />
              )}
            </WrapperContainer>
          </div>
        </Box>
      </RootContainer>
      {useDocusealContract && (
        <HandleDocusealContract
          open={useDocusealContract}
          handleClose={() => setUseDocusealContract(false)}
          email={userData.email}
          name={userData.firstName + " " + userData.lastName}
        />
      )}
    </ThemeProvider>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default React.memo(DashboardLayout);
