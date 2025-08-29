import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
  Grid,
  Switch,
  Button,
} from "@mui/material";
import Table from "./Table";
import { styled } from "@mui/system";
import DashboardLayout from "@/layout/DashboardLayout";
import { MdKeyboardArrowDown } from "react-icons/md";
import { baseurlSocket } from "@/api-services";

const MarketBox = styled("div")(({ theme }) => ({
  marginTop: "40px",
  "& .scrollBox": {
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },
  },
  "& .filterpaper": {
    padding: "22px 30px 40px",
    minHeight: "200px",
    "& p": {
      fontSize: "16px",
    },
  },
  "& .flexBox": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "& .ethButton": {
    color: "rgb(255, 255, 255)",
    borderRadius: "8.776px",
    fontSize: "12px",
    padding: "15px 24px",
    border: "none !important",
    background: "rgba(255, 255, 255, 0.05)",
    marginLeft: "10px",
    [theme.breakpoints.down("sm")]: {
      margin: "6px",
    },
  },
}));
const buttondata = [
  {
    name: "AUD",
  },
  {
    name: "ETH",
  },
  {
    name: "BTC",
  },
  {
    name: "BRL",
  },
  {
    name: "TRX",
  },
  {
    name: "USDT",
  },
];
const DisplayStart = styled("div")({
  display: "flex",
  alignItems: "center",
});
export default function Market(data) {
  const [isSocLoading, setIsSocLoading] = useState(false);

  const [askBid, setaskBid] = useState({});
  const token = window.localStorage.getItem("user_token");
  useEffect(() => {
    setIsSocLoading(true);
    const web = new WebSocket(baseurlSocket);
    const accessToken = token;
    // if (accessToken) {
    //   try {
    //     web.onopen = () => {
    //       const dataToSend = {
    //         options: "chart",
    //         symbol: "btcusdt",
    //         interval: "1w",
    //         exchange: "Binance",
    //       };
    //       web.send(JSON.stringify(dataToSend));
    //       web.onmessage = async (event) => {
    //         if (event.data !== "[object Promise]" && event.data !== "null") {
    //           let obj = JSON.parse(event.data);
    //           if (obj.responseCode === 200) {
    //             setaskBid(obj?.responseResult);
    //             setIsSocLoading(false);
    //           } else {
    //             setaskBid([]);
    //             setIsSocLoading(false);
    //           }
    //         }
    //       };
    //     };

    //     return () => {
    //       web.close();
    //     };
    //   } catch (err) {
    //     console.log("- err", err);
    //     setIsSocLoading(false);
    //   }
    // }
  }, [token]);

  return (
    <MarketBox>
      <Grid container spacing={2}>
        <Box className="displayStart scrollBox" ml={3}>
          {/* {buttondata.map((data, i) => {
            return (
              <Box className="displayStart">
                <Button
                  variant="contained"
                  color="secondary"
                  className="ethButton"
                  style={{ color: "#fff" }}
                >
                  {data.name}
                </Button>
              </Box>
            );
          })} */}
        </Box>

        <Grid item xs={12}>
          <Paper elevation={2} className="filterpaper">
            <Box>
              <Table askBid={askBid} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </MarketBox>
  );
}

Market.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
