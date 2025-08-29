"use client";
import React, { useMemo } from "react";
import { Box, Typography, Container } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import dynamic from "next/dynamic";
import SayingCard from "./SayingCard";
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
    decription:
      "As a newbie to crypto trading, I was overwhelmed by all the technical details. Bitedge.app made it simple and easy to navigate. With its smart features, I was able to make informed decisions and even see some profits. It’s been a real boost to my trading confidence! ",
    buttonText: "Oliver",
  },
  {
    decription:
      "I wanted to make some extra income but didn’t have time to dive into crypto trading. A friend recommended Bitedge.app, and honestly, with very little knowledge, I've started making a profit. The platform is incredibly easy to use and has made trading straightforward for me. ",
    buttonText: "George",
  },
  {
    decription:
      "As an active trader handling substantial investments daily, I required a platform that combines automation with robust control over my funds and strategies. Bitedge.app delivers precisely that, offering a sophisticated automated trading system while ensuring I maintain complete oversight and flexibility. It’s the ideal solution for managing large trades efficiently and effectively. ",
    buttonText: "James",
  },

  {
    decription:
      "As a newbie to crypto trading, I was overwhelmed by all the technical details. Bitedge.app made it simple and easy to navigate. With its smart features, I was able to make informed decisions and even see some profits. It’s been a real boost to my trading confidence! ",
    buttonText: "Oliver",
  },
  {
    decription:
      "I wanted to make some extra income but didn’t have time to dive into crypto trading. A friend recommended Bitedge.app, and honestly, with very little knowledge, I've started making a profit. The platform is incredibly easy to use and has made trading straightforward for me. ",
    buttonText: "George",
  },
  {
    decription:
      "As an active trader handling substantial investments daily, I required a platform that combines automation with robust control over my funds and strategies. Bitedge.app delivers precisely that, offering a sophisticated automated trading system while ensuring I maintain complete oversight and flexibility. It’s the ideal solution for managing large trades efficiently and effectively. ",
    buttonText: "James",
  },
];
export default function Saying() {
  const carouselItems = useMemo(() => newsData, [newsData]);

  return (
    <Box className="buildBox">
      <Container>
        <Box className="tradeBiedgeText" align="center">
          <Typography variant="h2" color="primary">
            See What Our Clients Are Saying
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
              <SayingCard value={item} index={index} />
            </Box>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}
