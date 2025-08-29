import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles"; // Import theme hook

// Import ApexCharts dynamically to prevent SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Doutgraph = ({ performingData }) => {
  const theme = useTheme(); // Access Material-UI theme
  const totalAmount = performingData.reduce(
    (sum, { totalTrade }) => sum + totalTrade,
    0
  );

  const chartOptions = {
    chart: {
      type: "donut",
      background: "transparent", // Optional: Transparent background
    },
    colors: [
      "rgba(185, 246, 91, 1)", // BTC
      "rgba(37, 176, 220, 1)", // ETH
      "rgba(255, 187, 56, 1)", // XRP
      "rgba(76, 120, 255, 1)", // USDT
    ],
    labels: performingData?.map((item) => item?.exchangeName), // Legend labels
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      labels: {
        colors: [theme.palette.text.secondary], // Use Material-UI theme colors
        fontSize: "14px",
        fontFamily: "'Sora', sans-serif",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%", // Adjust donut thickness
        },
      },
    },
    tooltip: {
      enabled: true, // Enable tooltips
      y: {
        formatter: (val) => `${val?.toFixed(2)}%`, // Display only the percentage
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels on the chart
    },
    stroke: {
      show: false, // Disable the stroke
    },
  };

  const chartSeries = performingData?.map((item) =>
    Number(((item?.totalTrade / totalAmount) * 100).toFixed(2))
  );

  return (
    <div className="displayCenter">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="donut"
        width="240"
      />
    </div>
  );
};

export default Doutgraph;
