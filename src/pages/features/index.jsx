"use client";
import React, { useContext } from "react";
import { Container, Typography, Box, Grid, Button } from "@mui/material";
import { useRouter } from "next/router";
import HomeLayout from "@/layout/HomeLayout";
import { styled } from "@mui/system";
import FeaturesTab from "./FeaturesTab";
const ExchangeBoxStyle = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: "999",
  "& h1": {
    fontSize: "60px",
    lineHeight: "80px",
    "@media(max-width:1024px)": {
      fontSize: "51px !important",
    },

    "@media(max-width:768px)": {
      lineHeight: "40px",
      fontSize: "28px !important",
    },
  },
  "& img": {
    width: "auto",
    maxWidth: "100%",
  },
}));

export default function Features() {
  const router = useRouter();

  return (
    <>
      <ExchangeBoxStyle>
        <Box className="bannerlanding">
          <Container>
            <Box className="bannerTextBoxvisible1" align="center" mb={3}>
              <Typography variant="h1" color="primary">
                From Beginner to Pro: Bitedge Delivers
              </Typography>{" "}
              <Typography
                variant="h1"
                color="primary"
                style={{ textAlign: "center" }}
              >
                <span className="gradient-text">
                  Strategies for All Crypto Trader{" "}
                </span>
              </Typography>
              <Box mt={3}>
                <Typography variant="body2" color="secondary">
                  Grow your portfolio effortlessly with automated bots designed
                  for both seasoned traders and beginners, delivering
                  elite-level performance.
                </Typography>
              </Box>
            </Box>

            <FeaturesTab />
          </Container>
        </Box>
      </ExchangeBoxStyle>
    </>
  );
}

Features.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
