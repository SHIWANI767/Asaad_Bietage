import {
  Autocomplete,
  Box,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api_configs } from "@/api-services";

// Styled Box component
const CombinedProfitBox = styled(Box)(({ theme }) => ({
  "& .combinedProfitsCardBox": {
    height: "100%",
    background: theme.palette.background.taskBg,
    borderRadius: "5px",
    border: "1px solid #80808017",
    "& .headingBox": {
      background: "linear-gradient(90.73deg, #86E591 2.09%, #B9F65B 34.92%)",
      borderRadius: "5px 5px 0px 0px",
      padding: "10px",
      marginBottom: "8px",
      "& p": {
        color: "rgba(0, 0, 0, 1)",
        fontWeight: "500",
      },
    },
    "& .contentBox": {
      "& h5": {
        marginTop: "16px",
      },
      "& h6": {
        color: theme.palette.text.green,
      },
    },
  },
}));

const TopCryptoAssetBox = styled(Box)(({ theme }) => ({
  "& .topCryptoAsset": {
    borderRadius: "5px",
    "& .headingBox": {
      background: "linear-gradient(90.73deg, #86E591 2.09%, #B9F65B 34.92%)",
      borderRadius: "5px 5px 0px 0px",
      padding: "10px",
      marginBottom: "8px",
      "& h5": {
        fontWeight: 300,
        fontSize: "18px",
      },
      "& p": {
        color: "rgba(0, 0, 0, 1)",
        fontWeight: "500",
      },
    },
    "& .contentBox": {
      "& h5": {
        marginTop: "16px",
      },
      "& h6": {
        color: theme.palette.text.green,
      },
    },
    "& .MuiAutocomplete-endAdornment": {
      position: "absolute",
      top: "calc(30% - 14px)",
    },
    "& .MuiAutocomplete-root .MuiAutocomplete-inputRoot .MuiAutocomplete-input":
      {
        minWidth: "52px",
      },
    "& .paperContainer": {
      height: "100%",
      [theme.breakpoints.down("md")]: {
        height: "auto",
      },
      "& h5": {
        fontWeight: 500,
        lineHeight: "25px",
        fontSize: "15px",
      },
    },
  },
}));

export default function TopCryptoAsset() {
  const [cryptoData, setCryptoData] = useState({});
  const token = window.localStorage.getItem("user_token");

  const HandleCryptoAssest = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: api_configs.cryptoAssetprofit,
        headers: {
          token: token,
        },
        params: {
          hour: 720,
        },
      });

      if (response) {
        setCryptoData(response.data.result);
      }
    } catch (error) {
      console.log(" error ", error);
    }
  };

  useEffect(() => {
    HandleCryptoAssest();
  }, []);

  return (
    <TopCryptoAssetBox>
      <Box className="topCryptoAsset">
        <Paper elevation={2} className="paperContainer">
          <Box
            mb={1}
            className="displaySpacebetween combinedBox responsiveManage"
          >
            <Box className="displayStart" gab={1}>
              <Typography variant="h5">Top Performing Cryptohvmh</Typography>{" "}
              &nbsp;
              <Typography variant="overline">(QuantumLoop)</Typography>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={4} sm={4} md={4}>
              <TopCryptoCard
                day={"30"}
                cryptoData={cryptoData}
                capital={
                  cryptoData?.topPerformingCrypto30?.profit
                    ? parseFloat(
                        cryptoData?.topPerformingCrypto30.profit
                      ).toFixed(2)
                    : 0
                }
                currency={
                  cryptoData?.topPerformingCrypto30?.crypto
                    ? cryptoData?.topPerformingCrypto30.crypto
                    : "N/A"
                }
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <TopCryptoCard
                day={"60"}
                cryptoData={cryptoData}
                capital={
                  cryptoData?.topPerformingCrypto60?.profit
                    ? parseFloat(
                        cryptoData?.topPerformingCrypto60.profit
                      ).toFixed(2)
                    : 0
                }
                currency={
                  cryptoData?.topPerformingCrypto60?.crypto
                    ? cryptoData?.topPerformingCrypto60.crypto
                    : "N/A"
                }
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <TopCryptoCard
                day={"90"}
                cryptoData={cryptoData}
                capital={
                  cryptoData?.topPerformingCrypto90?.profit
                    ? parseFloat(
                        cryptoData?.topPerformingCrypto90.profit
                      ).toFixed(2)
                    : 0
                }
                currency={
                  cryptoData?.topPerformingCrypto90?.crypto
                    ? cryptoData?.topPerformingCrypto90.crypto
                    : "N/A"
                }
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </TopCryptoAssetBox>
  );
}

function TopCryptoCard({ day, capital, currency }) {
  return (
    <CombinedProfitBox>
      <Box className="combinedProfitsCardBox">
        <Box className="headingBox displayCenter">
          <Typography variant="body2">{day} Days</Typography>
        </Box>
        <Box className="contentBox displayColumn">
          <Box className="displayStart" mt={2}>
            <Typography variant="body2">{capital}</Typography>
          </Box>
          <Typography variant="h6" mt={1}>
            {currency}
          </Typography>
          <Typography variant="overline" mt={0.2}>
            (USDT)
          </Typography>
        </Box>
      </Box>
    </CombinedProfitBox>
  );
}
