import { Box, Button, Grid, Paper, styled, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { CgArrowTopRightO } from "react-icons/cg";
import { useRouter } from "next/router";
import SettingsContext from "@/context/SettingsContext";
import Popup from "@/components/DynamicModel";
const FeaturesSimpleStyleBox = styled(Box)(({ theme }) => ({
  marginBottom: "80px",

  [theme.breakpoints.down("sm")]: {
    marginBottom: "70px",
  },

  "& img": {
    borderRadius: "100px",
  },

  "& ul": {
    marginLeft: "-22px",
  },
  "& .featuresworkcradBox": {
    padding: "20px",
    minHeight: "205px",
    cursor: "pointer",

    transition: "box-shadow 0.9s ease, transform 0.5s ease", // Adding box-shadow and transform animations
    "&:hover": {
      background: "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)",
      transform: "scale(1.05)", // Slightly scaling the element on hover
      "& h6": {
        color: "rgba(25, 29, 19, 1)",
      },
      "& p": {
        color: "rgba(25, 29, 19, 0.8)",
      },
    },

    "@media(max-width:1024px)": {
      minHeight: "170px",
    },
  },
  "& h6": {
    fontSize: "16px",
    fontWeight: "700",
  },
}));

export default function TutorialCard() {
  const themeSetting = useContext(SettingsContext);
  const router = useRouter();
  const [isBinance, setIsBinance] = useState(false);
  const handelBanance = () => {
    try {
      setIsBinance(false);
      auth.handelBanance("Logout successfuly");
    } catch (error) {
      console.log("err", error);
    }
  };

  const [isMexc, setIsisMexc] = useState(false);
  const handlelMexc = () => {
    try {
      setIsisMexc(false);
      auth.handlelMexc("Logout successfuly");
    } catch (error) {
      console.log("err", error);
    }
  };

  const [isKraken, setIsisKraken] = useState(false);
  const handlelKraken = () => {
    try {
      setIsisKraken(false);
      auth.handlelKraken("Logout successfuly");
    } catch (error) {
      console.log("err", error);
    }
  };

  const [isBitmart, setIsBitmart] = useState(false);
  const handlelBitmart = () => {
    try {
      setIsBitmart(false);
      auth.handlelBitmart("Logout successfuly");
    } catch (error) {
      console.log("err", error);
    }
  };

  const [isCoinbase, setIsCoinbase] = useState(false);
  const handlelCoinbase = () => {
    try {
      setIsCoinbase(false);
      auth.handlelCoinbase("Logout successfuly");
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <>
      <FeaturesSimpleStyleBox>
        <Grid container spacing={3} alignItems="center">
          {/* {workData.map((item) => ( */}
          <Grid item lg={4} sm={6} md={4} xs={12}>
            <>
              <Paper
                elevation={1}
                className="featuresworkcradBox"
                onClick={() => setIsBinance(true)}
              >
                <Box align="center">
                  <img
                    // src={item.imgIccon}
                    src="/images/binance.png"
                    alt="Image"
                    width="81px"
                    height="81px"
                  />
                  <Typography variant="h6" color="primary" mt={1.4}>
                    {/* {item.name} */}
                    How to connect Binance with Bitedge.app?
                  </Typography>

                  <Typography variant="body2" color="secondary" mt={1.4}>
                    {/* {item.description} */}
                    Learn how to generate an API key, whitelist an IP address in
                    Binance, and connect it with Bitedge.app in just a few
                    simple steps.
                  </Typography>
                </Box>
              </Paper>
            </>
          </Grid>

          <Grid item lg={4} sm={6} md={4} xs={12}>
            <>
              <Paper
                elevation={1}
                className="featuresworkcradBox"
                onClick={() => setIsBitmart(true)}
              >
                <Box align="center">
                  <img
                    // src={item.imgIccon}
                    src="/images/Bitmart_Logo.png"
                    alt="Image"
                    width="81px"
                    height="81px"
                  />
                  <Typography variant="h6" color="primary" mt={1.4}>
                    {/* {item.name} */}
                    How to connect Bitmart with Bitedge.app?
                  </Typography>

                  <Typography variant="body2" color="secondary" mt={1.4}>
                    {/* {item.description} */}
                    Learn how to generate an API key, whitelist an IP address in
                    Bitmart, and connect it with Bitedge.app in just a few
                    simple steps.
                  </Typography>
                </Box>
              </Paper>
            </>
          </Grid>

          <Grid item lg={4} sm={6} md={4} xs={12}>
            <>
              <Paper
                elevation={1}
                className="featuresworkcradBox"
                onClick={() => setIsisMexc(true)}
              >
                <Box align="center">
                  <img
                    // src={item.imgIccon}
                    src="/images/bitmart_icon.png"
                    alt="Image"
                    width="81px"
                    height="81px"
                  />
                  <Typography variant="h6" color="primary" mt={1.4}>
                    {/* {item.name} */}
                    How to connect MEXC with Bitedge.app?
                  </Typography>

                  <Typography variant="body2" color="secondary" mt={1.4}>
                    {/* {item.description} */}
                    Learn how to generate an API key, whitelist an IP address in
                    MEXC, and connect it with Bitedge.app in just a few simple
                    steps.
                  </Typography>
                </Box>
              </Paper>
            </>
          </Grid>

          <Grid item lg={4} sm={6} md={4} xs={12}>
            <>
              <Paper
                elevation={1}
                className="featuresworkcradBox"
                onClick={() => setIsisKraken(true)}
              >
                <Box align="center">
                  <img
                    // src={item.imgIccon}
                    src="/images/karaken.png"
                    alt="Image"
                    width="81px"
                    height="81px"
                  />
                  <Typography variant="h6" color="primary" mt={1.4}>
                    {/* {item.name} */}
                    How to connect Kraken with Bitedge.app?
                  </Typography>

                  <Typography variant="body2" color="secondary" mt={1.4}>
                    {/* {item.description} */}
                    Learn how to generate an API key, whitelist an IP address in
                    Kraken, and connect it with Bitedge.app in just a few simple
                    steps.
                  </Typography>
                </Box>
              </Paper>
            </>
          </Grid>

          <Grid item lg={4} sm={6} md={4} xs={12}>
            <>
              <Paper
                elevation={1}
                className="featuresworkcradBox"
                onClick={() => setIsCoinbase(true)}
              >
                <Box align="center">
                  <img
                    // src={item.imgIccon}
                    src="/images/coinbase-v2.svg"
                    alt="Image"
                    width="81px"
                    height="81px"
                  />
                  <Typography variant="h6" color="primary" mt={1.4}>
                    {/* {item.name} */}
                    How to connect Coinbase with Bitedge.app?
                  </Typography>

                  <Typography variant="body2" color="secondary" mt={1.4}>
                    {/* {item.description} */}
                    Learn how to generate an API key, whitelist an IP address in
                    Coinbase, and connect it with Bitedge in just a few simple
                    steps.
                  </Typography>
                </Box>
              </Paper>
            </>
          </Grid>
          {/* ))} */}
        </Grid>

        {/* //Binance & Whitelisting IP address// */}
        <Popup
          maxWidth="sm"
          open={isBinance}
          handleClose={() => setIsBinance(false)}
          title="Creating a New API Key in Binance & Whitelisting IP address"
          actions={[
            {
              label: "Cancel",
              onClick: () => setIsBinance(false),
              color: "secondary",
              variant: "contained",
            },
            {
              label: "Confirm",
              onClick: handelBanance,
              color: "primary",
              variant: "contained",
            },
          ]}
        >
          <Box align="left">
            <ul>
              <li>
                <Typography variant="body2" mb={1} color="secondary">
                  How to create API keys in Binance.
                </Typography>
                <li>
                  {" "}
                  <Typography variant="body2" mb={1} color="primary">
                    Creating a New API Key in Binance & Whitelisting IP address
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" mb={2} color="primary">
                    Log in to your Binance account and go to the "API
                    Management"
                    {""}
                    page.
                  </Typography>
                </li>
              </li>
            </ul>

            <img
              src="/images/Modal/binance.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />
            <ul>
              <li>
                <Typography variant="body2" mb={2} mt={2} color="primary">
                  Click on <strong>"Create API" </strong>
                  {""}
                  page.
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />
            <ul>
              <li>
                <Typography variant="body2" mb={2} mt={2} color="primary">
                  A pop-up screen will appear
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_1.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />
            <ul>
              <li>
                {" "}
                <Typography variant="body2" mt={2} color="secondary">
                  Binance allows you to create two different types of APIs.
                </Typography>
              </li>
              <li>
                {" "}
                <Typography variant="body2" color="primary">
                  Click on "System generated."
                </Typography>
              </li>
              <li>
                <Typography variant="body2" mb={2} color="primary">
                  Enter a label for the API key. Example "Bitedge"
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_2.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />
            <ul>
              <li>
                <Typography variant="body2" mt={2} color="secondary">
                  Go through relevant "Security verification requirements."
                </Typography>
              </li>
              <li>
                <Typography variant="body2" mb={2} color="primary">
                  Select the required API restrictions (this may vary depending
                  on your country)
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_3.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />
            <ul>
              <li>
                {" "}
                <Typography variant="body2" mt={2} color="secondary">
                  Select "Restrict access to trusted IPs only (Recommended)
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="primary">
                  Enter the IP addresses one at a time; 13.42.214.167
                </Typography>
              </li>
              <li>
                {" "}
                <Typography variant="body2" color="primary">
                  <strong>18.130.209.222 13.43.178.122</strong>
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="primary" mb={2}>
                  Click
                  <strong> "Confirm" </strong>after entering each IP address
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_4.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />
            <ul>
              <li>
                <Typography variant="body2" color="primary" mt={2}>
                  IMPORTANT NOTE: Ensure that you have copied the API & Secret
                  key and kept in a safe place. As the "secret key" will not be
                  generated again. You will also need to enter these keys in
                  your Bitedge account.
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="primary">
                  Connect Binance to Bitedge
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="primary">
                  Login to your "Bitedge Account".
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="primary" mb={2}>
                  From the left-hand side menu, select "Exchanges"
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_5.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />
            <ul>
              <li>
                <Typography variant="body2" color="primary" mt={2}>
                  From the drop-down menu, select "Binance."
                </Typography>
              </li>
              <li>
                {" "}
                <Typography variant="body2" color="primary">
                  Here, you will now enter the API & Secret Key that you saved
                  from within your Binance account.
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="primary" mb={2}>
                  Once you have accepted the terms and pressed submit, you will
                  be able to see your connected Exchanges under the "Recent"
                  tab.
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_6.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />
          </Box>
        </Popup>

        {/* //Bitmart with Bitedge.app// */}
        <Popup
          maxWidth="sm"
          open={isBitmart}
          handleClose={() => setIsBitmart(false)}
          title="Creating a New API Key in BitMart & Whitelisting IP address"
          actions={[
            {
              label: "Cancel",
              onClick: () => setIsBitmart(false),
              color: "secondary",
              variant: "contained",
            },
            {
              label: "Confirm",
              onClick: handlelBitmart,
              color: "primary",
              variant: "contained",
            },
          ]}
        >
          <Box
            align="left"
            sx={{
              p: 2,
            }}
          >
            <Typography variant="body2" mb={2} color="secondary">
              How to create API keys in BitMart.
            </Typography>
            <ul>
              <li>
                <Typography variant="body2" color="secondary">
                  Creating a New API Key in BitMart & Whitelisting IP address
                </Typography>
              </li>
              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  Log in to your BitMart account and go to the "API Management"
                  page.
                </Typography>
              </li>
            </ul>
            <img
              src="/images/Modal/api_23.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />
            <ul>
              <li>
                <Typography variant="body2" color="secondary">
                  Enter a label for the API key. Example "Bitedge"
                </Typography>
              </li>
              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  Select the required API restrictions (this may vary depending
                  on your country)
                </Typography>
              </li>

              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  Enter the IP addresses (separated by comma)
                  13.42.214.167,18.130.209.222,13.43.178.122
                </Typography>
              </li>

              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  Click “Submit” after entering IP addresses.
                </Typography>
              </li>
            </ul>
            <img
              src="/images/Modal/api_24.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />
            <ul>
              <li>
                <Typography variant="body2" color="secondary">
                  Follow the Verification steps below:
                </Typography>
              </li>
              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  Email Code: Click “Send” to receive a verification code via
                  email. Enter the received code into the designated box.
                </Typography>
              </li>

              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  Google Code: Open your Authenticator app and enter the code
                  displayed there into the designated box.
                </Typography>
              </li>

              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  Click “Submit” after entering codes.
                </Typography>
              </li>
            </ul>
            <img
              src="/images/Modal/api_25.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />
            <ul>
              <li>
                <Typography variant="body2" color="primary">
                  IMPORTANT NOTE: Ensure that you have copied the API & Secret
                  key and kept in a safe place. As the "secret key" will not be
                  generated again. You will also need to enter these keys in
                  your Bitedge account.
                </Typography>
              </li>
              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  Click “Confirm”
                </Typography>
              </li>
            </ul>
            <img
              src="/images/Modal/api_26.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%", marginTop: "10px" }}
            />
            <Typography variant="body2" color="primary">
              Connect BitMart to Bitedge
            </Typography>{" "}
            <ul>
              <li>
                <Typography variant="body2" color="primary">
                  Login to your "Bitedge Account".
                </Typography>
              </li>
              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  From the left-hand side menu, select "Exchanges"
                </Typography>
              </li>
              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  From the drop-down menu, select "BitMart”
                </Typography>
              </li>
            </ul>
            <img
              src="/images/Modal/api_27.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%", marginTop: "10px" }}
            />
            <ul>
              <li>
                <Typography variant="body2" color="primary">
                  Enter the API & Secret Key that you saved from within your
                  BitMart account.
                </Typography>
              </li>
              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  Enter API Memo as entered in your BitMart Account for example
                  “Bitedge” (This is case sensitive)
                </Typography>
              </li>
              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  Click “Submit”
                </Typography>
              </li>
            </ul>
            <img
              src="/images/Modal/api_28.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%", marginTop: "10px" }}
            />
            <ul>
              <li>
                <Typography variant="body2" color="primary">
                  You will be able to see your connected Exchanges under the
                  "Recent" tab.
                </Typography>
              </li>
            </ul>
            <img
              src="/images/Modal/api_29.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%", marginTop: "10px" }}
            />
          </Box>
        </Popup>
        {/* //Mexc & Whitelisting IP address// */}
        <Popup
          maxWidth="sm"
          open={isMexc}
          handleClose={() => setIsisMexc(false)}
          title="Creating a New API Key in Mexc & Whitelisting IP address
