"use client";
import React, { useContext } from "react";
import { Container, Typography, Box, Grid, Button } from "@mui/material";
import { CgArrowTopRightO } from "react-icons/cg";
import { useRouter } from "next/router";
import AppContext from "@/context/AppContext";
import HomeLayout from "@/layout/HomeLayout";
import { maxWidth, styled, width } from "@mui/system";
import Support from "../home/Support";
import Work from "./Work";
import Start from "./Start";
const ExchangeBoxStyle = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: "999",
  "& h1": {
    fontSize: "60px",
    lineHeight: "80px",
    "@media(max-width:1024px)": {
      fontSize: "68px !important",
    },
    [theme.breakpoints.down("md")]: {
      // lineHeight: "40px",
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

export default function Exchange() {
  const router = useRouter();
  const auth = useContext(AppContext);
  return (
    <>
      <ExchangeBoxStyle>
        <Box className="bannerlanding">
          <Container>
            <Box className="bannerTextBoxvisible" align="center">
              <Typography variant="h1" color="primary">
                Securely Integrate Your
              </Typography>{" "}
              <Typography variant="h1" color="primary">
                <span className="gradient-text"> API Exchanges on Bitedge</span>
              </Typography>
              <Box mt={3}>
                <Typography variant="body2" color="secondary">
                  Grow your portfolio effortlessly with automated bots designed
                  for both seasoned traders and beginners, delivering
                  elite-level performance.
                </Typography>
              </Box>
              <Box mt={3} className="displayCenter">
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

            <Box className="displayCenter">
              <img
                alt={"Banner"}
                src="/images/banner_landing.gif"
                type="video/mp4"
                onDragStart={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
              />
            </Box>
          </Container>
          <Support />
          <Work />
          <Start />
        </Box>
      </ExchangeBoxStyle>
    </>
  );
}

Exchange.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
