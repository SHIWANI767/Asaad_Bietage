import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import SettingsContext from "@/context/SettingsContext";
import { useRouter } from "next/router";
import { Button, Typography } from "@mui/material";
import { RiArrowDropDownFill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";

export default function Profile({ setOpenLogoutModal }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const themeSetting = useContext(SettingsContext);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "left" }}>
        {/* <Tooltip title="Account settings"> */}
        {/* <Typography
                    variant="body2"
                    color="primary"
                    className="profileButtonBox"
                    onClick={() => router.push("/")}
                >
                    Home
                </Typography> */}
        <Button
          onClick={handleClick}
          size="small"
          className="profileButtonBox"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          style={{
            color: themeSetting.settings.theme === "DARK" ? "#fff" : "#000",
          }}
          endIcon={
            <IoIosArrowDown
              style={{
                color: themeSetting.settings.theme === "DARK" ? "#fff" : "#000",
              }}
            />
          }
        >
          Learn
        </Button>
        {/* </Tooltip> */}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        // disabled={!menuItem.userType}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            boxShadow: "0px 12px 16px -4px #1018282e",
            mt: 1.5,
            minWidth: "120px",
            left: "403px",
            borderRadius: "15px",
            bgcolor:
              themeSetting.settings.theme === "DARK" ? "#1018282e" : "#FCFCFD",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor:
                themeSetting.settings.theme === "DARK"
                  ? "#FCFCFD"
                  : "#0000004f",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => router.push("/about-us")}
          style={{ fontSize: "14px" }}
        >
          About us
        </MenuItem>
        <MenuItem
          onClick={() => router.push("/privacy-policy")}
          style={{ fontSize: "14px" }}
        >
          Privacy policy
        </MenuItem>
        <MenuItem
          onClick={() => router.push("/terms-and-conditions")}
          style={{ fontSize: "14px" }}
        >
          Terms of service
        </MenuItem>
        {/* <MenuItem onClick={() => router.push("/static/faq")}>FAQs</MenuItem> */}

        {/* <MenuItem
          // onClick={handleClose}
          onClick={() => setOpenLogoutModal(true)}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem> */}
      </Menu>
    </>
  );
}
