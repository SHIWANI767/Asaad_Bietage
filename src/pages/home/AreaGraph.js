import { Box, useTheme } from "@mui/material";
import React from "react";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import moment from "moment";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PriceHistoryBox = styled(Box)(({ theme }) => ({
  "& .tablemainbox": {
    margin: "-18px 0 -20px -20px",
  },
  // "& .custom-area-chart.apexcharts-legend-text": {
  //   fill: theme.palette.mode === "light" ? "rgb(0, 0, 0)" : "#fff", // Custom legend label color
  // },
}));

const AreaGraph = ({ performanceData }) => {
  const theme = useTheme();

  const chartData = {
    series: [
      {
        name: "Profit (usdt)",
        data: performanceData?.map((itm) => ({
          x: itm?.year
            ? `${moment()
                .month(itm.month - 1)
                .format("MMM")} ${itm?.year}`
            : moment(itm?.date).toDate(),
          y: itm?.totalProfit,
        })),
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 300,
        zoom: {
          autoScaleYaxis: true,
        },
        toolbar: {
          show: false,
        },

        className: "custom-area-chart", // Add a custom class
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.51,
          opacityTo: 0,
        },
      },
      grid: {
        show: true,
      },
      // colors: ["#89fc6c"],

      colors:
        theme.palette.mode === "light" ? ["rgb(7, 240, 46)"] : ["#89fc6c"],
      legend: {
        position: "bottom",
        horizontalAlign: "right",
        fontSize: "14px",
        labels: {
          colors: theme.palette.mode === "light" ? "rgb(0, 0, 0)" : "#fff", // Custom label color
          useSeriesColors: false,
          fontSize: "10px",
          fontWeight: "300",
        },
        markers: {
          width: 26,
          height: 4,
          radius: 1,
          offsetX: -6,
          offsetY: -3,
          style: "hollow",
        },
        itemMargin: {
          horizontal: 15,
          vertical: 2,
        },
      },
      markers: {
        size: 0,
        hover: {
          size: 5,
        },
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy", // Format the tooltip date
        },
      },
      yaxis: {
        show: true,

        labels: {
          show: true,
          style: {
            colors:
              theme.palette.mode === "light"
                ? "rgb(0, 0, 0)"
                : "rgba(255, 255, 255, 0.4)",
          },
          formatter: (val) => val.toFixed(2), // Format y-axis values
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          show: true,
        },
        style: {
          colors:
            theme.palette.mode === "light"
              ? "rgb(0, 0, 0)"
              : "rgba(255, 255, 255, 0.4)",
        },
        tooltip: {
          enabled: true,
        },
      },
    },
  };

  return (
    <PriceHistoryBox>
      <Box className="tablemainbox">
        <div id="chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="area"
            height={320}
          />
        </div>
      </Box>
    </PriceHistoryBox>
  );
};

export default React.memo(AreaGraph);