"
          actions={[
            {
              label: "Cancel",
              onClick: () => setIsisMexc(false),
              color: "secondary",
              variant: "contained",
            },
            {
              label: "Confirm",
              onClick: handlelMexc,
              color: "primary",
              variant: "contained",
            },
          ]}
        >
          <Box
            align="left"
            sx={{
              p: 2,
            }}
          >
            <Typography variant="body2" mb={2} color="secondary">
              Creating a New API Key in Mexc & Whitelisting IP address 1. Login
              to your Mexc account and go to the "API Management" page in your
              profile section
            </Typography>

            <img
              src="/images/Modal/api_7.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />
            <ul>
              <li>
                <Typography variant="body2" color="secondary">
                  In "Manage API/Create new API key" select the access options
                  to be granted, as shown in the screenshot below.
                </Typography>
              </li>
              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  Enter "Bitedge" in the Notes section.
                </Typography>
              </li>
            </ul>

            <ul>
              <li>
                <Typography variant="body2" color="secondary">
                  In "Manage API/Create new API key" select the access options
                  to be granted, as shown in the screenshot below.
                </Typography>
              </li>
              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  Enter "Bitedge" in the Notes section.
                </Typography>
              </li>

              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  Enter the three IP addresses, separating each with a comma (,)
                  as per requirements (shown under "Tips section") 13.42.214.167
                  18.130.209.222 13.43.178.122
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_8.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />

            <ul>
              <li>
                <Typography variant="body2" color="secondary">
                  Read through and agree to the "Risk Reminders for API Users"
                </Typography>
              </li>
              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  Go through relevant "Security verification requirements."
                </Typography>
              </li>

              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  Ensure that you have copied the API & Secret key and kept it
                  in a safe place. As the Secret key will not be shown again.
                  (You will need to enter these in your Bitedge account)
                </Typography>
              </li>

              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  Create the trading pairs once the API key is created by
                  clicking "Change" under Trading Pairs.
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_9.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />

            <img
              src="/images/Modal/api_10.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%", marginTop: "10px" }}
            />

            <Typography variant="body2" color="secondary" mt={1}>
              Below are the pairs to be added: BAL/USDT, TRX/BTC, DOT/BTC,
              DASH/BTC, BAL/ETH, ADA/BTC, NEO/BTC, SOL/BTC, CRV/ETH, NEO/USDT,
              HBAR/USDT, ETH/BTC.
            </Typography>

            <ul>
              <li>
                <Typography variant="body2" color="primary">
                  Connect Mexc to Bitedge
                </Typography>
              </li>
              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  Login to your "Bitedge Account".
                </Typography>
              </li>

              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  From the left-hand side menu, select "Exchanges"
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_11.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%", marginTop: "10px" }}
            />

            <ul>
              <li>
                <Typography variant="body2" color="primary">
                  From the drop-down menu, select "Mexc."
                </Typography>
              </li>
              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  Here, you will now enter the API & Secret Keys that you saved
                  from within your Mexc account.
                </Typography>
              </li>

              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  Once you have accepted the terms and pressed submit, you will
                  be able to see your connected Exchanges under the "Recent"
                  tab.
                </Typography>
              </li>
            </ul>
            <img
              src="/images/Modal/api_12.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%", marginTop: "10px" }}
            />
          </Box>
        </Popup>

        {/* //Kraken with Bitedge.app// */}
        <Popup
          maxWidth="sm"
          open={isKraken}
          handleClose={() => setIsisKraken(false)}
          title="Creating a New API Key in Kraken & Whitelisting IP address
