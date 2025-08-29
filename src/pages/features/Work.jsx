import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { CgArrowTopRightO } from "react-icons/cg";
import { useRouter } from "next/router";
import SettingsContext from "@/context/SettingsContext";
const WorkStyleBox = styled(Box)(({ theme }) => ({
  marginTop: "200px",
  [theme.breakpoints.down("sm")]: {
    marginTop: "140px",
  },

  "& .workcradBox": {
    boxShadow:
      theme.palette.mode === "dark"
        ? "2px 2px 0px 0px rgba(255, 255, 255, 0.11)"
        : "2px 2px 0px 0px rgba(255, 255, 255, 0.11)",

    background:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(255, 255, 255, 0.8)",
    cursor: "pointer",
    transition: "box-shadow 0.9s ease, transform 0.5s ease", // Adding box-shadow and transform animations
    "&:hover": {
      boxShadow:
        "0 5px 12px rgba(var(--primary-text-color-rgb, 0, 31, 63), 0.16)",
      transform: "scale(1.05)", // Slightly scaling the element on hover
    },
  },
  "& h6": {
    fontSize: "18px",
    fontWeight: "700",
  },
}));
const workData = [
  {
    imgIccon: "/images/client/check_box.svg",
    name: "1.Initialisation",
    description:
      "You begin by configuring Bitedge.app with your trading preferences, including trading pairs, price thresholds, and other key factors. Every setting is customisable, so the automation runs exactly according to your strategy. ",
  },
  {
    imgIccon: "/images/client/check_box.svg",
    name: "2.Market Monitoring",
    description:
      "You begin by configuring Bitedge.app with your trading preferences, including trading pairs, price thresholds, and other key factors. Every setting is customisable, so the automation runs exactly according to your strategy. ",
  },
  {
    imgIccon: "/images/client/check_box.svg",
    name: "3.Opportunity Detection",
    description:
      "You begin by configuring Bitedge.app with your trading preferences, including trading pairs, price thresholds, and other key factors. Every setting is customisable, so the automation runs exactly according to your strategy. ",
  },
  {
    imgIccon: "/images/client/check_box.svg",
    name: "4.Trade Execution",
    description:
      "You begin by configuring Bitedge.app with your trading preferences, including trading pairs, price thresholds, and other key factors. Every setting is customisable, so the automation runs exactly according to your strategy. ",
  },
];
export default function Work() {
  const themeSetting = useContext(SettingsContext);
  const router = useRouter();
  return (
    <>
      <WorkStyleBox>
        <Container>
          <Grid container spacing={2} alignItems="center">
            <Grid item lg={5} sm={12} md={5} xs={12}>
              <Box mb={2}>
                <Typography variant="h2" color="primary">
                  How does it work?
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color="secondary"
                style={{ maxWidth: "628px" }}
              >
                Bitedge.app is a powerful crypto trading automation tool
                designed to simplify your trading strategy execution.
                Bitedge.app empowers you with full control, allowing you to set
                custom parameters for automated trade executions. You have the
                flexibility to customise every element, ensuring the automation
                runs according to your strategy.
              </Typography>

              <Box mt={3} className="displayStart">
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
              </Box>
            </Grid>
            <Grid item lg={7} sm={12} md={7} xs={12}>
              <Grid container spacing={3}>
                {workData.map((item) => (
                  <Grid item lg={6} sm={6} md={6} xs={12}>
                    <>
                      <Paper elevation={1} className="workcradBox">
                        <Box>
                          <img
                            src={item.imgIccon}
                            alt="Image"
                            width="70px"
                            height="70px"
                            style={{ marginTop: "16px" }}
                          />
                          <Typography variant="h6" color="primary" mt={2}>
                            {item.name}
                          </Typography>

                          <Typography variant="body2" color="primary">
                            {item.description}
                          </Typography>
                        </Box>
                      </Paper>
                    </>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </WorkStyleBox>
    </>
  );
}
