import { Box, Paper, Typography, styled } from "@mui/material";

import React, { useEffect, useState } from "react";
import CryptoDetails from "./CryptoDetails";
import axios from "axios";
import { api_configs } from "@/api-services";

const PerformingCryptoAssestsBox = styled("div")(({ theme }) => ({
  "& .mainBox": {
    "& .mainTab": {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      borderRadius: "50px",
      flexWrap: "wrap",
    },
    "& .tabActiveButtons": {
      border: "1px solid",
      borderColor: theme.palette.text.green,
      background: theme.palette.background.tabBackground,
      borderRadius: "5px",
      margin: "5px",
      padding: "5px 25px",
      transition: "all 500ms ease-in-out",
      cursor: "pointer",
      whiteSpace: "pre",
      "& p": {
        // fontWeight: 200,
      },
    },
    "& .tabButtons": {
      borderRadius: "5px",
      border: "1px solid transparent",
      background: theme.palette.background.tabBackground,
      margin: "5px",
      padding: "5px 25px",
      whiteSpace: "pre",
      cursor: "pointer",
      "& p": {
        // fontWeight: 200,
      },
    },
    "& h5": {
      fontWeight: 500,
      fontSize: "18px",
    },
    "& span": {
      marginLeft: "5px",
    },
    "& .paperContainer": {
      height: "100%",
      [theme.breakpoints.down("md")]: {
        height: "auto",
      },
    },
  },
}));

const PerformingCryptoAssests = () => {
  const [tabs, setTabs] = useState("1");
  const [recentData, setRecentData] = useState({});

  const token = window.localStorage.getItem("user_token");

  const HandleRecentTotalData = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: api_configs.cryptoAssetprofit,
        headers: {
          token: token,
        },
        params: {
          hour: tabs,
        },
      });
      if (response) {
        setRecentData(response.data.result);
      }
    } catch (error) {
      console.log(" error ", error);
    }
  };

  useEffect(() => {
    if (tabs) {
      HandleRecentTotalData();
    }
  }, [tabs]);
  return (
    <PerformingCryptoAssestsBox>
      <Box className="mainBox">
        <Paper elevation={2} className="paperContainer">
          <Box className="displayStart">
            <Typography variant="h5">Top Performing Crypto Assets</Typography>
            <Typography variant="overline">(QuantumLoop)</Typography>
          </Box>
          <Box className="mainTab">
            <Box
              className={tabs === "1" ? "tabActiveButtons" : "tabButtons"}
              onClick={() => setTabs("1")}
            >
              <Typography variant="body2" color="primary">
                1 Hour
              </Typography>
            </Box>
            <Box
              className={tabs === "24" ? "tabActiveButtons" : "tabButtons"}
              onClick={() => setTabs("24")}
            >
              <Typography variant="body2" color="primary">
                24 Hour
              </Typography>
            </Box>
            <Box
              className={tabs === "168" ? "tabActiveButtons" : "tabButtons"}
              onClick={() => setTabs("168")}
            >
              <Typography variant="body2" color="primary">
                7 Days
              </Typography>
            </Box>
          </Box>

          <Box align="center">
            <CryptoDetails recentData={recentData} />
          </Box>
        </Paper>
      </Box>
    </PerformingCryptoAssestsBox>
  );
};

export default PerformingCryptoAssests;
