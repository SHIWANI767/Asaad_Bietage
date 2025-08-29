import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Select,
  FormControl,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import DashboardLayout from "@/layout/DashboardLayout";
import Bnb from "./Bnb";
import axios from "axios";
import CustomHead from "@/components/CustomHead";
import { api_configs } from "@/api-services";
import { ExchangeLogo, ReplaceDash } from "@/utils";
import Image from "next/image";
import AppContext from "@/context/AppContext";
const SettingMainBox = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: "999",
  "& .MuiSvgIcon-root.MuiSelect-icon ": {
    color: theme.palette.text.primary,
  },
  "& .formControl": {
    [theme.breakpoints.down("sm")]: {
      minWidth: "145px",
    },
    "& .MuiSelect-root": {
      padding: "0px",
    },
    "&.MuiMenu-list": {
      height: "300px",
      maxHeight: "300px",
      overflow: "auto",
    },
  },

  "& .filterpaperBox": {
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
    flexWrap: "wrap",
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
      margin: "0 2px",
      padding: "5px 13px",
      fontSize: "10px !important",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
      width: "100px",
    },

    "&.active": {
      borderBottom: "2px solid",
      background: theme.palette.text.green,
      borderColor: theme.palette.text.green,
      WebkitBackgroundClip: "text",
      color: "transparent",
    },
  },
  "& .MuiMenu-list": {
    maxHeight: "300px",
    overflow: "auto",
  },
  "& .SwlectExchangeBox": {
    "& .MuiList-root-MuiMenu-list": {
      maxHeight: "300px",
      overflow: "auto",
    },
  },
}));

export default function Charts() {
  const auth = useContext(AppContext);
  const [exchangeList, setExchangeList] = useState([]);
  const [exchangeTabView, setexchangeTabView] = useState("Binance");
  const [tabView, settabView] = useState("BNB-USDT");
  const [coinPair, setCoinPair] = useState([]);
  const theme = useTheme();
  const isBreak = useMediaQuery(theme.breakpoints.down("md"));
  const token = window.localStorage.getItem("user_token");
  const getCurrentExchangeListHandler = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: api_configs.listExchange,
        headers: {
          token: token,
        },
      });
      if (response.data.responseCode == 200) {
        let exchangeListData = [];
        for (var i = 0; i < response.data.result.length; i++) {
          exchangeListData.push(response.data.result[i]?.exchangeName);
        }

        setExchangeList(
          exchangeListData?.filter(
            (item) => item !== "Coinbasepro" && item !== "Gemini"
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("exchangeTabView", exchangeList);

  const HandleExchangeCooin = async (exchange) => {
    try {
      setexchangeTabView(exchange);

      const response = await axios({
        method: "GET",
        url: api_configs.pairList,
        headers: {
          token: token,
        },
        params: { exchange: exchange },
      });
      if (response.status === 200) {
        setCoinPair(response.data.result);
        settabView(response.data.result[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    HandleExchangeCooin("Binance");
    getCurrentExchangeListHandler();
  }, []);
  const MenuProps = {
    PaperProps: {
      style: {
        background: "rgb(16 21 17)",
        maxHeight: 350,
        overflowY: "auto",
      },
    },
  };
  const handleTab = (value) => {
    settabView(value);
  };

  useEffect(() => {
    if (auth?.topHeading) {
      auth?.setTopHeading("Charts");
    }
  }, []);
  return (
    <SettingMainBox>
      <CustomHead
        title="Chart | Bitedge"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />

      <Box className="displaySpacebetween charTabBox" mb={3}>
        {isBreak ? (
          <Box className="mainTab displayStart">
            <FormControl variant="outlined" fullWidth color="primary">
              <Select
                labelId="transaction-tab-select"
                id="transaction-tab-select"
                value={exchangeTabView}
                onChange={(e) => {
                  HandleExchangeCooin(e.target.value);
                }}
                displayEmpty
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Select Transaction Tab" }}
                color="primary"
                sx={{ height: "44px" }}
              >
                {exchangeList &&
                  exchangeList.map((title) => (
                    <MenuItem value={title} key={title}>
                      <Box style={{ display: "flex" }} width={"100%"}>
                        <Image
                          width={25}
                          height={25}
                          alt=""
                          src={
                            ExchangeLogo.find(
                              (d) =>
                                d.title.toLowerCase() === title.toLowerCase()
                            )?.img
                          }
                          style={{ borderRadius: "50%" }}
                        />
                        &nbsp; &nbsp;
                        {title}
                      </Box>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Paper elevation={2} className="filterpaperBox">
            <Box className="displayStart">
              <Box className="tabBox">
                {exchangeList &&
                  exchangeList.map((title) => (
                    <Button
                      className={`tabButton ${
                        exchangeTabView === title ? "active" : ""
                      }`}
                      onClick={() => HandleExchangeCooin(title)}
                      startIcon={
                        <img
                          src={
                            ExchangeLogo.find(
                              (d) =>
                                d.title.toLowerCase() === title.toLowerCase()
                            )?.img
                          }
                          alt=""
                          style={{ height: "25px", width: "25px" }}
                        />
                      }
                    >
                      {title}
                    </Button>
                  ))}
              </Box>
            </Box>
          </Paper>
        )}
        <Box className="SwlectExchangeBox">
          <FormControl variant="outlined" className="formControl ">
            <Select
              name="tabView"
              value={tabView}
              onChange={(e) => {
                settabView(e.target.value);
              }}
              MenuProps={MenuProps}
            >
              <MenuItem value="">
                <Typography variant="body1" color="primary" disabled>
                  Choose your Exchange
                </Typography>
              </MenuItem>

              {coinPair &&
                coinPair?.map((map, i) => {
                  return (
                    <MenuItem value={map}>
                      <Box
                        className="avtClx"
                        value={map}
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ padding: "0 0 0 10px" }}>
                          {ReplaceDash(map, "/")}
                        </span>
                      </Box>
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Bnb
        coinType={tabView && tabView.split("-")[0]}
        exchangeName={exchangeTabView}
        secondaryCoin={tabView && tabView.split("-")[1]}
      />
    </SettingMainBox>
  );
}
Charts.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
