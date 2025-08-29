import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { styled } from "@mui/system";
import DashboardLayout from "@/layout/DashboardLayout";
import TVChart from "./TVChart";
import { baseurlSocket } from "@/api-services";

const BnbBox = styled("div")(({ theme }) => ({
  "& .borderTop": {
    borderBottom: "1px solid #80808073",
  },
  "& .chartBoximg": {
    height: "400px",
    // background: "#000",
    borderRadius: "10px",
    position: "relative",
    "& img": {
      width: "100%",
      position: "relative",
      zIndex: "9",
    },
  },

  marginTop: "40px",
  "& .filterpaper": {
    padding: "30px",
    height: "400px",
    // background: "#131615",
    position: "relative",
    zIndex: "9",
    "& p": {
      fontSize: "14px",
    },
  },
  "& .flexBox": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export default function Bnb({ coinType, exchangeName, secondaryCoin }) {
  const [isSocLoading, setIsSocLoading] = useState(false);
  const [marketTicker, setmarketTicker] = useState({});
  const [askBid, setaskBid] = useState({});
  const token = window.localStorage.getItem("user_token");

  useEffect(() => {
    setIsSocLoading(true);
    const web = new WebSocket(baseurlSocket);
    const accessToken = token;
    if (coinType && secondaryCoin) {
      if (accessToken) {
        try {
          web.onopen = () => {
            const dataToSend = {
              token: accessToken,
              options: "askbid",
              symbol: coinType + secondaryCoin,
              limit: "5",
              exchange: exchangeName,
            };
            web.send(JSON.stringify(dataToSend));
            web.onmessage = async (event) => {
              if (event.data !== "[object Promise]" && event.data !== "null") {
                let obj = JSON.parse(event.data);
                if (obj.responseCode === 200) {
                  setaskBid(obj?.responseResult);
                  setIsSocLoading(false);
                } else {
                  setaskBid([]);
                  setIsSocLoading(false);
                }
              }
            };
          };
          return () => {
            web.close();
          };
        } catch (err) {
          console.log("- err", err);
          setIsSocLoading(false);
        }
      }
    }
  }, [coinType, secondaryCoin]);

  useEffect(() => {
    setIsSocLoading(true);
    const web = new WebSocket(baseurlSocket);
    const accessToken = token;
    if (coinType && secondaryCoin) {
      if (accessToken) {
        try {
          web.onopen = () => {
            const dataToSend = {
              token: accessToken,
              options: "marketTicker",
              symbol: coinType + secondaryCoin,
              exchange: exchangeName,
            };
            web.send(JSON.stringify(dataToSend));
            web.onmessage = async (event) => {
              if (event.data !== "[object Promise]" && event.data !== "null") {
                let obj = JSON.parse(event.data);
                if (obj.responseCode === 200) {
                  setmarketTicker(obj?.responseResult);
                  setIsSocLoading(false);
                } else {
                  setmarketTicker({});
                  setIsSocLoading(false);
                }
              }
            };
          };
          return () => {
            web.close();
          };
        } catch (err) {
          console.log(" err", err);
          setIsSocLoading(false);
        }
      }
    }
  }, [coinType, secondaryCoin]);

  return (
    <BnbBox>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box className="chartBoximg">
            <TVChart
              coinType={coinType}
              exchangeName={exchangeName}
              secondaryCoin={secondaryCoin}
            />
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Paper elevation={2} className="filterpaper">
            <Box>
              <Typography variant="body1" color="primary">
                Market
                <Typography variant="h5" color="primary" mt={1}>
                  {marketTicker?.base}/{marketTicker?.quote}
                </Typography>
              </Typography>
              <Box mt={2} mb={3} pb={2} className="borderTop">
                <Typography variant="body1" color="primary">
                  Last Price
                </Typography>
                <Typography variant="h5" color="primary" mt={1}>
                  {marketTicker?.price ? marketTicker?.price : 0}
                </Typography>
              </Box>
              <Box mt={2} mb={2} pb={2} className="borderTop">
                <Box className="displaySpacebetween">
                  <Typography variant="body1" color="primary">
                    Highest bid
                  </Typography>
                  <Typography variant="body2" color="primary" mt={1}>
                    {marketTicker?.highestBid ? marketTicker?.highestBid : "0"}
                  </Typography>
                </Box>
                <Box className=" displaySpacebetween">
                  <Typography variant="body1" color="primary">
                    Lowest Ask
                  </Typography>
                  <Typography variant="body2" color="primary" mt={1}>
                    {marketTicker?.lowestAsk ? marketTicker?.lowestAsk : "0"}
                  </Typography>
                </Box>
                <Box className=" displaySpacebetween">
                  <Typography variant="body1" color="primary">
                    Spread
                  </Typography>
                  <Typography variant="body2" color="primary" mt={1}>
                    {marketTicker?.priceChangePercent
                      ? marketTicker?.priceChangePercent
                      : "0"}{" "}
                    %
                  </Typography>
                </Box>
              </Box>

              <Box mt={2} pb={2} className=" ">
                <Box className=" displaySpacebetween">
                  <Typography variant="body1" color="primary">
                    Volume
                  </Typography>
                  <Typography variant="body2" color="primary" mt={1}>
                    {marketTicker?.volume ? marketTicker?.volume : "0"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Paper
            elevation={2}
            className="filterpaper"
            style={{ paddingRight: "20px" }}
          >
            <Box
              style={{
                maxHeight: "400px",
                overflow: "auto",
                paddingRight: "18px",
              }}
            >
              <Box className=" displaySpacebetween overFlowBox" mb={3}>
                <Typography variant="body1" color="primary">
                  Price({secondaryCoin})
                </Typography>

                <Typography variant="body1" color="primary">
                  Amount({coinType})
                </Typography>

                <Typography variant="body1" color="primary">
                  Total({secondaryCoin})
                </Typography>
              </Box>

              {askBid?.asks &&
                askBid?.asks.map((data) => {
                  return (
                    <>
                      <Box
                        className=" displaySpacebetween borderTop"
                        mt={1}
                        pt={1}
                        pb={1}
                      >
                        <Typography
                          variant="body1"
                          color="primary"
                          style={{ color: "#EB5757" }}
                        >
                          {parseFloat(data[0]).toFixed(5)}
                        </Typography>

                        <Typography variant="body1" color="primary">
                          {/* 0.3568/56759 */}
                          {parseFloat(data[1]).toFixed(5)}
                        </Typography>

                        <Typography variant="body1" color="primary">
                          {parseFloat(data[0] * data[1]).toFixed(5)}
                        </Typography>
                      </Box>
                    </>
                  );
                })}

              <Box mt={3}>
                {askBid?.bids &&
                  askBid?.bids.map((data) => {
                    return (
                      <Box
                        className=" displaySpacebetween borderTop"
                        mt={1}
                        pt={1}
                        pb={1}
                      >
                        <Typography
                          variant="body1"
                          color="primary"
                          style={{ color: "#27AE60" }}
                        >
                          {parseFloat(data[0]).toFixed(5)}
                        </Typography>

                        <Typography variant="body1" color="primary">
                          {/* 0.3568/56759 */}
                          {parseFloat(data[1]).toFixed(5)}
                        </Typography>

                        <Typography variant="body1" color="primary">
                          {parseFloat(data[0] * data[1]).toFixed(5)}
                        </Typography>
                      </Box>
                    );
                  })}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </BnbBox>
  );
}

Bnb.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
