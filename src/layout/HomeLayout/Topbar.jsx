import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import {
  AppBar,
  Toolbar,
  Drawer,
  Grid,
  Box,
  Container,
  IconButton,
  Hidden,
  Button,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import Scroll from "react-scroll";
import MenuIcon from "@mui/icons-material/Menu";
import { IoMenu } from "react-icons/io5";

import Logo from "../../components/Logo";
import AppContext from "@/context/AppContext";
import PrivacyModal from "../LoginLayout/PrivacyModal";
import Cookies from "js-cookie";
import { api_configs } from "@/api-services";
import { apiRouterCall } from "@/api-services/service";
import SettingsContext from "@/context/SettingsContext";
import { BsFillSunFill } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";
import { RiLoginBoxLine } from "react-icons/ri";
import Profile from "./Profile";
import ScheduleDialog from "./ScheduleDialog";
import Popup from "@/components/DynamicModel";

const headersData = [
  {
    label: "Exchanges",
    href: "/exchanges",
  },
  {
    label: "Pricing",
    href: "/price",
  },

  {
    label: "Features",
    href: "/features",
  },
  {
    label: "Tutorials",
    href: "/tutorial",
  },
];

export default function Header() {
  const themeSetting = useContext(SettingsContext);
  const router = useRouter();
  const auth = useContext(AppContext);
  const theme = useTheme();
  const isResponsive = useMediaQuery(theme.breakpoints.down("md"));
  // let token = window.localStorage.getItem("user_token");
  const { openTrmConPol, setOpenTrmConPol } = useContext(AppContext);
  // const [isAccepted, setisAccepted] = useState("");
  const [isSchedule, setSchedule] = useState(false);
  const handleAcceptPrivacyPolicy = () => {
    updateTermsAndConditions("ACCEPT");
  };
  const handleDeclinePrivacyPolicy = () => {
    updateTermsAndConditions("DECLINE");
    Cookies.set("AcceptTerm&Condition", "DECLINE", { expires: 1 });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handelLogout = () => {
    try {
      setIsLogout(false);
      auth.handleLogout("Logout successfuly");
    } catch (error) {
      console.log("err", error);
    }
  };

  const updateTermsAndConditions = async (type) => {
    let token = window.localStorage.getItem("user_token");
    try {
      const response = await apiRouterCall({
        method: "GET",
        url: api_configs.updateTermsAndConditions,
        token: token,
        paramsData: { termsAndConditions: type },
      });
      if (response.data.responseCode === 200) {
        auth.getProfileDataHandler(token);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const ScrollLink = Scroll.Link;
  const [state, setState] = useState({
    mobileView: true,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = state;
  useEffect(() => {
    const handleResize = () => {
      setState((prevState) => ({
        ...prevState,
        // mobileView: window.innerWidth < 1220,
        mobileView: isResponsive,
      }));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isResponsive]);

  const handleDrawerOpen = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: true }));
  const handleDrawerClose = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: false }));

  const displayDesktop = () => (
    <Toolbar className="topbarmainBox" style={{}}>
      {femmecubatorLogo}

      {getMenuButtons()}
      <Profile />
      <Grid
        container
        item
        direction="row"
        justify="flex-end"
        alignItems="center"
        style={{ paddingLeft: "0px", width: "auto" }}
        className="displayEnd"
      >
        {themeSetting.settings.theme === "DARK" ? (
          <IconButton
            size="small"
            color="secondary"
            onClick={() => changeTheme("LIGHT")}
          >
            <BsFillSunFill />
          </IconButton>
        ) : (
          <IconButton
            color="secondary"
            size="small"
            onClick={() => changeTheme("DARK")}
          >
            <FaRegMoon />
          </IconButton>
        )}

        {!auth.userLoggedIn ? (
          <Box className="buttonTopbar">
            <Button
              variant="contained"
              className="demobookbutton"
              color="primary"
              onClick={() => {
                router.push("/auth/signup");
              }}
              style={{ marginRight: "15px" }}
            >
              Sign Up
            </Button>
            <Button
              variant="contained"
              className="login-button demobookbutton"
              startIcon={<RiLoginBoxLine />}
              color="secondary"
              style={{ marginRight: "15px" }}
              onClick={() => {
                router.push("/auth/login");
              }}
            >
              Log In
            </Button>

            <Button
              variant="contained"
              className="login-button demobookbutton"
              color="primary"
              onClick={() => setSchedule(true)}
            >
              Book a Demo
            </Button>
          </Box>
        ) : (
          <Box className="buttonTopbar">
            <Button
              variant="contained"
              className="ecoButton demobookbutton"
              color="primary"
              onClick={() => {
                router.push("/dashboard");
              }}
              style={{ whiteSpace: "pre", marginRight: "15px" }}
            >
              Dashboard
            </Button>
          </Box>
        )}
      </Grid>
    </Toolbar>
  );

  const femmecubatorLogo = (
    <Box onClick={() => router.push("/")} style={{ cursor: "pointer" }}>
      <Logo className="logoImg" />
    </Box>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      const isActive = router.pathname === href;
      return (
        <ScrollLink to={label}>
          <Button
            key={label}
            color="inherit"
            className={`menuButton ${isActive ? "active" : ""}`}
            onClick={() => {
              router.push(href);
            }}
            sx={{
              color: (theme) =>
                isActive
                  ? theme.palette.text.active
                  : theme.palette.text.primary,
              "&:hover": {
                backgroundColor: "transparent !important",
              },
            }}
          >
            {label}
          </Button>
        </ScrollLink>
      );
    });
  };

  const getMenuButtonsMobile = (handleDrawerClose) => {
    return headersData.map(({ label, href }) => {
      const isActive = router.pathname === href;
      return (
        <ScrollLink to={label}>
          <Button
            key={label}
            color="inherit"
            className={`menuButton1 ${isActive ? "active" : ""}`}
            onClick={() => {
              // if (href !== "/price") {
              router.push(href);
              // } else {
              //   router.push(`/?id=${label}`);
              //   handleDrawerClose();
              // }
            }}
            sx={{
              display: "block",
              padding: "7px 17px !important",
              color: (theme) =>
                isActive
                  ? theme.palette.text.active
                  : theme.palette.text.primary,
              "&:hover": {
                backgroundColor: "transparent !important",
              },
            }}
          >
            {label}
          </Button>
        </ScrollLink>
      );
    });
  };

  const displayMobile = () => (
    <Toolbar className={""}>
      <Hidden xsDown>
        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
          <Box style={{ padding: "10px" }}>
            <Box mb={3}>{femmecubatorLogo}</Box>

            {handleDrawerClose}
            {getMenuButtonsMobile()}
            {!auth.userLoggedIn ? (
              <Box className="buttonTopbar" style={{ marginLeft: "10px" }}>
                <Button
                  variant="contained"
                  // className="ecoButton"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    router.push("/auth/login");
                  }}
                  style={{
                    whiteSpace: "pre",
                    marginTop: "13px",
                    minWidth: "147px",
                    fontSize: "10px",
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="contained"
                  className="ecoButton"
                  color="secondary"
                  fullWidth
                  onClick={() => {
                    router.push("/auth/signup");
                  }}
                  style={{
                    whiteSpace: "pre",
                    marginTop: "13px",
                    minWidth: "147px",
                    fontSize: "10px",
                  }}
                >
                  Sign Up
                </Button>

                <Button
                  variant="contained"
                  className="login-button"
                  color="primary"
                  fullWidth
                  style={{ marginTop: "13px", fontSize: "10px" }}
                  onClick={() => setSchedule(true)}
                >
                  Book a Demo
                </Button>
              </Box>
            ) : (
              <Box className="buttonTopbar">
                <Button
                  variant="contained"
                  className="ecoButton"
                  color="primary"
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                  style={{
                    whiteSpace: "pre",
                    marginRight: "15px",
                    marginTop: "13px",
                  }}
                >
                  Dashboard
                </Button>
              </Box>
            )}
          </Box>
        </Drawer>
      </Hidden>
      <Box className="topbarmainBox">
        <div>{femmecubatorLogo}</div>
        <div className="displayStart">
          {themeSetting.settings.theme === "DARK" ? (
            <IconButton
              size="small"
              color="secondary"
              onClick={() => changeTheme("LIGHT")}
            >
              <BsFillSunFill />
            </IconButton>
          ) : (
            <IconButton
              color="secondary"
              size="small"
              onClick={() => changeTheme("DARK")}
            >
              <FaRegMoon />
            </IconButton>
          )}
          <IconButton
            color="secondary"
            style={{
              background: "transparent",
              padding: "2px",
              fontSize: "30px",
              // color: (theme) => theme.palette.text.green,
            }}
            onClick={handleDrawerOpen}
          >
            <IoMenu
              width="60px"
              height="60px"
              sx={{ color: "#bef856", fontSize: "40px" }}
            />
          </IconButton>
        </div>
      </Box>
    </Toolbar>
  );
  const changeTheme = (type) => {
    themeSetting.saveSettings({
      theme: type,
    });
  };
  return (
    <>
      <AppBar elevation={0} className="backbarmainBox">
        <Container maxWidth="lg">
          {mobileView ? displayMobile() : displayDesktop()}
        </Container>
        {openTrmConPol && (
          <PrivacyModal
            open={openTrmConPol}
            handleClose={() => setOpenTrmConPol(false)}
            onAccept={handleAcceptPrivacyPolicy}
            onDecline={handleDeclinePrivacyPolicy}
          />
        )}

        {isSchedule && (
          <Popup
            maxWidth="lg"
            open={isSchedule}
            handleClose={() => setSchedule(false)}
            title="Book a Demo"
            actions={[]} // No actions
            fullWidth
            style={{ backgroundColor: "#000", color: "white" }} // For MUI's sx prop
          >
            <div align="center" className="scheduleBox">
              <Typography variant="body2" color="secondary" mb={2}>
                Schedule a free demo session.
              </Typography>

              <iframe
                src="https://link.emerj.pro/widget/booking/SBjx4YFD4eYrAdrjceNA"
                style={{
                  width: "98%",
                  border: "none",
                  overflow: "hidden",
                }}
                title="Demo Iframe"
              ></iframe>
            </div>
          </Popup>
        )}
      </AppBar>
    </>
  );
}