"
          actions={[
            {
              label: "Cancel",
              onClick: () => setIsisKraken(false),
              color: "secondary",
              variant: "contained",
            },
            {
              label: "Confirm",
              onClick: handlelKraken,
              color: "primary",
              variant: "contained",
            },
          ]}
        >
          <Box align="left">
            <ul>
              <li>
                <Typography variant="body2" color="secondary">
                  Login to your Kraken account.
                </Typography>
              </li>
              <li>
                <Typography variant="body2" mb={2} color="secondary">
                  From the "App switcher" (on top right hand corner) select
                  "Kraken Pro"
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_13.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />
            <ul>
              <li>
                <Typography variant="body2" color="secondary">
                  Once in Kraken Pro, select Profile Settings.
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_14.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />

            <ul>
              <li>
                <Typography variant="body2" color="secondary">
                  Select "API."
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_15.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />
            <ul>
              <li>
                <Typography variant="body2" color="secondary">
                  Select "Create API"
                </Typography>
              </li>
            </ul>
            <img
              src="/images/Modal/api_16.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />

            <ul>
              <li>
                <Typography variant="body2" color="primary">
                  A Pop-up window will appear
                </Typography>
              </li>
              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  Type "Bitedge" in the Name section
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_17.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%", marginTop: "10px" }}
            />

            <ul>
              <li>
                <Typography variant="body2" color="primary">
                  Select all the permissions under "Funds Permission" & "Orders
                  and trades."
                </Typography>
              </li>
            </ul>
            <img
              src="/images/Modal/api_18.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%", marginTop: "10px" }}
            />

            <ul>
              <li>
                <Typography variant="body2" color="primary">
                  Turn on IP address restriction, Enter the three IP addresses,
                  separating each with a comma (,) as per requirements
                  13.42.214.167 18.130.209.222 13.43.178.122
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_19.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%", marginTop: "10px" }}
            />

            <ul>
              <li>
                <Typography variant="body2" color="primary">
                  Click on "Generate key" and then verify identity following the
                  Kraken procedure.
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_20.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%", marginTop: "10px" }}
            />

            <ul>
              <li>
                <Typography variant="body2" color="primary">
                  Ensure that you have copied the API & Secret key and kept in a
                  safe place. As the safe key will not be generated again. (You
                  will need to enter these in your Bitedge account)
                </Typography>
              </li>

              <li>
                <Typography variant="body2" color="primary">
                  Connect Kraken to Bitedge
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="primary">
                  Login to your "Bitedge Account".
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="primary">
                  From the left-hand side menu, select "Exchanges"
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_21.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%", marginTop: "10px" }}
            />

            <ul>
              <li>
                <Typography variant="body2" color="primary">
                  From the drop-down menu, select "Kraken."
                </Typography>
              </li>

              <li>
                <Typography variant="body2" color="primary">
                  Here you will now enter the API & Secret Keys that you saved
                  from within your Kraken account.
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="primary">
                  Once you have accepted the terms and pressed submit, you will
                  be able to see your connected exchanges under the "Recent"
                  tab.
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_22.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%", marginTop: "10px" }}
            />
          </Box>
        </Popup>

        {/* //Coinbase with Bitedge.app// */}
        <Popup
          maxWidth="sm"
          open={isCoinbase}
          handleClose={() => setIsCoinbase(false)}
          title="Creating a New API Key in Coinbase & Whitelisting IP address"
          actions={[
            {
              label: "Cancel",
              onClick: () => setIsCoinbase(false),
              color: "secondary",
              variant: "contained",
            },
            {
              label: "Confirm",
              onClick: handlelCoinbase,
              color: "primary",
              variant: "contained",
            },
          ]}
        >
          <Box align="left">
            <ul>
              <li>
                <Typography variant="body2" color="secondary">
                  How to create API keys in Coinbase.
                </Typography>
              </li>
              <li>
                <Typography variant="body2" mb={2} color="secondary">
                  Creating a New API Key in Coinbase & Whitelisting IP address
                </Typography>
              </li>

              <li>
                <Typography variant="body2" mb={2} color="secondary">
                  Log in to your Coinbase account and select “Settings” in your
                  profile section.
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_30.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />
            <ul>
              <li>
                <Typography variant="body2" color="secondary">
                  Select “API” to access the " API Key management" page
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_31.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />

            <ul>
              <li>
                <Typography variant="body2" color="secondary">
                  Select “Create API Key” and enter “Bitedge” in API key
                  nickname
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="secondary">
                  Select the required API restrictions (this may vary depending
                  on your country)
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="secondary">
                  .Enter the IP addresses (separated by comma)
                  13.42.214.167,18.130.209.222,13.43.178.122
                </Typography>
              </li>

              <li>
                <Typography variant="body2" color="secondary">
                  Click “Create & download” after entering IP addresses
                </Typography>
              </li>

              <li>
                <Typography variant="body2" color="secondary">
                  Complete the Verification process to ensure security.
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_32.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />
            <ul>
              <li>
                <Typography variant="body2" color="secondary">
                  IMPORTANT NOTE: Ensure that you have copied the API & Secret
                  key and kept in a safe place. As the "secret key" will not be
                  generated again. You will also need to enter these keys in
                  your Bitedge account.
                </Typography>
              </li>
              <li>Click “I’ve saved my key” to confirm.</li>
            </ul>
            <img
              src="/images/Modal/api_33.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%" }}
            />

            <Typography variant="body2" color="primary">
              Connect Coinbase to Bitedge
            </Typography>

            <ul>
              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  Login to your "Bitedge Account"
                </Typography>
              </li>

              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  From the left-hand side menu, select "Exchanges"
                </Typography>
              </li>

              <li>
                {" "}
                <Typography variant="body2" color="secondary">
                  From the drop-down menu, select "Coinbase”
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_34.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%", marginTop: "10px" }}
            />

            <ul>
              <li>
                <Typography variant="body2" color="primary">
                  Enter the API & Secret Key that you saved from within your
                  Coinbase account.
                </Typography>
              </li>

              <li>
                <Typography variant="body2" color="primary">
                  Click “Submit”
                </Typography>
              </li>
            </ul>
            <img
              src="/images/Modal/api_35.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%", marginTop: "10px" }}
            />

            <ul>
              <li>
                <Typography variant="body2" color="primary">
                  You will be able to see your connected Exchanges under the
                  "Recent" tab.
                </Typography>
              </li>
            </ul>

            <img
              src="/images/Modal/api_36.png"
              alt="Image"
              style={{ width: "auto", maxWidth: "100%", marginTop: "10px" }}
            />
          </Box>
        </Popup>
      </FeaturesSimpleStyleBox>
    </>
  );
}
