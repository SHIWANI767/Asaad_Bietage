"use client";
import React, { useMemo } from "react";
import { Box, Typography, Container } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import dynamic from "next/dynamic";
const BuildCard = dynamic(() => import("./BuildCard"));

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  largeDesktop: {
    breakpoint: { max: 3000, min: 1280 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1280, min: 769 },
    items: 3,
  },
  smallTablet: {
    breakpoint: { max: 768, min: 769 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 767, min: 499 },
    items: 2,
  },
  smallMobile: {
    breakpoint: { max: 499, min: 1 },
    items: 1,
  },
};

const newsData = [
  {
    title: "Simple Auto Trade",
    decription:
      "Simple Auto Mode handles one trade at a time, ensuring straightforward and efficient transactions across multiple exchanges. Users retain full control and are responsible for all trading decisions made using Bitedge.",
  },
  {
    title: "Sniper Auto Trade",
    decription:
      "Sniper Auto Trade is an advanced feature which capitalises on maximum available trade opportunities simultaneously, leveraging your wallet balance across multiple exchanges for optimal performance. Users retain full control and are responsible for all trading decisions made using Bitedge.",
  },
  {
    title: "Smart Limit Orders",
    decription:
      "Our unique smart limit order option sets Bitedge apart. This feature actively searches for alternative iterations to reduce pending orders, lowering the risk for users. Users retain full control and are responsible for all trading decisions made using Bitedge.",
  },
];
export default function Build() {
  const carouselItems = useMemo(() => newsData, [newsData]);

  return (
    <Box className="buildBox">
      <Container>
        <Box className="tradeBiedgeText" align="center">
          <Typography variant="h2" color="primary">
            Trade confidently with Bitedge
            <br />
            using Automated Trading
          </Typography>
        </Box>
        <Carousel
          swipeable
          draggable
          showDots={false}
          responsive={responsive}
          ssr
          infinite={false}
          autoPlay={false}
          autoPlaySpeed={3000}
          keyBoardControl
          customTransition="transform 500ms cubic-bezier(0.42, 0, 0.58, 1)"
          transitionDuration={500}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {carouselItems.map((item, index) => (
            <Box key={index}>
              <BuildCard value={item} index={index} />
            </Box>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}
