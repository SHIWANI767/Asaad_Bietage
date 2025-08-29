import React from "react";
import { Box, Typography, Button, Grid, IconButton } from "@mui/material";

export default function JourneySection() {
  return (
    <>
      <Box style={{ position: "relative" }}>
        <Box className="roadBorderBox"></Box>
        <Grid container spacing={2} alignItems="flex-end" position="relative">
          <Grid item lg={3} sm={6} md={3} xs={12}>
            <Box mt={5} mb={3}>
              <IconButton className="numbericonBox1">01</IconButton>
            </Box>
            <Typography variant="h2" color="primary" className="heading-name">
              Register
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              mt={1}
              className="descriptionroadText"
            >
              Join Bitedge.app by quickly creating your account with a few basic
              details.
            </Typography>
            <Box mt={5} mb={3} className="borderroadmapBox">
              <IconButton className="numbericonBox">01</IconButton>
            </Box>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            md={3}
            xs={12}
            style={{ position: "relative" }}
          >
            <Box className="roadmapBox">
              <Box mb={3}>
                <IconButton className="numbericonBox1">02</IconButton>
              </Box>
              <Typography variant="h2" color="primary" className="heading-name">
                Add Your Exchange APIs
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                mt={1}
                className="descriptionroadText"
              >
                Easily link your exchange accounts with our secure API
                integration.
              </Typography>
            </Box>

            <Box mt={5} mb={3} className="borderroadmapBox">
              <IconButton className="numbericonBox">02</IconButton>
            </Box>
          </Grid>
          <Grid item lg={3} sm={6} md={3} xs={12}>
            <Box mb={3}>
              <IconButton className="numbericonBox1">03</IconButton>
            </Box>
            <Typography variant="h2" color="primary" className="heading-name">
              Start Trading
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              mt={1}
              className="descriptionroadText"
            >
              Choose your preferred trading strategy and start placing your
              trades.
            </Typography>
            <Box mt={5} mb={3} className="borderroadmapBox">
              <IconButton className="numbericonBox">03</IconButton>
            </Box>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            md={3}
            xs={12}
            style={{ position: "relative" }}
          >
            <Box className="roadmapBox">
              <Box mb={3}>
                <IconButton className="numbericonBox1">04</IconButton>
              </Box>
              <Typography variant="h2" color="primary" className="heading-name">
                Withdraw Profit
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                mt={1}
                className="descriptionroadText"
              >
                Securely withdraw your earnings to your preferred account.
              </Typography>
            </Box>

            <Box mt={5} mb={3} className="borderroadmapBox">
              <IconButton className="numbericonBox">04</IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
