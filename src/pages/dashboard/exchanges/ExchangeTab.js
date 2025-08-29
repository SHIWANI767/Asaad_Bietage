import { Box, Divider, Grid, Paper, Typography, styled } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { api_configs } from "@/api-services";
import AppContext from "@/context/AppContext";
import { apiRouterCall } from "@/api-services/service";
import dynamic from "next/dynamic";
const ConnectedWithExchange = dynamic(() => import("./ConnectedWithExchange"));
const RecentConnectedExchange = dynamic(() =>
  import("./RecentConnectedExchange")
);

const ExchangeTabBox = styled("div")(({ theme }) => ({
  "& .mainBox": {
    "& .mainTab": {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      borderRadius: "50px",
      flexWrap: "wrap",
    },
    "& .tabmainBox": {
      width: "100%",
      padding: "0px !important",
      borderRadius: "0px",
      border: "none",
      background: "transparent",
      borderBottom: "1px solid #80808024",
      marginBottom: "25px",
    },

    "& .tabActiveButtons": {
      padding: "9px 21px 15px",
      cursor: "pointer",
      whiteSpace: "pre",
      fontWeight: "500",
      borderRadius: "0px",
      borderBottom: "2px solid",
      borderColor: "#bef856",
      background: "transparent",

      "& p": {
        fontWeight: 400,
        fontSize: "14px",
        color: "#000",
        background: "linear-gradient(90.73deg, #86E591 2.09%, #B9F65B 34.92%)",

        WebkitBackgroundClip: "text",
        color: "transparent",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "5px 20px",
        // "& h6": {
        //   fontSize: "12px !important",
        // },
      },
    },
    "& .tabButtons": {
      borderRadius: "0px",
      padding: "9px 21px 15px",
      whiteSpace: "pre",
      cursor: "pointer",
      borderBottom: "2px solid",
      borderColor: "transparent",
      "& p": {
        fontWeight: 500,
        fontSize: "14px",
        color: theme.palette.text.primary,
      },
      [theme.breakpoints.down("sm")]: {
        padding: "5px 20px",
        "& p": {
          fontWeight: 400,
          fontSize: "14px",
          color: theme.palette.text.primary,
        },
        [theme.breakpoints.down("sm")]: {
          padding: "5px 20px",
          "& h6": {
            fontSize: "12px !important",
          },
        },
      },
    },
    "& h3": {
      fontWeight: 700,
    },
  },
}));
const ExchangeTab = () => {
  const auth = useContext(AppContext);
  const [tabs, setTabs] = useState("binding");
  const [exchangeList, setExchangeList] = useState([]);

  const getConnectedExchangeList = async () => {
    try {
      const response = await apiRouterCall({
        method: "GET",
        url: api_configs.connectedExchangePreviousList,
        token: window.localStorage.getItem("user_token"),
      });
      if (response.data.responseCode === 200) {
        let resultData = response.data.result.map((el) => {
          el.exchangeName = el.exchangeUID;
          return el;
        });
        // exchangeName
        setExchangeList(resultData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(" ------- response.data ", exchangeList);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("user_token")) {
        getConnectedExchangeList(window.localStorage.getItem("user_token"));
      }
    }
  }, [tabs]);
  return (
    <ExchangeTabBox>
      <Box className="mainBox">
        {/* <Typography
          variant="h3"
          color="primary"
          style={{ marginBottom: "16px" }}
        >
          Exchange
        </Typography> */}

        <Paper elevation={2} className="tabmainBox displayStart">
          <Box
            className={tabs === "binding" ? "tabActiveButtons" : "tabButtons"}
            onClick={() => setTabs("binding")}
          >
            <Typography variant="body2">Connected</Typography>
          </Box>
          {/* <Box
            className={tabs === "recent" ? "tabActiveButtons" : "tabButtons"}
            onClick={() => setTabs("recent")}
          >
            <Typography variant="h6">Recent</Typography>
          </Box> */}
          {exchangeList.length > 0 && (
            <Box
              className={tabs === "de" ? "tabActiveButtons" : "tabButtons"}
              onClick={() => setTabs("de")}
            >
              <Typography variant="body2">Disconnected</Typography>
            </Box>
          )}
        </Paper>

        <Box className="paperBox">
          {tabs === "binding" && (
            <>
              <Grid container spacing={2} alignItems="flex-start">
                <Grid item lg={6} sm={12} md={6} xs={12}>
                  {" "}
                  <ConnectedWithExchange />
                </Grid>
                <Grid item lg={6} sm={12} md={6} xs={12}>
                  <RecentConnectedExchange
                    isDisconnected={true}
                    list={auth?.connectedExchangeList}
                  />
                </Grid>
              </Grid>
            </>
          )}
          {tabs === "recent" && (
            <Box>
              <RecentConnectedExchange
                isDisconnected={true}
                list={auth?.connectedExchangeList}
              />
            </Box>
          )}
          {tabs === "de" && (
            <Box>
              <RecentConnectedExchange
                isDisconnected={false}
                list={exchangeList}
              />
            </Box>
          )}
        </Box>
      </Box>
    </ExchangeTabBox>
  );
};

export default ExchangeTab;
