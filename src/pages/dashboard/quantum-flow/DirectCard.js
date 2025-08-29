import { Box } from "@mui/material";
import React from "react";
import DetailsComponent from "./DetailsComponent";

function DirectCard({ value }) {
  return (
    <Box>
      <DetailsComponent data={value} />
    </Box>
  );
}
export default React.memo(DirectCard);
