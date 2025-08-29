import { Box, Typography, styled } from "@mui/material";
import React from "react";

// Correctly import and use `styled` from MUI
const CombinedProfitBox = styled(Box)(({ theme }) => ({
  "& .combinedProfitsCardBox": {
    background: theme.palette.background.taskBg,
    borderRadius: "5px",
    border: "1px solid #80808017",
    // minHeight: "206px",
    "& .headingBox": {
      background: "linear-gradient(90.73deg, #86E591 2.09%, #B9F65B 34.92%)",
      borderRadius: "5px 5px 0px 0px",
      padding: "10px",
      marginBottom: "8px",
      "& p": {
        color: "rgba(0, 0, 0, 1)",
        fontWeight: "500",
      },
    },
    "& .contentBox": {
      "& h5": {
        marginTop: "9px",
      },
      "& h6": {
        color: theme.palette.text.green,
      },
    },
  },
}));

export default function CombinedProfitCard({ day, capital, percentage }) {
  return (
    <CombinedProfitBox>
      <Box className="combinedProfitsCardBox">
        <Box className="headingBox displayCenter">
          <Typography variant="body2" color="primary">
            {day} Days
          </Typography>
        </Box>
        <Box className="contentBox displayColumn">
          <Typography variant="h5" color="primary">
            {capital}
          </Typography>
          <Typography variant="overline" color="primary">
            USDT
          </Typography>
          <Typography variant="h6" color="primary" mb={2.6}>
            {percentage}
          </Typography>
        </Box>
      </Box>
    </CombinedProfitBox>
  );
}
