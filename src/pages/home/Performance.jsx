import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

import AreaGraph from "./AreaGraph";
import { fixDecimal, formatNumberInteger } from "@/utils";
import { baseurlSocket } from "@/api-services";

const arrayYears = [
  { heading: "Week", value: "week" },
  { heading: "Month", value: "month" },
  { heading: "Year", value: "year" },
];

function useWebSocket(options, dependencies = [], onMessage) {
  useEffect(() => {
    const webSocket = new WebSocket(baseurlSocket);
    const handleOpen = () => {
      webSocket.send(JSON.stringify(options));
    };

    const handleMessage = (event) => {
      if (event.data !== "[object Promise]" && event.data !== "null") {
        const data = JSON.parse(event.data);
        onMessage(data);
      }
    };

    webSocket.onopen = handleOpen;
    webSocket.onmessage = handleMessage;

    return () => {
      webSocket.close();
    };
  }, dependencies);
}

function Strategy() {
  const [arbiPerformance, setArbiPerformance] = useState();
  const [selectYear, setSelectYear] = useState("week");
  const [profitStatistics, setProfitStatistics] = useState([]);

  const handleArbiPerformance = useCallback((data) => {
    if (data.responseCode === 200) {
      setArbiPerformance(data.responseResult);
    } else {
      setArbiPerformance(null);
    }
  }, []);

  const handleProfitStatistics = useCallback((data) => {
    if (data.responseCode === 200) {
      setProfitStatistics(data.responseResult || []);
    } else {
      setProfitStatistics([]);
    }
  }, []);

  useWebSocket({ options: "totalTradeAndeProfit" }, [], handleArbiPerformance);
  useWebSocket(
    { options: "profitStatistics", type: selectYear },
    [selectYear],
    handleProfitStatistics
  );

  const arrayPerfor = [
    {
      heading: "Number of Trades",
      image: "/images/trade.svg",
      value: arbiPerformance?.totalTrades || 0,
    },
    {
      heading: "Total Profit",
      image: "/images/trades.svg",
      value: `<span style=" color:#fff;font-size:24px" }}>$</span>${formatNumberInteger(
        arbiPerformance?.totalProfit || 0,
        3
      )}`,
    },
  ];

  return (
    <Container className="arbiSection">
      <Box align="center" mb={5}>
        <Typography variant="h2" color="primary" mb={1}>
          Bitedge
          <br />
          <span>Performance</span> Metrics
        </Typography>
      </Box>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={5} md={4}>
          <Box className="arbiText">
            {arrayPerfor.map((item, index) => (
              <Box
                key={index}
                className="performanceBox"
                style={{
                  backgroundImage: `url(/images/profitbanner.svg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Box align="left">
                  <img src={item?.image} alt="" />
                  <Box mt={1}>
                    <Typography
                      variant="h6"
                      color="#fff"
                      dangerouslySetInnerHTML={{ __html: item.heading }}
                    />
                  </Box>
                  <Typography
                    variant="h2"
                    color="#fff"
                    dangerouslySetInnerHTML={{ __html: item.value }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} sm={7} md={8}>
          <Paper component={Box} elevation={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" color="primary">
                Profit Graph
              </Typography>
              <FormControl className="selectBox">
                <Select
                  variant="outlined"
                  value={selectYear}
                  onChange={(e) => setSelectYear(e.target.value)}
                >
                  {arrayYears.map((option, i) => (
                    <MenuItem key={i} value={option.value}>
                      {option.heading}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <AreaGraph performanceData={profitStatistics} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default React.memo(Strategy);
