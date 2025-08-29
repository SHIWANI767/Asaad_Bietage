import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import ButtonCircularProgress from "../ButtonCircularProgress";

export default function Popup({
  maxWidth,
  open,
  handleClose,
  title,
  children,
  actions,
  titleIcon,
  isLoading,
  isRemove,
  params,
  isClose,
  type,
  isShowIcon,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog
      onClose={() => {
        if (isClose) {
          handleClose();
        }
      }}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth={maxWidth}
      fullWidth
      keepMounted
      {...params}
    >
      <DialogTitle
        sx={{ m: 0, padding: 0, fontSize: "30px" }}
        id="customized-dialog-title"
      >
        {!isShowIcon && (
          <IconButton
            onClick={handleClose}
            size="large"
            disabled={isLoading}
            className="closeIconButton"
          >
            <CloseIcon />
          </IconButton>
        )}
        {titleIcon && (
          <Box mr={1} className="arrowIconButton">
            {titleIcon}
          </Box>
        )}
        <Box className="displayCenter">
          <Typography
            variant="h5"
            color="primary"
            display="flex"
            textAlign="center"
            style={{
              fontSize: "20px",
              fontWeight: "600",
              maxWidth: "470px",
              lineHeight: "30px",
            }}
          >
            {title}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2" color="secondary">
          {children}
        </Typography>
      </DialogContent>
      {actions.length > 0 && (
        <DialogActions
          sx={{
            justifyContent: "center",
            "& button": {
              height: (theme) => {
                const buttonHeight = isMobile ? "30px" : "40px";
                return `${buttonHeight} !important`;
              },
              fontSize: (theme) =>
                isMobile
                  ? theme.typography.pxToRem(10)
                  : theme.typography.fontSize,
            },
            padding: "0px",
          }}
        >
          {actions.map((action, index) => (
            <Button
              small
              key={index}
              onClick={action.onClick}
              disabled={action.isLoading || isLoading}
              color={action.color}
              variant={action.variant}
              sx={{
                display: action.isRemove ? "none" : "flex",
                marginTop: "10px",
              }}
              type={type}
            >
              {action.label}
              {action.isLoading && <ButtonCircularProgress />}
            </Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
}
