import { Box } from "@mui/material";
import React, { useState } from "react";
import DetailsComponent from "../quantum-loop/DetailsComponent";

function TriangularCard({ value, tradeApi }) {
  return (
    <Box>
      <DetailsComponent data={value} tradeApi={tradeApi} />
    </Box>
  );
}
export default React.memo(TriangularCard);
