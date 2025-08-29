import {
  Box,
  Divider,
  Typography,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { borderBottom, borderRadius, padding, styled } from "@mui/system";
import DashboardLayout from "@/layout/DashboardLayout";
import ReBlcAutoTrade from "./RebalanceAutoTradePage/ReBlcAutoTrade";
import AutoTradeSettingPage from "./AutoTradeSettingPage";
import { MenuProps } from "@/utils";

const AutoTradeTabBox = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: "999",
  "& .filterpaperBox": {
    padding: "10px",
    marginTop: "5px",
    marginBottom: "40px",

    boxShadow: "none",
  },
  "& .tabBox": {
    display: "flex",
    justifyContent: "flex-start",
    flex: 1,
    flexWrap: "wrap",
    gap: "20px",
    borderBottom: "1px solid #80808024",
  },
  "& .tabButton1": {
    fontSize: "12px",
    fontWeight: "400",
    color: theme.palette.text.primary,
    margin: "0 5px",
    padding: "10px 0",
    borderRadius: "0px !important",
    borderBottom: "2px solid transparent",
    [theme.breakpoints.down("sm")]: {
      padding: "5px 16px",
      fontSize: "10px !important",
    },

    "&.active": {
      color: theme.palette.text.green,
      background: "transparent !important",
      borderBottom: "2px solid",
      borderRadius: "0px !important",
      borderColor: theme.palette.text.green,
    },
  },
}));
export default function AutoTradeTab() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tabs, setTabs] = useState("autoTradeSetting");
  const handleTab = (e) => {
    setTabs(e);
  };
  return (
    <Box style={{ marginTop: "25px" }}>
      <AutoTradeTabBox>
        {isMobile ? (
          <Box className="mainTab displayStart">
            <FormControl variant="outlined" fullWidth color="primary">
              <Select
                labelId="transaction-tab-select"
                id="transaction-tab-select"
                value={tabs}
                onChange={(e) => {
                  handleTab(e.target.value);
                }}
                displayEmpty
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Select Transaction Tab" }}
                color="primary"
                sx={{ height: "44px" }}
              >
                <MenuItem value="autoTradeSetting">
                  Auto Trade Settings
                </MenuItem>
                <MenuItem value="sniperAutoTrade">Sniper Auto Trade</MenuItem>
                <MenuItem value="rebalancingAutoTrade">
                  Smart Limit Orders
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Box className="filterpaperBox">
            <Box className="tabBox">
              <Button
                className={`tabButton1 ${
                  tabs === "autoTradeSetting" ? "active" : ""
                }`}
                onClick={() => setTabs("autoTradeSetting")}
              >
                Auto Trade Settings
              </Button>
              <Button
                className={`tabButton1 ${
                  tabs === "sniperAutoTrade" ? "active" : ""
                }`}
                onClick={() => setTabs("sniperAutoTrade")}
              >
                Sniper Auto Trade
              </Button>
              <Button
                className={`tabButton1 ${
                  tabs === "rebalancingAutoTrade" ? "active" : ""
                }`}
                onClick={() => setTabs("rebalancingAutoTrade")}
              >
                Smart Limit Orders
              </Button>
            </Box>
          </Box>
        )}
      </AutoTradeTabBox>

      <Box my={3}>
        <Typography
          variant="h4"
          color="primary"
          style={{ marginBottom: "10px", fontSize: "20px" }}
        >
          {tabs === "sniperAutoTrade"
            ? "Setting for Sniper Trade"
            : tabs === "autoTradeSetting"
            ? "Setting for Auto Trade"
            : tabs === "rebalancingAutoTrade"
            ? "Smart Limit Orders"
            : ""}
        </Typography>

        <Divider style={{ background: "#575765" }} />
      </Box>
      <Box>
        {tabs === "autoTradeSetting" && <AutoTradeSettingPage botType={tabs} />}

        {tabs === "sniperAutoTrade" && <AutoTradeSettingPage botType={tabs} />}
        {tabs === "rebalancingAutoTrade" && <ReBlcAutoTrade />}
      </Box>
    </Box>
  );
}
AutoTradeTab.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
