"use client";
import React, { useContext } from "react";
import { Container, Typography, Box, Grid, Button } from "@mui/material";
import { CgArrowTopRightO } from "react-icons/cg";
import { useRouter } from "next/router";
import AppContext from "@/context/AppContext";

export default function Banner() {
  const router = useRouter();
  const auth = useContext(AppContext);
  return (
    <>
      <Box className="bannerlanding">
        <Container>
          <Grid container spacing={2} alignItems="center">
            <Grid item lg={6} sm={12} md={6} xs={12}>
              <Box
                className="bannerTextBoxvisible"
                sx={{
                  "media(max-width: 600px)": {
                    paddingBottom: "38px",
                  },
                }}
              >
                <Typography variant="h1" color="primary">
                  Trade Like an Expert with
                </Typography>{" "}
                <Typography variant="h1" color="primary">
                  <span className="gradient-text">
                    Automated Crypto Trading
                  </span>
                </Typography>
                <Box mt={4}>
                  <Typography
                    variant="body2"
                    color="secondary"
                    style={{ width: "553px" }}
                  >
                    Bitedge.app is a cloud-based crypto assets trading
                    automation software designed to empower beginners with a
                    seamless start in the world of cryptocurrency. Our
                    intelligent tools and technologies provide you with the
                    insights and support needed to make well-informed trading
                    decisions.
                  </Typography>
                </Box>
                <Box mt={4} className="displayStart">
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<CgArrowTopRightO />}
                    onClick={() => {
                      if (auth.userLoggedIn) {
                        router.push("/dashboard");
                      } else {
                        router.push("/auth/login");
                      }
                    }}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                      router.push("/about-us");
                    }}
                  >
                    Know More
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={6} sm={12} md={6} xs={12}>
              <Box className="videoBox">
                <img
                  alt={"hdfgbjksg"}
                  src="/images/banner_landing.gif"
                  type="video/mp4"
                  onDragStart={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
