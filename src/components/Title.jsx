import AppContext from "@/context/AppContext";
import { Typography } from "@mui/material";
import React, { useContext } from "react";

const Title = () => {
  const auth = useContext(AppContext);

  return (
    <Typography color="primary" variant="h4" className="nameTexttopbar1">
      {auth?.topHeading || "Dashboard"}
    </Typography>
  );
};

export default Title;
