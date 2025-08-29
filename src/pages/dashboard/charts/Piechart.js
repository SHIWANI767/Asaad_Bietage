import { Box } from "@mui/material";
import React from "react";
// import ReactApexChart from "react-apexcharts";

const state = {
  series: [44, 13, 22],
  options: {
    chart: {
      width: 380,
      type: "pie",
    },

    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  },
  colors: ["#b695ff", "#f4aaa4", "#57ffbc"],
};

export default function Piechart() {
  return (
    <Box>
      {/* <ReactApexChart



        options={state}
        series={state.series}
        type="pie"
        width={300}
      /> */}
    </Box>
  );
}
