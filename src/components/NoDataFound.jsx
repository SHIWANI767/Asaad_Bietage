import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function NoDataFound({ text }) {
  return (
    <Box
      display="flex"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Box align="center" pt={3} pb={3}>
        <Image
          height={210}
          width={207}
          quality={100}
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          src={"/images/DarkFrame.svg"}
          // style={{ maxWidth: "150px" }}
          alt=""
        />
        <Typography variant="body1" color="primary">
          {text}
        </Typography>
      </Box>
    </Box>
  );
}
