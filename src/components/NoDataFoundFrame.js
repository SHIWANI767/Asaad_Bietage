import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function NoDataFoundFrame({ data }) {
  return (
    <Box
      align="center"
      mt={1}
      pt={3}
      pb={3}
      width="100%"
      className="flexdirection"
    >
      <Image
        height={210}
        width={207}
        quality={100}
        onDragStart={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
        src={"/images/nodatadark.svg"}
        style={{ maxWidth: "260px" }}
        alt=""
      />

      <Typography variant="body1" color="primary" style={{ fontSize: "14px" }}>
        {data}
      </Typography>
    </Box>
  );
}
