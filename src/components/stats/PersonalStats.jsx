import { Grid, Paper } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import DualBarGraph from "./DualBarGraph";
import DonutChart from "./DonatChart";
import SingleBarGraph from "./SingleBarGraph";

const PersonalStatsComponent = styled("div")(({ theme }) => ({
  "& .paperresponsive": {
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
  },
}));

export default function PersonalStats({ newArrayDataUser, profitList }) {
  return (
    <PersonalStatsComponent>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6}>
          <Paper elevation={2} className="paperresponsive">
            <DualBarGraph newArrayDataUser={newArrayDataUser} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Paper elevation={2} className="paperresponsive">
            <DonutChart profitList={profitList} />
          </Paper>
        </Grid>
      </Grid>
    </PersonalStatsComponent>
  );
}
