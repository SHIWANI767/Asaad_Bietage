import { fixDecimal } from "@/utils";
import { Tooltip as MUI_Tooltip } from "@mui/material";
import React from "react";

const Tooltiphover = ({ title, amount, isTop, symbol }) => {
  return (
    <MUI_Tooltip
      title={`${title}: ${amount} ${symbol ? symbol : ""}`}
      arrow
      placement={isTop ? "top" : "bottom"}
    >
      {fixDecimal(amount)}
    </MUI_Tooltip>
  );
};

export default Tooltiphover;
