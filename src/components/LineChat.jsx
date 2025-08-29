import React from "react";
import dynamic from "next/dynamic";
import moment from "moment";
import { Box, useTheme } from "@mui/material";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const LineChart = ({ graphData }) => {
  const theme = useTheme();
  const dataSeries1 =
    graphData && graphData?.map((item, i) => item.totalProfit);
  const dataSeries2 =
    graphData && graphData?.map((item, i) => item.totalCapital);

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      margin: {
        bottom: 0, // Reduce bottom margin
      },
    },
    yaxis: [
      {
        title: {
          text: "Total Profit",
          style: {
            color:
              theme.palette.mode === "light"
                ? "rgb(0, 0, 0)"
                : "rgba(255, 255, 255, 0.77)",
          },
        },
        labels: {
          style: {
            colors:
              theme.palette.mode === "light"
                ? "rgb(0, 0, 0)"
                : "rgba(255, 255, 255, 0.77)",
          },
          formatter: function (value) {
            return value && value?.toFixed(5).replace(/\.?0+$/, "");
          },
        },
      },
      {
        opposite: true,
        title: {
          text: "Total Capital",
          style: {
            color:
              theme.palette.mode === "light"
                ? "rgb(0, 0, 0)"
                : "rgba(255, 255, 255, 0.77)",
          },
        },
        labels: {
          style: {
            colors:
              theme.palette.mode === "light"
                ? "rgb(0, 0, 0)"
                : "rgba(255, 255, 255, 0.77)",
          },
          formatter: function (value) {
            return value && value?.toFixed(5).replace(/\.?0+$/, "");
          },
        },
      },
    ],
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      width: 4,
      dashArray: 0,
    },

    grid: {
      show: false,
      padding: {
        top: 10,
      },
    },
    // colors: ["#89fc6c", "rgba(27, 139, 174, 1)", "#7D56E7"],

    colors:
      theme.palette.mode === "light"
        ? ["rgb(7, 240, 46)", "rgba(27, 139, 174, 1)", "#7D56E7"]
        : ["rgba(192, 255, 78, 1)", "rgba(27, 139, 174, 1)", "#7D56E7"],
    xaxis: {
      show: true,
      labels: {
        show: true,
        style: {
          colors:
            theme.palette.mode === "light"
              ? "rgb(0, 0, 0)"
              : "rgba(255, 255, 255, 0.77)",

          fontSize: "10px",
          fontWeight: "300",
        },
      },
      lines: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      categories:
        graphData &&
        graphData?.map((item, i) => moment(item.date).format("MMM Do YY")),
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "top",
      horizontalAlign: "right",
      floating: false,
      fontSize: "12px",
      fontFamily: "Helvetica, Arial",
      color:
        theme.palette.mode === "light"
          ? "rgb(0, 0, 0)"
          : "rgba(255, 255, 255, 0.77)",
      fontWeight: 400,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 10,
      labels: {
        colors:
          theme.palette.mode === "light"
            ? "rgb(0, 0, 0)"
            : "rgba(255, 255, 255, 0.77)",
        useSeriesColors: false,
        fontWeight: 300,
      },
      markers: {
        width: 22,
        height: 4,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: "rgba(255, 255, 255, 0.77)", // Update marker color
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: -6,
        offsetY: -3,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 2,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
  };

  const series = [
    {
      name: "Total Profit",
      data: dataSeries1,
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "12px",
          fontWeight: "bold",
          colors: ["rgba(192, 255, 78, 1)"],
        },
        formatter: function (val, opts) {
          return val.toFixed(2).replace(/\.?0+$/, ""); // Format y-axis value
        },
      },
    },
    {
      name: "Total Capital",
      data: dataSeries2,
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "12px",
          fontWeight: "bold",
          colors: ["rgba(27, 139, 174, 1)"],
        },
        formatter: function (val, opts) {
          return (val / 1000).toFixed(2).replace(/\.?0+$/, ""); // Format y-axis value (divide by 1000 for Followers Statistics)
        },
      },
    },
  ];

  return (
    <div className="toprecent-graph">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={363}
      />
    </div>
  );
};

export default React.memo(LineChart);
