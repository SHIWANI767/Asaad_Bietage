import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import { styled } from "@mui/system";
import SettingsContext from "@/context/SettingsContext";
const SimpleBox = styled("div")(({ theme }) => ({
  "& h6": {
    fontWeight: "700",
    fontSize: "18px",
    lineHeight: "30px",
    // maxWidth: "200px",
    [theme.breakpoints.down("sm")]: {
      lineHeight: "20px",
    },
  },
  "& p": {
    maxWidth: "351px",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "40px",
    },
  },
  "& .simpleButton": {
    color: theme.palette.text.primary,
    boxShadow:
      theme.palette.mode === "dark" ? "0px 4px 49.96px 0px #C6F57A66" : "none",
    background:
      theme.palette.mode === "dark"
        ? "#060807"
        : "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)",
    border: `1px solid ${
      theme.palette.mode === "dark" ? "#5CFF80" : "#5CFF80"
    }`,
  },
  "& .simpleBoxmain": {
    boxShadow:
      theme.palette.mode === "dark"
        ? "none"
        : "0px 0px 20px 0px rgba(130, 130, 130, 0.12)",
    padding: "50px",
    border: `1px solid ${
      theme.palette.mode === "dark" ? "#FFFFFF1A" : "#FFFFFF1A"
    }`,
    background: theme.palette.mode === "dark" ? "#FFFFFF0D" : "#FFFFFF0D",
    [theme.breakpoints.down("md")]: {
      padding: "40px !important",
    },
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0px !important",
  },
}));
const simpledata = [
  {
    heading: (
      <>
        Sequential Trade
        <br />
        Management
      </>
    ),
    img: "/images/Smarter/smarter_1.svg",
    description:
      "Focus on one trade at a time, reducing complexity and risk of errors.",
  },
  {
    heading: (
      <>
        Cross-Exchange
        <br />
        Trading
      </>
    ),
    img: "/images/Smarter/smarter_2.svg",
    description:
      "Navigate different rules and conditions across multiple exchanges.",
  },
  {
    heading: (
      <>
        User Control And
        <br />
        Responsibility
      </>
    ),
    img: "/images/Smarter/smarter_3.svg",
    description:
      "Retain control with simplified decision-making and individual risk management.",
  },
];

export default function Simple() {
  const themeSetting = useContext(SettingsContext);
  return (
    <>
      <SimpleBox>
        <Paper elevation={2} className="simpleBoxmain">
          <Box align="left" mb={5}>
            <Button
              variant="contained"
              color="primary"
              className="simpleButton"
            >
              Simple Auto Trade
            </Button>
          </Box>

          <Grid container spacing={2}>
            {simpledata.map((item) => (
              <Grid lg={4} md={4} sm={6} xs={12}>
                <Box align="left">
                  <Box className="displayStart" style={{ gap: "10px" }}>
                    <img
                      src={item.img}
                      width="30px"
                      height="30px"
                      alt="Image"
                    />
                    <Typography variant="h6" ml={1}>
                      {item.heading}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="primary" mt={2}>
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </SimpleBox>
    </>
  );
}
