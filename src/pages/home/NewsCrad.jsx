import Image from "next/image";
import { Typography, Box, styled, Paper } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";

const VideoCardBox = styled("div")(({ theme }) => ({
  cursor: "pointer",
  "& .videoCard": {
    position: "relative",
    margin: "10px",
    "& .buildimg": {
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

export default function NewsCrad({ value, index }) {
  const router = useRouter();
  return (
    <VideoCardBox
      onClick={() => {
        router.push({
          pathname: "/articles/[blogType]/[id]",
          query: { blogType: "blog", id: value._id },
        });
      }}
    >
      <Paper elevation={1} className="videoCard" style={{ padding: "0px" }}>
        <Image
          src={value?.image}
          className="buildimg"
          alt={value?.title}
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          width={220} // Set your width
          height={475} // Set your height
          quality={100} // Adjust quality as needed
        />
        <Box className="cardBox">
          <Box mt={2} mb={1}>
            <Typography variant="h5" color="primary" className="priceText">
              {value?.title}
            </Typography>
          </Box>
          <Typography variant="body1" color="secondary">
            {value.decription}
          </Typography>
          <Typography variant="body1" color="secondary" mt={2}>
            {moment(value.updatedAt).format("l")}
          </Typography>
        </Box>
      </Paper>
    </VideoCardBox>
  );
}
