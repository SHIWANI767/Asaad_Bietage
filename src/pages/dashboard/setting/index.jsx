import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";
import DashboardLayout from "@/layout/DashboardLayout";
import { useRouter } from "next/router";
import AppContext from "@/context/AppContext";

import dynamic from "next/dynamic";
import { MenuProps } from "@/utils";
const CustomHead = dynamic(() => import("@/components/CustomHead"));
const SettingProfile = dynamic(() => import("./SettingProfile/SettingProfile"));
const Trading = dynamic(() => import("./Trading"));
const AutoTradeTab = dynamic(() => import("./AutoTradeTab"));
const FuelWallet = dynamic(() => import("./FuelWallet"));

const SettingMainBox = styled(Box)(({ theme }) => ({
  "& input": {
    // color: theme.palette.text.secondary,
    [theme.breakpoints.down("md")]: {
      fontSize: "12px !important",
      height: "12px",
      padding: "11px 10px !important",
    },
  },
  position: "relative",
  zIndex: "999",
  "& .MuiSvgIcon-root.MuiSelect-icon ": {
    color: theme.palette.text.primary,
  },

  "& .tabmainBox": {
    width: "100%",
    padding: "0px !important",
    borderRadius: "0px",
    border: "none",
    background: "transparent",
    borderBottom: "1px solid #80808024",
  },
  "& .tabBox": {
    display: "flex",
    justifyContent: "flex-start",
    flex: 1,
  },
  "& .tabButton": {
    padding: "9px 21px 15px",
    fontSize: "14px",
    fontWeight: "400",
    color: theme.palette.text.primary,
    borderRadius: "0px !important",
    borderBottom: "2px solid",
    borderColor: "transparent",
    background: "transparent",
    [theme.breakpoints.down("sm")]: {
      padding: "7px 18px",
      fontSize: "10px !important",
      whiteSpace: "pre",
    },

    "&.active": {
      borderBottom: "2px solid",
      background: theme.palette.text.green,
      borderColor: theme.palette.text.green,
      WebkitBackgroundClip: "text",
      color: "transparent",
    },
  },
}));

export default function TradingSetting() {
  const auth = useContext(AppContext);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tabView, setTabView] = useState(
    router.query.type ? router.query.type : "profile"
  );
  const { getProfileDataHandler, userData } = useContext(AppContext);
  useEffect(() => {
    getProfileDataHandler();
  }, []);

  useEffect(() => {
    if (auth?.topHeading) {
      auth?.setTopHeading("Settings");
    }
  }, []);
  return (
    <SettingMainBox>
      <CustomHead
        title="Account Setting | Bitedge"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Box className="displaySpacebetween">
        {userData?.referredBy?.email && (
          <Typography
            variant="body1"
            color="primary"
            mb={2}
            style={{ fontSize: "16px", fontWeight: 400 }}
          >
            Referred By : {userData?.referredBy?.email}
          </Typography>
        )}
      </Box>
      {isMobile ? (
        <Box className="mainTab displayStart">
          <FormControl variant="outlined" fullWidth color="primary">
            <Select
              labelId="transaction-tab-select"
              id="transaction-tab-select"
              value={tabView}
              onChange={(e) => {
                // handleTab(e.target.value);
                router.push("/dashboard/setting?type=" + e.target.value);
              }}
              displayEmpty
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Select Transaction Tab" }}
              color="primary"
              sx={{ height: "44px" }}
            >
              <MenuItem value="profile">Profile</MenuItem>
              <MenuItem value="myPlans">Promotional Plans</MenuItem>
              <MenuItem value="trading"> Auto Trading</MenuItem>
              <MenuItem value="fuelWallet">Fuel Deduction</MenuItem>
            </Select>
          </FormControl>
        </Box>
      ) : (
        <Box className="tabmainBox">
          <Box className="tabBox">
            <Button
              className={`tabButton ${tabView === "profile" ? "active" : ""}`}
              onClick={() => {
                // setTabView("profile");
                router.push("/dashboard/setting?type=profile");
              }}
            >
              Profile
            </Button>
            <Button
              className={`tabButton ${tabView === "myPlans" ? "active" : ""}`}
              onClick={() => {
                // setTabView("myPlans");
                router.push("/dashboard/setting?type=myPlans");
              }}
            >
              Promotional Plans
            </Button>
            <Button
              className={`tabButton ${tabView === "trading" ? "active" : ""}`}
              onClick={() => {
                // setTabView("trading");
                router.push("/dashboard/setting?type=trading");
              }}
            >
              Auto Trading
            </Button>{" "}
            <Button
              className={`tabButton ${
                tabView === "fuelWallet" ? "active" : ""
              }`}
              onClick={() => {
                // setTabView("fuelWallet");
                router.push("/dashboard/setting?type=fuelWallet");
              }}
            >
              Fuel wallet
            </Button>
          </Box>
        </Box>
      )}

      {tabView === "profile" && <SettingProfile isMobile={isMobile} />}
      {tabView === "myPlans" && <Trading />}
      {tabView === "trading" && <AutoTradeTab />}
      {tabView === "fuelWallet" && <FuelWallet />}
    </SettingMainBox>
  );
}
TradingSetting.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
