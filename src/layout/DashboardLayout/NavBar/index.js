import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  Hidden,
  List,
  ListSubheader,
  Typography,
} from "@mui/material";
import { RiHome6Line, RiSettingsLine } from "react-icons/ri";
import { LuArrowUpDown } from "react-icons/lu";
import { CiWallet } from "react-icons/ci";
import { TfiBarChart, TfiHeadphone } from "react-icons/tfi";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Popup from "@/components/DynamicModel";
import {
  MdCurrencyExchange,
  MdHistory,
  MdManageHistory,
  MdOutlinePeopleAlt,
  MdOutlinePriceChange,
} from "react-icons/md";
import NavItem from "./NavItem";
import { fontSize, fontWeight, styled } from "@mui/system";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import AppContext from "@/context/AppContext";
import { TbPlaylistAdd } from "react-icons/tb";
import { BorderRight } from "@mui/icons-material";
import Logo from "@/components/Logo";

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiPaper-root.MuiDrawer-paper": {
    width: "275px",
    background: theme.palette.background.primary,
  },
}));

const DesktopDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiPaper-root.MuiDrawer-paper": {
    width: "250px",
    background: theme.palette.background.secondary,
    margin: "20px 20px 20px 20px",
    borderRadius: "20px",
    height: "calc(100vh - 37px)",
    overflow: "auto",
  },
}));

const SideMenuBox = styled(Box)(({ theme }) => ({
  "& .MuiCollapse-wrapperInner": {
    marginTop: "-20px",
  },
  "& .logoutButton1": {
    color: theme.palette.text.green,
    "& svg": {
      color: theme.palette.text.green,
      fontSize: "13px",
      fontWeight: "300",
    },
  },
}));

const sections = [
  {
    items: [
      {
        title: "Dashboard",
        icon: RiHome6Line,
        href: "/dashboard",
        isHide: false,
      },

      {
        title: "Exchanges",
        icon: LuArrowUpDown,
        href: "/dashboard/exchanges",
        isHide: false,
      },
      {
        title: "Adaptive Quantum AI",
        icon: MdCurrencyExchange,
        isHide: false,
        items: [
          {
            title: "Quantum Flow",
            href: "/dashboard/quantum-flow",
          },
          {
            title: "Quantum Loop",
            href: "/dashboard/quantum-loop",
          },
          {
            title: "Quantum Bridge",
            href: "/dashboard/quantum-bridge",
          },
        ],
      },
      {
        title: "Transaction",
        icon: MdHistory,
        href: "/dashboard/transaction-history",
        isHide: false,
      },
      {
        title: "My Wallet",
        icon: CiWallet,
        href: "/dashboard/my-wallet",
        isHide: false,
      },

      {
        title: "Wallets Whitelisting",
        icon: MdOutlinePeopleAlt,
        href: "/dashboard/wallets-whitelisting",
        isHide: false,
      },
      {
        title: "Whitelist Details",
        icon: TbPlaylistAdd,
        href: "/dashboard/whitelist-details",
        isHide: false,
      },
      {
        title: "Stats",
        icon: MdHistory,
        href: "/dashboard/statistics",
        isHide: false,
      },
      {
        title: "Chart",
        icon: TfiBarChart,
        href: "/dashboard/chart",
        isHide: false,
      },
      {
        title: "Settings",
        icon: RiSettingsLine,
        href: "/dashboard/setting",
        isHide: false,
      },
      // {
      //   title: "Help Center",
      //   icon: TfiHeadphone,
      //   href: "/dashboard/helpcenter",
      //   isHide: "USER",
      // },
      {
        title: "Pricing",
        icon: MdOutlinePriceChange,
        href: "/dashboard/pricing",
        isHide: "USER",
      },
      {
        title: "My Plan Management",
        icon: FaRegCalendarAlt,
        href: "/dashboard/my-plan",
        isHide: "USER",
      },
    ],
  },
];

function renderNavItems({
  items,
  pathname,
  depth = 0,
  isAdmin,
  onMobileClose,
}) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) =>
          reduceChildRoutes({
            acc,
            item,
            pathname,
            depth,
            isAdmin,
            onMobileClose,
          }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth,
  isAdmin,
  onMobileClose: onMobileClose,
}) {
  const key = item.title + depth;

  if (item.items) {
    const open = pathname === item.href;

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={open}
        title={item.title}
        onMobileClose={onMobileClose}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
          isAdmin: false,
          onMobileClose: onMobileClose,
        })}
      </NavItem>
    );
  } else {
    const isDirect = item.title === "QuantumFlow";
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
        onMobileClose={onMobileClose}
        style={{
          marginTop: isDirect ? "13px" : "",
          display: item.isHide
            ? item.isHide === isAdmin
              ? "block"
              : "none"
            : "block",
          whiteSpace: "wrap",
        }}
      />
    );
  }
  return acc;
}

const NavBar = ({ onMobileClose, openMobile }) => {
  const router = useRouter();
  const auth = useContext(AppContext);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [router.pathname]);
  const [isLogout, setIsLogout] = useState(false);
  const firstName = auth.userData?.firstName || "";
  const lastName = auth.userData?.lastName || "";
  const email = auth.userData?.email || "";
  const initials = `${firstName.charAt(0)}`;
  const obfuscatedEmail = email.split("@")[0];
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
  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box pt={2.5} pb={2} className="sideMenuBox">
          <SideMenuBox>
            <Box
              mb={2}
              onClick={() => router.push("/")}
              style={{ cursor: "pointer", marginLeft: "20px" }}
            >
              <Logo className="logoImg" />
            </Box>

            {/* <Box className="displayAlign" gap="10px" pl={2} mb={3}>
              <Avatar
                sx={{ background: "rgba(129, 227, 150, 1)", color: "#000" }}
              >
                {initials}
              </Avatar>
              <Typography
                variant="h6"
                fontSize="16px"
                color="secondary"
                className="textEllysis"
              >
                {firstName && lastName
                  ? firstName + " " + lastName
                  : obfuscatedEmail}
              </Typography>
            </Box> */}
            {sections.map((section, i) => (
              <List
                style={{ padding: "20px" }}
                key={`menu${i}`}
                subheader={
                  <ListSubheader disableGutters disableSticky>
                    {section.subheader}
                  </ListSubheader>
                }
              >
                {renderNavItems({
                  items: section.items,
                  pathname: router.pathname,
                  isAdmin: auth.isAdmin,
                  onMobileClose: onMobileClose,
                })}
              </List>
            ))}

            <Button
              className="logoutButton1"
              style={{ marginLeft: "10px" }}
              onClick={() => setIsLogout(true)}
              startIcon={<ExitToAppIcon />}
            >
              Logout
            </Button>
          </SideMenuBox>

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
                mb={1}
                color="secondary"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Are you sure want to logout?
              </Typography>
            </Box>
          </Popup>
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <MobileDrawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <Box p={2}>{content}</Box>
        </MobileDrawer>
      </Hidden>
      <Hidden lgDown>
        <DesktopDrawer anchor="left" open variant="persistent">
          {content}
        </DesktopDrawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
