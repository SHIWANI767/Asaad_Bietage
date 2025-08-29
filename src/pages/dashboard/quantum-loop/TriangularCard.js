import { Box } from "@mui/material";
import React, { useState } from "react";
import DetailsComponent from "./DetailsComponent";

function TriangularCard({ value }) {
  return (
    <Box
      sx={{
        "& .MuiPaper-root": {
          padding: "18px",
        },
      }}
    >
      <DetailsComponent data={value} />
    </Box>
  );
}
export default React.memo(TriangularCard);
