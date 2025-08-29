import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Button,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ScheduleDialog({
  open,
  handleClose,
  onAccept,
  onDecline,
}) {
  const handleAccept = () => {
    handleClose();
    onAccept();
  };

  const handleDecline = () => {
    handleClose();
    onDecline();
  };
  return (
    <Box className="chatdialogBox">
      <Dialog open={open} fullWidth maxWidth="sm" style={{}}>
        <Box className="chatscrollBox">
          <DialogTitle
            className="chatdialogBox"
            style={{
              padding: "0px",
            }}
          >
            <Box className="displaySpacebetween">
              <Typography variant="h5" color="primary">
                We value your privacy
              </Typography>
              <IconButton onClick={handleDecline} size="large">
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent className="gradientTextborder">
            <Box mt={2} mb={3}>
              <Typography variant="body2" color="secondary">
                Thank you for choosing to join our community! Before you get
                started, we want to ensure that you are aware of and agree to
                the terms and conditions that govern your use of our platform.
                Your privacy and security are important to us, and we are
                committed to being transparent about how your information will
                be used.
              </Typography>
            </Box>

            <DialogActions style={{ justifyContent: "flex-start" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDecline}
              >
                Decline All
              </Button>
              &nbsp; &nbsp;
              <Button
                variant="contained"
                color="primary"
                onClick={handleAccept}
              >
                Accept All
              </Button>
            </DialogActions>
          </DialogContent>
        </Box>
      </Dialog>
    </Box>
  );
}
