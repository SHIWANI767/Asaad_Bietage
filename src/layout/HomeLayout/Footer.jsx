import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Container,
  Typography,
  Grid,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import {
  FaFacebookF,
  FaYoutube,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { IoLogoDiscord } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "@/components/Logo";
import SettingsContext from "@/context/SettingsContext";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import { IoLogoFacebook } from "react-icons/io5";
import Image from "next/image";

const MainComponent = styled("div")(({ theme }) => ({
  position: "relative",
  zIndex: "9",
  marginTop: "100px",

  "& .AboutUsBox": {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    gap: "15px",

    "& h6": {
      textDecoration: "none",
      // margin: "0 10px",
      fontSize: "14px",
      fontWeight: "500",
      color: "#454545",
      cursor: "pointer",
      "@media(max-width:599px)": {
        textAlign: "left",
        fontSize: "12px !important",
      },
    },
  },

  "& .socialBox": {
    display: "flex",
    justifyContent: "flex-start",
    gap: "28px",
    marginTop: "30px",
    "@media(max-width:767px)": {
      margin: "auto",

      marginTop: "10px",
      // display: "none",
    },
  },
  "& .iconBox": {
    // margin: "0px 7px",
    color: "#0C111D",
    cursor: "pointer",
    fontSize: "25px",
  },

  "& .baseSection": {
    display: "flex",
    justifyContent: "space-between",
    // alignItems: "center",
    padding: "20px 0px",
    "& a": {
      textDecoration: "none",
      margin: "0 10px",
      fontSize: "14px",
      fontWeight: "400",
      color: theme.palette.text.secondary,
      "@media(max-width:420px)": {
        fontSize: "12px",
        margin: "0 5px",
      },
    },
    "@media(max-width:575px)": {
      display: "block",
      justifyContent: "center",
      textAlign: "center",
    },
  },
  "& .logoBox": {
    maxWidth: "100px",
    // margin: "0 auto",

    "@media(max-width:599px)": {
      display: "flex",
      justifyContent: "center",
      margin: "0 auto",
    },
  },
  "& .logoText": {
    maxWidth: "500px",
    "@media(max-width:767px)": {
      marginTop: "8px !important",
    },
  },
  "& .centerBox": {
    display: "flex",
    flexDirection: "column",
    gap: "17px",
    "@media(max-width:767px)": {
      gap: "10px",
    },
    "& h5": {
      textDecoration: "none",
      // margin: "0 10px",
      fontSize: "16px",
      fontWeight: "500",
      color: "#0C111D",
      cursor: "pointer",
      "@media(max-width:599px)": {
        textAlign: "left",
      },
      "@media(max-width:420px)": {},
    },
  },

  "& .innerfooterBox": {
    background: "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)",

    boxShadow: "10px 10px 0px 0px #FFFFFF1C",

    borderRadius: "40px 40px 0 0",
    padding: "40px",
    "@media(max-width:599px)": {
      padding: "20px",
    },
  },
  "& .disclaimer": {
    fontSize: "12px",
    fontWeight: 400,
    padding: "20px",
    // color: "#919095",
    color: theme.palette.text.secondary,
  },
}));

const Footer = () => {
  const router = useRouter();
  return (
    <MainComponent>
      <Box className="mainfooterBox">
        <Container>
          <Box className="innerfooterBox" mb={0}>
            <Grid container spacing={2} alignItems="flex-start">
              <Grid item lg={7.5} md={6} sm={12} xs={12}>
                <Box className="logofooter">
                  <Image
                    height={44}
                    width={159}
                    quality={100}
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                    alt="Logo footer"
                    src="/images/light_logo.svg"
                  />
                </Box>
                <Typography
                  variant="body2"
                  color="#191D1399"
                  className="logoText"
                  mt={2.5}
                >
                  Your Gateway to have an Enhanced Crypto Trading Experience. To
                  help you make well-informed decisions, Bitedge provides smart
                  trading technologies.
                </Typography>

                <Box className="socialBox" mt={2}>
                  <Link
                    target="_blank"
                    href="https://www.instagram.com/bitedge?"
                  >
                    <Box className="dot">
                      <FaInstagram className="iconBox" />
                    </Box>
                  </Link>
                  <Link target="_blank" href="https://t.me/+G7QBKJlkFStmNDI0">
                    <Box className="dot">
                      <FaTelegramPlane className="iconBox" />
                    </Box>
                  </Link>
                </Box>

                {/* <Link target="_blank" href="https://facebook.com/">
                    <Box className="dot">
                      <IoLogoFacebook className="iconBox" />
                    </Box>
                  </Link> */}
                {/* <Link target="_blank" href="https://www.linkedin.com/">
                    <Box className="dot">
                      <FaLinkedin className="iconBox" />
                    </Box>
                  </Link> */}

                {/* <Link target="_blank" href="https://www.youtube.com/">
                    <Box className="dot">
                      <FaYoutube className="iconBox" />
                    </Box>
                  </Link> */}
                {/* <Link target="_blank" href="https://x.com/fineximbank">
                    <Box className="dot">
                      <FaTwitter className="iconBox" />
                    </Box>
                  </Link> */}

                {/* <Link target="_blank" href="https://www.discord.com/">
                      <Box className="dot">
                        <IoLogoDiscord className="iconBox" />
                      </Box>
                    </Link> */}
              </Grid>
              <Grid item lg={1.5} md={3} sm={6} xs={6} className="centerBox">
                <Typography
                  variant="h5"
                  sx={{
                    pointerEvents: "none",
                  }}
                >
                  Product
                </Typography>

                <Box className="AboutUsBox">
                  <Typography
                    variant="h6"
                    onClick={() => router.push("/features")}
                  >
                    Features
                  </Typography>

                  <Typography
                    variant="h6"
                    onClick={() => router.push("/price")}
                  >
                    Pricing
                  </Typography>
                  <Typography
                    variant="h6"
                    onClick={() => router.push("/exchanges")}
                  >
                    Exchanges
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={1.5} md={3} sm={6} xs={6} className="centerBox">
                <Typography
                  variant="h5"
                  sx={{
                    pointerEvents: "none",
                  }}
                >
                  Company
                </Typography>
                <Box className="AboutUsBox">
                  <Typography
                    variant="h6"
                    onClick={() => router.push("/about-us")}
                  >
                    About us
                  </Typography>

                  {/* <Typography
                    variant="h6"
                    onClick={() => router.push("/about-us")}
                  >
                    Contact us
                  </Typography> */}
                </Box>
              </Grid>

              <Grid item lg={1.5} md={3} sm={6} xs={12} className="centerBox">
                <Typography
                  variant="h5"
                  sx={{
                    pointerEvents: "none",
                  }}
                >
                  {" "}
                  Resources
                </Typography>
                <Box className="AboutUsBox">
                  <Typography
                    variant="h6"
                    onClick={() => router.push("/privacy-policy")}
                  >
                    Privacy policy
                  </Typography>
                  <Typography
                    variant="h6"
                    onClick={() => router.push("/terms-and-conditions")}
                  >
                    Terms of service
                  </Typography>
                  <Typography
                    variant="h6"
                    onClick={() => router.push("/risk-disclosure")}
                  >
                    Risk disclosure
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          {/* <Divider />
            <Box>
              <Typography align="center" className="disclaimer">
                © 2024 FINEXIM Bank All rights reserved
              </Typography>
            </Box> */}
        </Container>
      </Box>
    </MainComponent>
  );
};

export default Footer;
