import { Box, useTheme } from "@mui/material";
import React, { useContext } from "react";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import SettingsContext from "@/context/SettingsContext";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PriceHistoryBox = styled(Box)(({ theme }) => ({
  "& .tablemainbox": {
    margin: "-18px 0 -20px -20px",
  },
}));

const RecenetGraph = () => {
  const themeSetting = useContext(SettingsContext);
  const theme = useTheme();
  const [chartData, setChartData] = React.useState({
    series: [
      {
        name: "Active Workers",
        data: [5.0, 9.5, 6.0, 4.5, 2.0, 6.0, 7.0, 8.0, 9.0, 6.0, 9.0, 12.0],
      },
      {
        name: "5 min Hashrate",
        data: [5.0, 4.2, 5.0, 4.0, 5.8, 3.0, 7.0, 10.0, 8.0, 10.0, 11.0, 2.0],
      },
    ],
    options: {
      chart: {
        // id: "crypto-line",
        type: "line",
        height: 200,
        zoom: {
          autoScaleYaxis: true,
        },
        toolbar: {
          show: false, // Hide the chart toolbar
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        lineCap: "butt",
        width: 4,
        dashArray: 0,
      },
      grid: {
        show: true,
      },
      colors: ["rgba(192, 255, 78, 1)", "rgba(27, 139, 174, 1)"],
      legend: {
        show: false, // Set this to false to hide the legend

        position: "top",
        horizontalAlign: "center",
        fontSize: "14px",
        offsetX: 0,
        offsetY: -5,
        labels: {
          colors:
            theme.palette.mode === "light"
              ? "rgb(144 130 130)"
              : "rgb(144 130 130)",
          useSeriesColors: false,
        },
        markers: {
          width: 26,
          height: 4,
          strokeWidth: 0,
          strokeColor: "#fff",
          fillColors: undefined,
          radius: 1,
          // customHTML: undefined,
          // onClick: undefined,
          offsetX: -6,
          offsetY: -3,
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
      lines: {
        height: 4,
        hover: {
          size: 5,
        },
      },
      tooltip: {
        intersect: true,
        shared: false,
      },
      yaxis: {
        show: true, // Hide the chart toolbar
        labels: {
          show: true,
          formatter: (value) => `${value}.0B`,
        },
        lines: {
          show: false,
        },
        decimalsInFloat: 2, // Number of decimal places for y-axis values
      },
      xaxis: {
        show: true, // Hide the chart toolbar
        // type: "datetime", // X-axis for date/time data
        labels: {
          show: true,
        },
        lines: {
          show: true,
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
        categories: [
          "12:00 AM",
          "2:00 AM",
          "4:00 AM",
          "6:00 AM",
          "8:00 AM",
          "10:00 AM",
          "12:00 PM",
          "2:00 PM",
          "4:00 PM",
          "6:00 PM",
          "8:00 PM",
          "10:00 PM",
          "12:00 AM",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  return (
    <PriceHistoryBox>
      <Box className="tablemainbox">
        <div id="chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="line"
            height={336}
          />
        </div>
      </Box>
    </PriceHistoryBox>
  );
};

export default RecenetGraph;
