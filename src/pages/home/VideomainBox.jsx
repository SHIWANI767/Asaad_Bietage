import React from "react";
import { Box, Grid } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import VideoCard from "./VideoCard";
import dynamic from "next/dynamic";
const VideoCard = dynamic(() => import("./VideoCard"));

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  largeDesktop: {
    breakpoint: { max: 3000, min: 1280 },
    items: 4,
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

export default function VideomainBox({ list }) {
  return (
    <Box className="buildBox1">
      <Grid spacing={2}>
        <Grid item xs={1} sm={2} md={4}>
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
            {list &&
              list?.map((value, index) => (
                <VideoCard key={index} value={value} index={index} />
              ))}
          </Carousel>
        </Grid>
      </Grid>
    </Box>
  );
}
