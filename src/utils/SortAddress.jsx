// SortAddress.js
import React, { useState } from "react";
import { LuCopy } from "react-icons/lu";
import { IconButton, Typography, Link } from "@mui/material";
import { sortAddress } from ".";
import { Check } from "@mui/icons-material";
import toast from "react-hot-toast";
import ToolTipComp from "./ToolTipComp";

const SortAddress = ({ address, isStart, showAll, isReferal, isLink, url }) => {
  const [copied, setCopied] = useState(false);
  const isReferalCode = isReferal ? address.split("refCode=")[1] : address;
  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        toast.success("Copied!");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Unable to copy text", err);
      });
  };

  return (
    <>
      {address ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: isStart ? "space-between" : "center",
          }}
        >
          {isLink ? (
            <Typography
              variant="body2"
              onClick={() => window.open(url, `_blank`)}
              sx={{ cursor: "pointer" }}
              color="primary"
            >
              {/* {showAll ? isReferalCode : sortAddress(isReferalCode)} */}
              <ToolTipComp title={address}>
                {showAll ? isReferalCode : sortAddress(isReferalCode)}
              </ToolTipComp>
            </Typography>
          ) : (
            <Typography variant="body2" color={"primary"}>
              {/* {showAll ? isReferalCode : sortAddress(isReferalCode)} */}
              <ToolTipComp title={address}>
                {showAll ? isReferalCode : sortAddress(isReferalCode)}
              </ToolTipComp>
            </Typography>
          )}{" "}
          &nbsp; &nbsp;
          <IconButton
            size="small"
            onClick={handleCopyClick}
            sx={{
              marginLeft: "0px",
              cursor: "pointer",
              border: "none",
              background: "transparent",
              padding: "0",
              fontSize: (theme) =>
                theme.breakpoints.down("sm") ? "10px" : "14px",
              // width: (theme) =>
              //   theme.breakpoints.down("sm") ? "15px" : "22px",
              height: "22px",
              width: "22px",
              "& svg": {
                color: (theme) => theme.palette.primary.main,
                fontSize: (theme) =>
                  theme.breakpoints.down("sm") ? "14px" : "20px",
              },
            }}
            disabled={copied}
          >
            {copied ? <Check /> : <LuCopy />}
          </IconButton>
        </div>
      ) : (
        "--"
      )}
    </>
  );
};

export default SortAddress;
