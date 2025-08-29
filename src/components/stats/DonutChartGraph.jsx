import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registering the required components
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChartGraph = ({ profitList }) => {
  const [dataValue, setDataValue] = useState(profitList?.profitPercentage || 0);

  useEffect(() => {
    if (profitList?.profitPercentage) {
      setDataValue(profitList.profitPercentage);
    }
  }, [profitList]);

  const data = {
    datasets: [
      {
        data: [dataValue, 100 - dataValue],
        backgroundColor: ["#81e396", "transparent"],
        hoverBackgroundColor: ["#a4e27e", "transparent"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const chartContainerStyle = {
    position: "relative",
    width: "250px",
    height: "250px",
  };

  const percentageTextStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
  };

  const circleStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #cfcfcf",
    borderRadius: "50%",
    width: "80%",
    height: "80%",
    zIndex: 1,
    padding: "0px",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
  };

  return (
    <Box>
      <div style={chartContainerStyle}>
        <div style={circleStyle}>
          <Doughnut data={data} options={options} />
        </div>
        <div style={percentageTextStyle}>
          <Typography variant="h6">
            {dataValue ? parseFloat(dataValue).toFixed(2) : "0.00"}%
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default DonutChartGraph;
