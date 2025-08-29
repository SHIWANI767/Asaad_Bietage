import React, { useState } from "react";
import {
  Typography,
  Box,
  IconButton,
  Grid,
  Dialog,
  Divider,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import DetailsComponent from "./DetailsComponent";
import { styled } from "@mui/system";

const LivetableBox = styled(Box)(({ theme }) => ({
  "& .MuiDivider-root": {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  "& .MuiPaper-root": {
    padding: "18px",
  },
}));
function LiveTracking({ data, open, onClose }) {
  return (
    <>
      <LivetableBox>
        <Dialog
          open={open}
          onClose={() => onClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
          fullWidth
          className="paperClass"
        >
          <Box
            className="livetrackBox"
            sx={{
              position: "relative",
              [(theme) => theme.breakpoints.down("xs")]: {
                padding: "10px",
              },
              "& .MuiSelect-selectMenu": {
                fontSize: "14px",
              },
              "& .greenprogressbar": {
                position: "relative",
              },
            }}
          >
            <IconButton
              className="cancelBtn"
              onClick={() => onClose(false)}
              sx={{
                position: "absolute",
                top: "-18px",
                right: "-18px",
                width: "60px",
                height: "60px",
                "& svg": {
                  fontWeight: "700",
                  fontSize: "30px",
                },
              }}
            >
              <IoClose />
            </IconButton>
            <Grid container spacing={1} alignItems="center">
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box>
                  <Typography
                    variant="h2"
                    color="primary"
                    style={{ fontSize: "35px" }}
                  >
                    Live tracking
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box mt={4} mb={3}>
              <Divider />
            </Box>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box className="displayStart" mb={3}></Box>

                <DetailsComponent
                  data={data}
                  ExecuteButtonType={true}
                  onClose={() => onClose()}
                />
              </Grid>
            </Grid>
          </Box>
        </Dialog>
      </LivetableBox>
    </>
  );
}

export default LiveTracking;
