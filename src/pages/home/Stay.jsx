import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";

const MainComponent = styled("div")(({ theme }) => ({
  "& .quickBox": {
    position: "relative",
    top: "0px",
    padding: "30px 0px",
    background: `url('/images/email_banner.png')`,
    width: "100%",
    backgroundSize: "cover !important",
    backgroundRepeat: "no-repeat !important",
    objectFit: "cover !important",
  },
  "& .MuiInputBase-root-MuiOutlinedInput-root": {
    borderBottom: "none",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "10px",
    background: "rgba(255, 255, 255, 0.08)",
    border: "none",
  },
  "& .MuiInputBase-input-MuiOutlinedInput-input": {
    height: "14px !important",
    fontSize: "18px",

    padding: "12px 14px",
  },
  "& .stayWidth": {
    width: "auto",
    maxWidth: "426px",
    [theme.breakpoints.down("xs")]: {
      width: "auto",
      maxWidth: "426px",
    },
  },
}));
export default function Stay() {
  return (
    <MainComponent>
      <Box className="quickBox">
        <Container>
          <Box className="" align="center" mb={5}>
            <Typography variant="h2">Stay in touch</Typography>
            <Box mt={2}>
              <Typography
                variant="body2"
                style={{
                  maxWidth: "226px",
                  color: "rgba(255, 255, 255, 0.60)",
                }}
              >
                Get Notified about important SubsocicalUpdates.
              </Typography>
            </Box>
            <Box className="displayCenter stayWidth" mt={3}>
              <TextField
                placeholder="Enter your email..."
                variant="outlined"
                fullWidth
              />
              &nbsp;&nbsp;
              <Button
                variant="contained"
                color="secondary"
                style={{ fontSize: "13px" }}
              >
                Subscribe
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </MainComponent>
  );
}
