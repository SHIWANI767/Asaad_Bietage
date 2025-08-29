import React, { useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled } from "@mui/system";
import {
  IconButton,
  Toolbar,
  AppBar,
  Box,
  Avatar,
  Typography,
  Hidden,
  Button,
  Badge,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import Link from "next/link";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useRouter } from "next/router";
import { IoIosNotificationsOutline } from "react-icons/io";
import AppContext from "@/context/AppContext";
import Popup from "@/components/DynamicModel";
import NotificationModal from "@/components/NotificationModal";
import { BsFillSunFill } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";
import SettingsContext from "@/context/SettingsContext";
import Title from "@/components/Title";
import CountrySelectModal from "@/components/CountrySelectModal";
import { IoMdNotificationsOutline } from "react-icons/io";

const AppBarContainer = styled(AppBar)(({ theme }) => ({
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
  backgroundColor: "rgba(0, 0, 0, 0.45)",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: "20px 20px 7px 20px",

  [theme.breakpoints.down("sm")]: {
    padding: "4px 20px 0px 0px",
    paddingRight: "20px !important",
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: "0px",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  cursor: "pointer",
}));

const MainHeader = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",

  "& .IconButtonBox": {
    gap: "10px",
    "& .MuiIconButton-root": {
      padding: "5px !important",
      color: "#fff",
      background: "linear-gradient(178.65deg, #1A1B19 -0.59%, #1E1F1C 99.02%)",
    },
  },
  // "& .leftBox": {
  //   width: "306px",
  //   [theme.breakpoints.down("md")]: {
  //     width: "200px",
  //   },
  //   [theme.breakpoints.down("xs")]: {
  //     width: "150px",
  //   },
  //   "& img": {
  //     width: "150px",
  //     [theme.breakpoints.down("xs")]: {
  //       width: "104px",
  //       paddingLeft: "0 !important",
  //     },
  //   },
  // },

  "& .leftBox": {
    width: "455px",
    [theme.breakpoints.down("md")]: {
      width: "300px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "150px",
    },
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const router = useRouter();
  const [isLogout, setIsLogout] = useState(false);
  const [open, setOpen] = useState(false);
  const auth = useContext(AppContext);
  const themeSetting = useContext(SettingsContext);
  const firstName = auth.userData?.firstName || "";
  const lastName = auth.userData?.lastName || "";
  const email = auth.userData?.email || "";
  const initials = `${firstName.charAt(0)}`;
  const obfuscatedEmail = email.split("@")[0];
  const [openCountryModal, setOpenCountryModal] = useState(false);

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
  const changeTheme = (type) => {
    themeSetting.saveSettings({
      theme: type,
    });
  };

  useEffect(() => {
    if (auth?.userData) {
      if (!auth.userData?.country) {
        setOpenCountryModal(true);
      }
    }
  }, [auth?.userData]);

  return (
    <AppBarContainer
      elevation={0}
      className={clsx(className)}
      color="inherit"
      style={{
        backdropFilter: "blur(1px)",
        background: "transparent",
        boxShadow: "none",
      }}
    >
      <StyledToolbar>
        <Hidden lgUp>
          <StyledIconButton color="#00e0b0" onClick={onMobileNavOpen}>
            <MenuIcon style={{ color: "rgb(0, 198, 79)", fontSize: "25px" }} />
          </StyledIconButton>
          {/* <Title /> */}
        </Hidden>
        &nbsp; &nbsp;
        <MainHeader>
          <Box className="displaySpacebetween " style={{ width: "100%" }}>
            <Box className="leftBox displayStart logoLeftImg">
              <Title />
            </Box>
            <Box
              className="leftBox logoLeftImg"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                "& p": {
                  color: "#e0e1e0",
                  fontWeight: 400,
                  fontSize: "14px",
                },
              }}
            >
              <Link href="/">
                {/* <Hidden smUp>
                  <img
                    src="/images/sprtLogo.png"
                    alt="Logo"
                    style={{ width: "25px", height: "100%" }}
                  />
                </Hidden> */}
              </Link>
            </Box>

            <Box className="displayEnd" gap="10px">
              <Box className="IconButtonBox" style={{ display: "flex" }}>
                {themeSetting.settings.theme === "DARK" ? (
                  <IconButton
                    size="small"
                    color="secondary"
                    style={{ width: "40px", height: "40px" }}
                    onClick={() => changeTheme("LIGHT")}
                  >
                    <BsFillSunFill />
                  </IconButton>
                ) : (
                  <IconButton
                    color="secondary"
                    size="small"
                    style={{ width: "40px", height: "40px" }}
                    onClick={() => changeTheme("DARK")}
                  >
                    <FaRegMoon />
                  </IconButton>
                )}
                <IconButton
                  style={{ width: "40px", height: "40px" }}
                  onClick={() => router.push("/dashboard/notification")}
                >
                  <Badge color="error" badgeContent={auth.count?.length}>
                    <IoMdNotificationsOutline
                      style={{
                        fontSize: "25px",
                      }}
                    />
                  </Badge>
                </IconButton>
                {/* <Button
                variant="contained"
                color="secondary"
                className="logoutButtonNew"
                onClick={() => setIsLogout(true)}
                startIcon={<ExitToAppIcon />}
              >
                Logout
              </Button> */}
              </Box>
              <Box className="displayAlign profiledataname" gap="10px">
                <Avatar sx={{ background: "rgb(185 246 91)", color: "#000" }}>
                  {initials}
                </Avatar>
                <Typography
                  variant="body2"
                  color="primary"
                  fontSize="12px"
                  className="textEllysis usernameText"
                >
                  {firstName && lastName
                    ? firstName + " " + lastName
                    : obfuscatedEmail}
                </Typography>
              </Box>
            </Box>
          </Box>
          {isLogout && (
            <Popup
              maxWidth="xs"
              open={isLogout}
              handleClose={() => setIsLogout(false)}
              title="Log Out"
              actions={[
                {
                  label: "Cancel",
                  onClick: () => setIsLogout(false),
                  color: "secondary",
                  variant: "contained",
                },
                {
                  label: "Confirm",
                  onClick: handelLogout,
                  color: "primary",
                  variant: "contained",
                },
              ]}
            >
              <Box
                align="center"
                sx={{
                  p: 2,
                }}
              >
                <Typography
                  variant="body2"
                  color="secondary"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  Are you sure want to logout?
                </Typography>
              </Box>
            </Popup>
          )}
          {open && <NotificationModal open={open} handleClose={handleClose} />}
          {openCountryModal && (
            <CountrySelectModal
              open={openCountryModal}
              handleClose={() => setOpenCountryModal(false)}
            />
          )}
        </MainHeader>
      </StyledToolbar>
    </AppBarContainer>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => {},
};

export default TopBar;
