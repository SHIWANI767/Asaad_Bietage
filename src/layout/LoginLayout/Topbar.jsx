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
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { IoMenu } from "react-icons/io5";
import SettingsContext from "@/context/SettingsContext";
import { BsFillSunFill } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";
import { RiLoginBoxLine } from "react-icons/ri";
import Logo from "../../components/Logo";

const headersData = [
  {
    label: "About",
    href: "/about-us",
  },
  {
    label: "Pricing",
    href: "/price",
  },
];

export default function Header() {
  const router = useRouter();
  const themeSetting = useContext(SettingsContext);
  const theme = useTheme();
  const isResponsive = useMediaQuery(theme.breakpoints.down("md"));
  const [state, setState] = useState({
    mobileView: true,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      setState((prevState) => ({
        ...prevState,
        mobileView: isResponsive,
      }));
    };

    setResponsiveness();
    window.addEventListener("resize", setResponsiveness);

    return () => {
      window.removeEventListener("resize", setResponsiveness);
    };
  }, [isResponsive]);

  const handleDrawerOpen = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: true }));
  const handleDrawerClose = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: false }));

  const displayDesktop = () => (
    <Toolbar className="topbarmainBox">
      {femmecubatorLogo}
      <Grid
        container
        item
        direction="row"
        justify="flex-end"
        alignItems="center"
        style={{ paddingLeft: "0px" }}
        className="displayEnd"
      >
        {/* {getMenuButtons()} */}
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
        <Box className="buttonTopbar">
          <Button
            variant="contained"
            className="ecoButton"
            color="secondary"
            onClick={() => {
              router.push("/auth/signup");
            }}
            style={{ whiteSpace: "pre", marginRight: "15px" }}
          >
            Sign Up
          </Button>
          <Button
            variant="contained"
            className="ecoButton"
            color="primary"
            startIcon={<RiLoginBoxLine />}
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            Log In
          </Button>
        </Box>
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
        <Button
          key={label}
          color="inherit"
          className={`menuButton ${isActive ? "active" : ""}`}
          onClick={() => {
            router.push(href);
          }}
        >
          {label}
        </Button>
      );
    });
  };

  const getMenuButtonsMobile = () => {
    return headersData.map(({ label, href }) => {
      const isActive = router.pathname === href;
      return (
        <Button
          key={label}
          color="inherit"
          className={`menuButton1 ${isActive ? "active" : ""}`}
          onClick={() => {
            router.push(href);
          }}
          sx={{
            textAlign: "center",
            "&:hover": {
              backgroundColor: "transparent !important",
            },
          }}
        >
          {label}
        </Button>
      );
    });
  };

  const displayMobile = () => (
    <Toolbar className={""} style={{ padding: "0 10px" }}>
      <Hidden xsDown>
        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
          <Box style={{ padding: "20px" }}>
            <Box mb={3}>{femmecubatorLogo}</Box>

            {getMenuButtonsMobile()}
            <Box className="buttonTopbar">
              <Button
                variant="contained"
                className="ecoButton"
                color="secondary"
                onClick={() => {
                  router.push("/auth/signup");
                }}
                style={{
                  whiteSpace: "pre",
                  marginTop: "13px",
                  minWidth: "147px",
                }}
              >
                Sign Up
              </Button>
              <Button
                variant="contained"
                className="ecoButton"
                color="primary"
                onClick={() => {
                  router.push("/auth/login");
                }}
                style={{
                  whiteSpace: "pre",
                  marginTop: "13px",
                  minWidth: "147px",
                }}
              >
                Sign in
              </Button>
            </Box>
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
        </div>{" "}
        {/* <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          aria-haspopup="true"
          onClick={handleDrawerOpen}
        >
          <MenuIcon
            width="60px"
            height="60px"
            style={{ color: "#bef856", fontSize: "40px" }}
          />
        </IconButton> */}
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
        <Container className="containerloginBox" maxWidth="lg">
          {mobileView ? displayMobile() : displayDesktop()}
        </Container>
      </AppBar>
    </>
  );
}
