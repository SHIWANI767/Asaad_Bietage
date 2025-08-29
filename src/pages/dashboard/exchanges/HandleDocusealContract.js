import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  DialogTitle,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
// import { DocusealForm } from "@docuseal/react";import jwt from 'jsonwebtoken';
import { DocusealBuilder, DocusealForm } from "@docuseal/react";
import { apiRouterCall } from "@/api-services/service";
import { api_configs } from "@/api-services";
import toast from "react-hot-toast";
import AppContext from "@/context/AppContext";
// import jwt from "jsonwebtoken";
// var jwt = require("jsonwebtoken");

const MainBox = styled("div")(({ theme }) => ({
  "& .MuiPaper-root-MuiDialog-paper": {
    maxWidth: "550px",
  },
}));

const ReadProfileBox = styled("div")(({ theme }) => ({
  "& .MuiTypography-root-MuiDialogTitle-root": {
    color: "#fff",
    fontFamily: "Sora',sans-serif;",
    texAlign: "center",
    fontSize: "28px",
    paddingBottom: "16px",
    margin: "0px !important",
    padding: "0px !important",
  },
  "& .MuiOutlinedInput": {
    marginTop: "24px",
    height: "142px !important",
    // "& .css-gz0g0y-MuiInputBase-root-MuiOutlinedInput-root": {
    //   borderRadius: "16px !important",
    // },
  },
  "& .displayCenter": {
    "& input": {
      border: "none",
      borderRadius: "10px",
      fontSize: "20px",
      // height: "55px !important",
      width: "55px !important",
      marginRight: "10px",
      color: "#fff !important",
      background: "#FFFFFF0D",
      [theme.breakpoints.down("sm")]: {
        // height: "40px !important",
        width: "40px !important",
        marginRight: "5px",
      },
    },
  },
  "& .closeIcon": {
    position: "absolute",
    top: "0px",
    right: "0px",
  },
  "& .MuiOutlinedInput": {
    marginTop: "24px",
    height: "142px !important",
    // "& .css-gz0g0y-MuiInputBase-root-MuiOutlinedInput-root": {
    //   borderRadius: "16px !important",
    // },
  },
  "& .confirmationDialogBox": {
    "& .titleBox": {
      "& h4": {
        color: "#fff",
        fontFamily: "Sora',sans-serif;",
        texAlign: "center",
        margin: "16px 0px",
      },
    },

    "& h6": {
      color: "#fff",
      fontFamily: "Sora',sans-serif;",
      texAlign: "center",
      marginTop: "10px",
      fontWeight: "400",
    },
    "& p": {
      color: "rgba(0, 0, 0, 0.60)",
      fontFamily: "Gilroy-Light",
      textAlign: "center",
      width: "100%",
      maxWidth: "320px",
      margin: "16px 0px",
    },
  },
  "& .disclaimerBox": {
    background: "rgba(0, 0, 0, 0.08)",
    borderRadius: "10px",
    padding: "10px",
    "& p": {
      color: "rgba(0, 0, 0, 0.60)",
      fontFamily: "Gilroy-Regular",
    },
  },
}));

export default function HandleDocusealContract({
  // isLoading,
  open,
  handleClose,
  email,
  name,
}) {
  const theme = useTheme();
  const { getProfileDataHandler, userData } = useContext(AppContext);
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (e) => {
    console.log(" handle submit", e);

    try {
      setisLoading(true);
      const formData = {
        submission_id: e.submission_id,
      };
      const response = await apiRouterCall({
        method: "POST",
        url: api_configs.createdocusealinfo,
        bodyData: formData,
      });
      if (response.data.responseCode === 200) {
        // toast.success(response.data.responseMessage);
        toast.success("Document uploaded successfully.");
        handleClose();
        setisLoading(false);
        getProfileDataHandler();
      } else {
        setisLoading(false);
        toast.error(response.data.responseMessage);
      }
    } catch (error) {
      setisLoading(false);
      console.error("Error:", error);
    }
  };
  const logoUrl =
    theme.palette.mode === "dark"
      ? process.env.REDIRECT_URI + "/images/logo.svg"
      : process.env.REDIRECT_URI + "/images/light_logo.svg";
  const customCss = `
  .text-2xl {
  color: ${theme.palette.mode === "dark" ? "#FFFFFFCC" : "#191D13CC"};
  }`;

  return (
    <MainBox>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
        keepMounted
      >
        <ReadProfileBox>
          <DialogTitle
            sx={{ m: 0, padding: 0, fontSize: "30px" }}
            id="customized-dialog-title"
          >
            <IconButton
              onClick={() => !userData?.isRejected && handleClose()}
              size="large"
              disabled={isLoading}
              className="closeIconButton"
            >
              <CloseIcon />
            </IconButton>
            DocuSeal Contract Signing
          </DialogTitle>
          <DialogContent>
            <div style={{ textAlign: "center" }}>
              <DocusealForm
                // src={process.env.DOCUSEAL_SRC_URL}
                src={"https://docuseal.eu/d/rtDTuXGnXD6UwF"}
                name={name}
                email={email}
                logo={logoUrl}
                onComplete={handleSubmit}
                onInit={(e) => console.log("Init", e)}
                onLoad={(e) => console.log("Load", e)}
                customCss={customCss}
              />
            </div>
          </DialogContent>
        </ReadProfileBox>
      </Dialog>
    </MainBox>
  );
}
