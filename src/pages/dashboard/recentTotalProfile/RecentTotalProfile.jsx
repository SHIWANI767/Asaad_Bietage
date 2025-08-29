import React, { useEffect, useState, useMemo } from "react";
import { Box, Paper, Typography, styled } from "@mui/material";
import WeeklyDays from "./WeeklyDays";
import axios from "axios";
import { api_configs } from "@/api-services";

const StyledRecentTotalBox = styled(Box)(({ theme }) => ({
  "& .mainBox": {
    "& .mainTab": {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      borderRadius: "50px",
      flexWrap: "wrap",
      gap: theme.spacing(1),
    },

    "& .paperContainer": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: theme.palette.background.newprofitbg,
    },
    "& .tabButton": {
      border: "1px solid transparent",
      borderRadius: "5px",
      padding: theme.spacing(0.1, 1),
      cursor: "pointer",
      fontSize: "10px",
      whiteSpace: "pre",
      transition: "all 500ms ease-in-out",
      background: theme.palette.background.tabBackground,
    },
    "& .tabActive": {
      borderColor: theme.palette.text.green,
    },
    "& .titleProfit": {
      borderColor: theme.palette.text.green,
    },

    "& h5": {
      fontWeight: 500,
      fontSize: "15px",
    },
  },
}));

const TABS = [
  { value: "24", label: "24 Hr" },
  { value: "168", label: "7 D" },
  { value: "720", label: "30 D" },
];

const RecentTotalProfile = () => {
  const [activeTab, setActiveTab] = useState("24");
  const [recentData, setRecentData] = useState({});
  const token = useMemo(() => window.localStorage.getItem("user_token"), []);

  const fetchRecentTotalData = async (hour) => {
    try {
      const { data } = await axios.get(api_configs.DashboardRecentData, {
        headers: { token },
        params: { hour },
      });
      setRecentData(data.result || {});
    } catch (error) {
      console.error("Error fetching recent data:", error);
    }
  };

  useEffect(() => {
    fetchRecentTotalData(activeTab);
  }, [activeTab]);

  return (
    <StyledRecentTotalBox>
      <Box className="mainBox">
        <Paper elevation={2} className="paperContainer">
          <Box className="mainTab">
            {TABS.map(({ value, label }) => (
              <Box
                key={value}
                className={`tabButton ${
                  activeTab === value ? "tabActive" : ""
                }`}
                onClick={() => setActiveTab(value)}
              >
                <Typography
                  variant="body2"
                  color="primary"
                  style={{ fontSize: "11px" }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box>
            <WeeklyDays recentData={recentData} />
          </Box>
        </Paper>
      </Box>
    </StyledRecentTotalBox>
  );
};

export default RecentTotalProfile;
