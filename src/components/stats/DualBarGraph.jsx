import { Box, Typography, Divider } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DualBarGraphComponent = styled(Box)(({ theme }) => ({
  "& .mainGraph": {
    padding: "22px 30px 40px",
  },
}));

export default function DualBarGraph({ newArrayDataUser }) {
  const dualBarGraphData = React.useMemo(() => {
    const labels = newArrayDataUser?.newarray4 || [];
    const buyData = newArrayDataUser?.newarraybuy || [];
    const sellData = newArrayDataUser?.newarraysell || [];

    return {
      labels,
      datasets: [
        {
          label: "Buy",
          backgroundColor: "rgba(116, 176, 250, 1)",
          borderWidth: 1,
          data: buyData,
          barThickness: 10,
        },
        {
          label: "Sell",
          backgroundColor: "#81E396",
          borderWidth: 1,
          data: sellData,
          barThickness: 10,
        },
      ],
    };
  }, [newArrayDataUser]);

  const dualBarGraphOptions = React.useMemo(() => {
    return {
      scales: {
        x: {
          type: "category",
          position: "bottom",
          grid: {
            display: false,
          },
          ticks: {
            autoSkip: true,
            maxRotation: 0,
            minRotation: 0,
          },
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            stepSize: 2,
            callback: (value) => (value === 0 ? "0" : value),
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      elements: {
        bar: {
          borderRadius: 5,
        },
      },
    };
  }, []);

  return (
    <DualBarGraphComponent>
      <Box>
        <Box mb={5}>
          <Box mt={2}>
            <Typography variant="h5" color="primary">
              Buy and Sells
            </Typography>
          </Box>
          <Box mt={1}>
            <Divider />
          </Box>
        </Box>
        <Bar data={dualBarGraphData} options={dualBarGraphOptions} />
      </Box>
    </DualBarGraphComponent>
  );
}
