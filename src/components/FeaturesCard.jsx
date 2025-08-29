import Image from "next/image";
import { Typography, Box, styled, Paper, IconButton } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { FaPlay } from "react-icons/fa";
const VideoCardBox = styled("div")(({ theme }) => ({
  cursor: "pointer",
  "& .videoCard": {
    position: "relative",
    boxShadow: "none",
    "& .buildimg": {
      objectFit: "cover",
      height: "220px",
      width: "100%",
      borderRadius: "24px 24px 0 0",
      transition: "all 0.3s ease-in-out 0s",
      position: "relative",
      zIndex: "2",
      borderRadius: "16px 16px 0 0px",
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
      padding: "13px",
      background: "rgba(0, 0, 0, 1)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "50px",
      height: "49px",
      border: "1px solid #fff",
      "& svg": {
        fontSize: "45px",
      },
    },
  },
  "& h6": {
    fontWeight: "500",
    fontSize: "22px",
  },
  "& .cardBox": {
    // padding: "15px",
    minHeight: "120px",
  },

  "& .priceText1": {
    whiteSpace: "nowrap",
    width: "100%",
    overflow: "hidden",
    marginRight: "20px",
    textOverflow: "ellipsis",
  },
}));

export default function FeaturesCard({ value, index }) {
  const router = useRouter();
  return (
    <VideoCardBox>
      <Paper elevation={1} className="videoCard">
        {/* <Image
          src={value?.image}
          className="buildimg"
          alt={value?.name}
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          width={220} // Set your width
          height={475} // Set your height
          quality={100} // Adjust quality as needed
        /> */}
        <img src={value?.image} className="buildimg" />
        <IconButton className="playButton">
          <FaPlay />
        </IconButton>
        <Box className="cardBox">
          <Typography variant="body1" color="primary" fontSize="12px" mt={1}>
            Fri May 21 2024
          </Typography>
          <Box mt={1} mb={1} className="displaySpacebetween">
            <Typography
              variant="body2"
              color="primary"
              className="priceText priceText1"
              fontSize="18px"
            >
              {value?.name}
            </Typography>
            <Typography variant="h6" color="primary">
              40$
            </Typography>
          </Box>
          <Typography variant="body2" color="secondary" className="priceText1">
            {value?.decription}
          </Typography>
        </Box>
      </Paper>
    </VideoCardBox>
  );
}
