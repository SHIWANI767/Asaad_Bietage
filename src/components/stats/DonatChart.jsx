import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import styled from "@emotion/styled";
import { IoMdAdd } from "react-icons/io";
import DonutChartGraph from "./DonutChartGraph";

const MainComponent = styled("div")(({ theme }) => ({
  "& .mainCardBox": {
    "& .displayCenter": {
      "@media(min-width:1440px)": {
        marginTop: "90px",
      },
    },
  },
  "& .circleAdd": {
    backgroundColor: "#38d059",
    width: "20px",
    height: "20px",
    borderRadius: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& svg": {
      color: "#fff",
      fontSize: "20px",
    },
  },
  "& .triggerscrollBox": {
    height: "155px",
    overflow: "auto",
  },
}));

const DonutChart = ({ tabView, profitList }) => {
  const donutData = {
    labels: ["Profile Stats"],
    datasets: [
      {
        data: [50], // Ensure data is in an array
        backgroundColor: ["#988AFF", "#E4E0FF"],
        borderWidth: 2,
      },
    ],
  };

  const triggerItems = [
    { text: "Panicmode" },
    { text: "Panicmode" },
    { text: "Panicmode" },
    { text: "Panicmode" },
    { text: "Panicmode" },
    { text: "Panicmode" },
  ];
  return (
    <MainComponent>
      <Box>
        <Box>
          <Box mt={2}>
            <Typography variant="h5" color="primary">
              Profit Stats
            </Typography>
          </Box>
          <Box mt={1}>
            <Divider />
          </Box>
        </Box>
        <Box className="mainCardBox">
          <Box mt={5} className="displayCenter">
            <DonutChartGraph profitList={profitList} />
          </Box>
        </Box>
        {tabView === "global" && (
          <>
            <Typography color="primary" variant="h6">
              Trigger
            </Typography>
            <Box mt={2} className="triggerscrollBox">
              {triggerItems.map((item, index) => (
                <div key={index}>
                  <Box display="flex" alignItems="center">
                    <Box className="circleAdd">
                      <IoMdAdd color="primary" />
                    </Box>
                    <Typography variant="body1" style={{ marginLeft: "10px" }}>
                      {item.text}
                    </Typography>
                  </Box>
                  <Box mt={2} mb={2}>
                    <Divider />
                  </Box>
                </div>
              ))}
            </Box>
          </>
        )}
      </Box>
    </MainComponent>
  );
};

export default DonutChart;
