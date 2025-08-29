"use client";
import React, { useContext } from "react";
import { Container, Typography, Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import HomeLayout from "@/layout/HomeLayout";
import { styled } from "@mui/system";
import TutorialTab from "./TutorialTab";

const ExchangeBoxStyle = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: "999",
  "& h1": {
    fontSize: "60px",
    lineHeight: "80px",
    maxWidth: "800px",
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

  "& .startButton": {
    position: "absolute",
    right: "8px",
    bottom: "7px",
    height: "40px !important",
    borderRadius: "10px !important",
    padding: "12px 18px",
    [theme.breakpoints.down("sm")]: {},
  },
  "& .MuiOutlinedInput-root": {
    position: "relative",
    border: `1px solid ${
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(25, 29, 19, 1)"
    }`,
  },
  "& .MuiOutlinedInput-input": {
    padding: "11px 0",
    marginRight: "100px",
  },
  "& .textFieldContainer": {
    position: "relative",
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
                How to connect to your exchange with{" "}
                <span className="gradient-text">API Keys</span>
              </Typography>{" "}
            </Box>

            {/* <Box mt={3} align="center">
              <Box style={{ maxWidth: "500px" }} className="textFieldContainer">
                <TextField
                  variant="outlined"
                  placeholder="Enter Email Address"
                  fullWidth
                  type="text"
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="startButton"
                >
                  Search
                </Button>
              </Box>
            </Box> */}

            <TutorialTab />
          </Container>
        </Box>
      </ExchangeBoxStyle>
    </>
  );
}

Features.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
