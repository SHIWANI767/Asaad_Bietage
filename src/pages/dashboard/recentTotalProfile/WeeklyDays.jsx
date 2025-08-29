import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const WeeklyDays = ({ recentData }) => {
  return (
    <Box>
      <Box mt={1} className="displaySpacearound">
        <Box className="displayColumn1">
          <Box className="displayStart" style={{ alignItems: "self-start" }}>
            {/* <Box align="center">
              <Typography variant="h2">
                {recentData?.totalCapital
                  ? parseFloat(recentData?.totalCapital).toFixed(2)
                  : 0}
              </Typography>
              <Typography variant="overline" style={{}}>
                Capital (USDT)
              </Typography>
            </Box> */}

            <Box className="displayStart" align="center">
              <Typography variant="h4">
                {recentData?.totalProfit
                  ? parseFloat(recentData?.totalProfit).toFixed(2)
                  : 0}{" "}
              </Typography>
              <Typography variant="overline" style={{}}>
                USDT
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WeeklyDays;
