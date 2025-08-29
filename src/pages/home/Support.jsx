import { useMemo, useState, useContext, useEffect } from "react";
import { Container, Box, Paper, Typography, Button } from "@mui/material";
import { maxWidth, minHeight, positions, styled } from "@mui/system";
import HomeLayout from "@/layout/HomeLayout";
import { useRouter } from "next/router";
import { CgArrowTopRightO } from "react-icons/cg";
import Carousel from "react-multi-carousel";
import AppContext from "@/context/AppContext";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1600 },
    items: 6,
  },
  largeDesktop: {
    breakpoint: { max: 1599, min: 1280 },
    items: 6,
  },
  largeDesktop: {
    breakpoint: { max: 3000, min: 1280 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1280, min: 1024 },
    items: 5,
  },
  smallTablet: {
    breakpoint: { max: 768, min: 769 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 767, min: 499 },
    items: 2,
  },
  smallMobile: {
    breakpoint: { max: 499, min: 1 },
    items: 2,
  },
};
const SupportBox = styled("div")(({ theme }) => ({
  "& .react-multiple-carousel__arrow--right": {
    top: "32% !important",
    [theme.breakpoints.down("sm")]: {
      top: "26% !important",
    },
  },
  "& .react-multiple-carousel__arrow--left": {
    top: "32% !important",
    [theme.breakpoints.down("sm")]: {
      top: "26% !important",
    },
  },
  "& .supportCradBox": {
    margin: "10px",
    padding: "24px",
    boxShadow: "4px 4px 0px 0px #FFFFFF1C",
    minHeight: "33px",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: "24px",
      margin: "5px",
    },

    "& img": {
      filter: "drop-shadow(2px 4px 6px black)",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "100px !important",
      },
    },
  },
}));
const newsData = [
  {
    img: "/images/binance_1.png",
    // href: "https://www.binance.com/en/my/dashboard/",
  },
  {
    img: "/images/mexc.svg",
    href: "https://promote.mexc.com/r/XyMWh15s",
  },

  {
    img: "/images/bitmart_bluenew.png",
    href: "https://www.bitmart.com/invite/Vuv6kP/en",
  },
  {
    img: "/images/Kraken.png",
  },
  {
    img: "/images/coinbase.svg",
    href: "https://www.coinbase.com/",
  },

  {
    img: "/images/bybit.png",
  },
  {
    img: "/images/bitfinex-logo.svg",
  },

  {
    img: "/images/okax.png",
  },
];
export default function Support({ isViewGrid }) {
  const router = useRouter();
  const auth = useContext(AppContext);
  return (
    <SupportBox>
      <Box className="pricepaper pricemain-landing" align="center">
        <Container maxWidth="lg">
          <Box mb={2}>
            <Typography variant="h2" color="primary">
              Bitedge.app Supports Multiple Exchanges
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="secondary"
            style={{ maxWidth: "628px" }}
          >
            Gain broader market access and enhanced trading opportunities across
            multiple exchanges.
          </Typography>
          <Box mt={4}>
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={false}
              responsive={responsive}
              ssr={true}
              infinite={false}
              autoPlay={false}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              customTransition="transform 500ms cubic-bezier(0.42, 0, 0.58, 1)"
              transitionDuration={500}
              containerClass="carousel-container"
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {newsData.map((item, index) => (
                <Paper
                  key={index}
                  elevation={1}
                  className="supportCradBox displayCenter"
                >
                  <a
                    href={item.href}
                    target="_blank"
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={item.img}
                      alt="Image"
                      style={{
                        width: "auto",
                        maxWidth: "130px",
                        height: "22px",
                      }}
                    />
                  </a>
                  {[
                    "/images/bitfinex-logo.svg",
                    "/images/bybit.png",
                    "/images/okax.png",
                  ].includes(item.img) && (
                    <Typography
                      variant="body2"
                      color="primary"
                      className="comminExchange"
                    >
                      Coming Soon
                    </Typography>
                  )}
                </Paper>
              ))}
            </Carousel>
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
          </Box>
        </Container>
      </Box>
    </SupportBox>
  );
}

Support.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
