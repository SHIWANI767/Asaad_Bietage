import { Typography, Box, IconButton, styled, Paper } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { FaPlay } from "react-icons/fa";

const VideoCardBox = styled("div")(({ theme }) => ({
  "& .videoCard": {
    position: "relative",
    margin: "10px",
    "& img": {
      objectFit: "cover",
      height: "220px",
      width: "100%",
      borderRadius: "24px 24px 0 0",
      transition: "all 0.3s ease-in-out 0s",
      position: "relative",
      zIndex: "2",
      borderRadius: "12px 12px 0 0px",
      "&:hover": {
        transform: "scale(1.02)",
        transition: "all 0.3s ease-in-out 0s",
      },
    },
    "& .playButton": {
      position: "absolute",
      top: "28%",
      zIndex: "9",
      left: "45%",
      padding: "2px",
      "& svg": {
        fontSize: "65px",
      },
    },
  },
  "& h6": {
    fontWeight: "700",
    fontSize: "22px",
  },
  "& .cardBox": {
    padding: "15px",
    minHeight: "120px",
  },
  "& .priceText": {
    whiteSpace: "nowrap",
    width: "100%",
    overflow: "hidden",
  },
}));

export default function VideoCard({ value, index }) {
  const router = useRouter();
  return (
    <VideoCardBox
      onClick={() => {
        router.push({
          pathname: "/article/[dugs]/[slug]",
          query: { dugs: "video", slug: value._id },
        });
      }}
    >
      <Paper elevation={1} className="videoCard" style={{ padding: "0px" }}>
        <img src={value?.bannerImage} className="buildimg" />
        <IconButton className="playButton">
          <FaPlay />
        </IconButton>
        <Box className="cardBox">
          <Box mb={1}>
            <Typography variant="h5" color="primary" className="priceText">
              {value?.title}
            </Typography>
          </Box>
          <Typography variant="body1" color="secondary">
            {value.decription}
          </Typography>

          <Typography variant="body1" color="secondary" mt={2}>
            {moment(value.updatedAt).format("L")}
          </Typography>
        </Box>
      </Paper>
    </VideoCardBox>
  );
}
