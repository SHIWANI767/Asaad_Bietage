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
import Tradingcard from "@/components/Tradingcard";
const TradingStyleBox = styled(Box)(({ theme }) => ({
  marginBottom: "80px",
  marginTop: "100px",
  [theme.breakpoints.down("sm")]: {
    marginBottom: "70px",
  },

  "& img": {
    borderRadius: "100px",
  },
  "& .featuresworkcradBox": {
    padding: "20px",
    minHeight: "145px",
    cursor: "pointer",
    transition: "box-shadow 0.9s ease, transform 0.5s ease", // Adding box-shadow and transform animations
    "&:hover": {
      background: "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)",
      transform: "scale(1.05)", // Slightly scaling the element on hover
      "& h6": {
        color: "rgba(25, 29, 19, 1)",
      },
      "& p": {
        color: "rgba(25, 29, 19, 0.8)",
      },
    },

    "@media(max-width:1024px)": {
      minHeight: "170px",
    },
  },
  "& h6": {
    fontSize: "16px",
    fontWeight: "700",
  },
}));
const workData = [
  {
    image: "/images/features_img.png",
    name: "How to connect to binance with API Keys",
    decription: "Market research is critical for any business.",
  },
  {
    image: "/images/features_img.png",
    name: "How to connect to binance US with API Keys",
    decription:
      "Learn How Bitedge works and how to start learningLearn How Bitedge works and how to start learningLearn How Bitedge works and how to start learning",
  },
  {
    image: "/images/features_img.png",
    name: "How to connect to binance US with API Keys",
    decription:
      "Learn How Bitedge works and how to start learningLearn How Bitedge works and how to start learningLearn How Bitedge works and how to start learning",
  },
  {
    image: "/images/features_img.png",
    name: "How to connect to binance US with API Keys",
    decription:
      "Learn How Bitedge works and how to start learningLearn How Bitedge works and how to start learningLearn How Bitedge works and how to start learning",
  },
];
export default function Trading() {
  const themeSetting = useContext(SettingsContext);
  const router = useRouter();
  return (
    <>
      <TradingStyleBox>
        <Container maxWidth="lg">
          <Box mb={4} align="center">
            <Typography variant="h2" color="primary">
              Trending Guides
            </Typography>
          </Box>

          <Grid container spacing={2} alignItems="center">
            {workData.map((item, index) => (
              <Grid item lg={3} sm={6} md={4} xs={12} key={index}>
                <Tradingcard value={item} index={index} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </TradingStyleBox>
    </>
  );
}
