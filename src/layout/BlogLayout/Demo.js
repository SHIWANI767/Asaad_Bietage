import {
  AppBar,
  Toolbar,
  styled,
  Button,
  IconButton,
  Drawer,
  Box,
  Typography,
  Container,
} from "@mui/material";
import Scroll from "react-scroll";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useRouter } from "next/router";
import Logo from "./../../component/Logo";
import { AppContext } from "@/context/AppContext";
const ScrollLink = Scroll.Link;

const MainBox = styled("div")(({ theme }) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    padding: " 15px 0px",
    "& .MuiButton-containedPrimary:hover": {
      color: "#fff",
    },
    "& .MuiButton-text": {
      padding: "6px 0px",
    },
  },
  logoDrawer: {
    width: "140px",
  },
  drawerContainer: {
    padding: "20px 0px 20px 20px",
    height: "100%",
    background: theme.palette.background.header,
    color: "#fff",
    width: "260px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  drawericon: {
    color: "#000",
    marginLeft: "0px !important",
    fontSize: "25px",
  },
  logoImg: {
    width: "75px",
    margin: " 14px 15px 11px 0px",
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      width: "80px !important",
    },
    "@media (max-width: 500px)": {
      margin: " 11px 1px 3px 0px",

      width: "75px",
    },
  },
  mainHeader: {
    justifyContent: "space-between",
    padding: "6px 0px",
  },

  menuButton1: {
    paddingLeft: "0",
    display: "block",
    color: "#fff",
    width: "100%",
    minWidth: "100px",
    whiteSpace: "pre",
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
  },
  menuMobile1: {
    padding: "15px 0",
    "& h4": {
      fontSize: "14px !important",
      lineHeight: " 17px",
      color: theme.palette.text.main,
      margin: "0 8px",
      fontWeight: "400",
      [theme.breakpoints.only("xs")]: {
        fontSize: "12px !important",
      },
    },
    "& svg": {
      color: theme.palette.text.main,
      "@media (max-width:767px)": {
        display: "none",
      },
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  headerBox: {
    background: "transparent",
    padding: "0px 50px",
    [theme.breakpoints.down("md")]: {
      padding: "0px 0px",
    },
  },
  ecoButton: {
    whiteSpace: "pre",
    borderRadius: "2px",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "24px",
    border: "1px solid #fff",
    marginLeft: "4px",
  },
  ecoButton1: {
    whiteSpace: "pre",
    borderRadius: "2px",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "24px",
    border: "1px solid #fff",
    height: "43px",
    marginLeft: "17px",
  },
}));

export default function Header() {
  // const classes = useStyles();
  const auth = useContext(AppContext);
  const {
    menuButton1,
    toolbar,
    drawerContainer,
    drawericon,
    mainHeader,
    ecoButton,
    ecoButton1,
  } = useStyles();
  const history = useRouter();
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = state;
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1220
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          {femmecubatorLogo}
        </Box>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <ScrollLink
            onClick={() => history.push("/")}
            smooth={true}
            duration={500}
            to="feature"
            style={{ cursor: "pointer" }}
          >
            <Typography variant="h6" className={menuButton1}>
              Features
            </Typography>
          </ScrollLink>
          <ScrollLink
            onClick={() => history.push("/")}
            smooth={true}
            duration={500}
            to="work"
            style={{ cursor: "pointer" }}
          >
            <Typography variant="h6" className={menuButton1}>
              How it works
            </Typography>
          </ScrollLink>
          <ScrollLink
            onClick={() => history.push("/")}
            smooth={true}
            duration={500}
            to="price"
            style={{ cursor: "pointer" }}
          >
            <Typography variant="h6" className={menuButton1}>
              Pricing
            </Typography>
          </ScrollLink>
          <ScrollLink
            onClick={() => history.push("/")}
            smooth={true}
            duration={500}
            to="/"
            style={{ cursor: "pointer" }}
          >
            <Typography variant="h6" className={menuButton1}>
              Affiliate Plan
            </Typography>
          </ScrollLink>
          {auth.userLoggedIn ? (
            <Button
              variant="outlined"
              className={ecoButton1}
              to="/my-wallet"
              color="primary"
              fullWidth
              component={Link}
            >
              Dashboard
            </Button>
          ) : (
            <Button
              variant="outlined"
              className={ecoButton1}
              to="/login"
              color="primary"
              fullWidth
              component={Link}
            >
              Get Started
            </Button>
          )}
        </Box>
      </Toolbar>
    );
  };
  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    //mobile
    return (
      <Toolbar className={mainHeader}>
        <Drawer
          {...{
            anchor: "right",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>
            {femmecubatorLogo}
            <ScrollLink
              onClick={() => history.push("/")}
              smooth={true}
              duration={500}
              to="feature"
              style={{ cursor: "pointer", textAlign: "left" }}
            >
              <Typography
                variant="h6"
                className={menuButton1}
                style={{ textAlign: "left", marginTop: "10px" }}
              >
                Features
              </Typography>
            </ScrollLink>
            <ScrollLink
              onClick={() => history.push("/")}
              smooth={true}
              duration={500}
              to="work"
              style={{ cursor: "pointer" }}
            >
              <Typography
                variant="h6"
                className={menuButton1}
                style={{ textAlign: "left", marginTop: "10px" }}
              >
                How it works
              </Typography>
            </ScrollLink>
            <ScrollLink
              onClick={() => history.push("/")}
              smooth={true}
              duration={500}
              to="price"
              style={{ cursor: "pointer" }}
            >
              <Typography
                variant="h6"
                className={menuButton1}
                style={{ textAlign: "left", marginTop: "10px" }}
              >
                Pricing
              </Typography>
            </ScrollLink>
            <ScrollLink
              onClick={() => history.push("/")}
              smooth={true}
              duration={500}
              to="/"
              style={{ cursor: "pointer" }}
            >
              <Typography
                variant="h6"
                className={menuButton1}
                style={{ textAlign: "left", marginTop: "10px" }}
              >
                Affiliate Plan
              </Typography>
            </ScrollLink>
            <Box style={{ marginTop: "10px" }}>
              {auth.userLoggedIn ? (
                <Button
                  variant="outlined"
                  className={ecoButton}
                  to="/my-wallet"
                  color="primary"
                  fullWidth
                  component={Link}
                >
                  Dashboard
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  className={ecoButton}
                  to="/login"
                  color="primary"
                  fullWidth
                  component={Link}
                >
                  Get Started
                </Button>
              )}
            </Box>
            <div></div>
          </div>
        </Drawer>

        <Box display="flex" justifyContent="space-between">
          {femmecubatorLogo}
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton
            className={drawericon}
            {...{
              edge: "start",
              color: "inherit",
              "aria-label": "menu",
              "aria-haspopup": "true",
              onClick: handleDrawerOpen,
            }}
          >
            <MenuIcon
              width="60px"
              height="60px"
              style={{ color: "#F39200", fontSize: "26px" }}
            />
          </IconButton>
        </Box>
      </Toolbar>
    );
  };
  const femmecubatorLogo = (
    <Box>
      <Link to="/">
        <Logo className="logoImg" />
      </Link>
    </Box>
  );
  return (
    <MainBox>
      <AppBar
        className={"headerBox"}
        position={history.location.pathname !== "/" ? "relative" : "absolute"}
        elevation={0}
        style={{ border: "none" }}
      >
        <Container maxWidth={false}>
          {mobileView ? displayMobile() : displayDesktop()}
        </Container>
      </AppBar>
    </MainBox>
  );
}
