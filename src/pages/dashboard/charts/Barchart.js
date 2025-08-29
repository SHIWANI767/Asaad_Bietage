import { Box } from "@mui/material";
import React from "react";
// import ReactApexChart from "react-apexcharts";

export default function Barchart({ newArrayDataUser, tab }) {
  const categorie = {
    day: [],
    month: newArrayDataUser?.newarray3,
    week: newArrayDataUser?.newarray3,
    year: newArrayDataUser?.newarray4,
  };

  const state = {
    xaxis: {
      colors: "#fff",
      categories: categorie[tab],
    },
    series: [
      {
        colors: "#194129",
        name: "Buy",
        data: newArrayDataUser?.newarray,
        // data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        colors: "#194129",
        name: "Sell",
        data: newArrayDataUser?.newarray2,

        // data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    options: {
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "left",
        labels: {
          colors: "#194129",
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "red",
              stepSize: 1,
              beginAtZero: true,
            },
          },
        ],
      },
      title: {
        // text: "Daily Earnings",
        align: "left",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          color: "#194129",
        },
      },
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },

      yaxis: {
        title: {
          text: "$ (thousands)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
    colors: ["#b695ff", "#f4aaa4"],
  };
  return (
    <Box className="barchart">
      {/* <ReactApexChart
        options={state}
        series={state.series}
        type="bar"
        height={250}
      /> */}
    </Box>
  );
}
