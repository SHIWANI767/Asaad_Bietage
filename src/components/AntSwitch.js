import React from "react";
import { styled } from "@mui/system";
import Switch from "@mui/material/Switch";

const AntSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  root: {
    width: 28,
    height: 14,
    padding: 0,
    display: "flex",
    overflow: "visible !important",
  },
  "& .MuiSwitch-root": {
    overflow: "visible !important",
  },
  switchBase: {
    padding: 2,
    color: "#121212",
    "&$checked": {
      transform: "translateX(12px)",
      color: "green",
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}));

export default AntSwitch;
