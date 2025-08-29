"use client";
import React, { useContext, useState, useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Box,
  Button,
  FormHelperText,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import DashboardLayout from "../../../layout/DashboardLayout/index";
import { ExpandMore } from "@mui/icons-material";
import TriangularCard from "./TriangularCard";
import FilterModal from "@/components/FilterModal";
import AppContext from "@/context/AppContext";
import axios from "axios";
import { api_configs, baseurlSocket } from "@/api-services";
import NoDataFoundFrame from "@/components/NoDataFoundFrame";
import CustomHead from "@/components/CustomHead";
import DataLoader from "@/components/DataLoader";
import toast from "react-hot-toast";
import { handleNegativeValue, maxCapitalsLimit } from "@/utils";

const ExchangeContainer = styled("div")(({ theme }) => ({
  position: "relative",
  zIndex: "999",
  "& .MuiSvgIcon-root.MuiSelect-icon ": {
    color: theme.palette.text.primary,
  },

  "& .auafilterBox": {
    background: theme.palette.background.primary,
  },
  "& .invitebutton": {
    marginRight: "0px",
    padding: "0px",
    fontWeight: "400",
    fontSize: "14px",
    zIndex: "999",
    borderRadius: "10px !important",
    cursor: "pointer",
  },
  "& .boxControl": {
    // backgroundColor: "rgba(255, 255, 255, 0.04)",
    padding: "14px 10px",
    marginTop: "40px",
    marginBottom: "40px",
    borderRadius: "10px",
  },
  "& .textfieldBox": {
    cursor: "pointer",
    "& .MuiInputBase-root.MuiOutlinedInput-root": {
      borderRadius: "10px",
      height: "47px",
      padding: "7px 10px 7px 0px",
    },
    "& .MuiFormControl-root.MuiTextField-root": {
      width: "100%",
      maxWidth: "470px",
    },
  },
  "& .autocompleBox": {
    marginRight: "8px",
  },
}));
const DisplayStart = styled("div")({
  display: "flex",
  alignItems: "center",
});

export default function Triangular() {
  const token = window.localStorage.getItem("user_token");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const auth = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [triangularArbitrageData, setTriangularArbitrageData] = useState([]);
  const [isSocLoading, setIsSocLoading] = useState(true);
  const [filterData, setFilterData] = useState({
    fromExchange: [],
    toExchange: [],
    startToken: [],
    depth: 3,
  });
  const [amountCapital, setAmountCapital] = useState("");
  const [isSubmit, setisSubmit] = useState(false);
  const [filterStatus, setFilterStatus] = React.useState(false);

  const getUpdateCapitalAmount = async () => {
    setisSubmit(true);
    if (amountCapital < 50 || amountCapital > maxCapitalsLimit) {
      setisSubmit(false);
      return;
    }
    try {
      const dataToSend = {
        type: "TRIANGULAR",
        amount: amountCapital.toString() ? amountCapital.toString() : "0",
      };
      setIsLoading(true);
      const response = await axios({
        method: "POST",
        url: api_configs.updateCapitalAmount,
        headers: {
          token: token,
        },
        data: dataToSend,
      });
      if (response.data.responseCode == 200) {
        toast.success(" Capital amount updated successfully.");
        auth.getProfileDataHandler(token);
        getCapitalAmount();
        setFilterStatus(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if (error.response) {
        toast.success(error.response.data.responseMessage);
      } else {
        toast.success(error.message);
      }
    }
  };

  const getCapitalAmount = async () => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: "GET",
        url: api_configs.getCapitalAmount,
        headers: {
          token: token,
        },
      });
      if (response.data.responseCode == 200) {
        setAmountCapital(response.data?.result?.triangular);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCapitalAmount();
  }, []);

  useEffect(() => {
    setIsSocLoading(true);
    setTriangularArbitrageData([]);
    const web = new WebSocket(baseurlSocket);
    const accessToken = token;
    if (accessToken) {
      try {
        web.onopen = () => {
          const dataToSend = {
            token: accessToken,
            options: "triangularProfitpath",
            uid:
              filterData.fromExchange.length !== 0
                ? filterData.fromExchange
                : null,
            coins:
              filterData.startToken.length !== 0 ? filterData.startToken : null,
            depth: filterData.depth !== 0 ? filterData.depth : null,
          };

          web.send(JSON.stringify(dataToSend));
          web.onmessage = async (event) => {
            if (event.data !== "[object Promise]" && event.data !== "null") {
              let obj = JSON.parse(event.data);

              if (obj.responseCode === 200) {
                setTriangularArbitrageData(obj.responseResult);
                setIsSocLoading(false);
              } else {
                setTriangularArbitrageData([]);
                setIsSocLoading(false);
              }
            }
          };
        };
        return () => {
          web.close();
        };
      } catch (err) {
        setIsSocLoading(false);
      }
    }
  }, [token, filterStatus]);

  useEffect(() => {
    if (auth?.topHeading) {
      auth?.setTopHeading("Quantum Loop");
    }
  }, []);

  return (
    <ExchangeContainer>
      <CustomHead
        title="QuantumLoop | Bitedge"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Box className="displayEnd" style={{ flexWrap: "wrap", gap: "10px" }}>
        <Box
          className="displayStart"
          style={{ gap: "10px", alignItems: "flex-start" }}
        >
          <Box className="textfieldBox">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter the amount to be invested."
              value={amountCapital}
              type="number"
              onKeyPress={(event) => {
                if (
                  event?.key === "-" ||
                  event?.key === "+" ||
                  event?.key === "*" ||
                  event?.key === "/"
                ) {
                  event.preventDefault();
                }
              }}
              onKeyDown={(event) => handleNegativeValue(event)}
              onChange={(e) => setAmountCapital(e.target.value)}
              error={isSubmit && amountCapital == ""}
              inputProps={{
                maxLength: maxCapitalsLimit.toString().length,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <span
                      variant="contained"
                      color="primary"
                      className="invitebutton gradient-text"
                      // disabled={amountCapital === ""}
                      sx={{
                        pointerEvents: amountCapital === "" ? "none" : "",
                      }}
                      onClick={getUpdateCapitalAmount}
                    >
                      Let's Go
                    </span>
                  </InputAdornment>
                ),
              }}
            />{" "}
            <FormHelperText error>
              {!isSocLoading &&
              isSubmit &&
              (amountCapital == Number?.MAX_VALUE || amountCapital === "")
                ? "Amount is required."
                : !isSocLoading && amountCapital < Number(50)
                ? "Amount should be greater than 50."
                : !isSocLoading && amountCapital > Number(maxCapitalsLimit)
                ? "The amount should reach its maximum limit!"
                : ""}
            </FormHelperText>
          </Box>

          <Paper
            elevation={2}
            className="displayCenter textfieldBox"
            // className="auafilterBox"
            style={{
              padding: "6px 16px",
              gap: "10px",
              height: "32px",
              borderRadius: "12px",
            }}
            onClick={handleOpen}
          >
            <Typography variant="body2" color="secondary">
              Filter
            </Typography>
            <img src="/images/filter.svg" alt="Image" />
          </Paper>
        </Box>
      </Box>

      <Grid container spacing={2} mt={1}>
        {!isSocLoading &&
          triangularArbitrageData &&
          triangularArbitrageData.map((data, index) => (
            <Grid item lg={4} md={4} sm={6} xs={12} align="center" key={index}>
              <TriangularCard value={data} type="volume" />
            </Grid>
          ))}
        {!isSocLoading &&
          triangularArbitrageData &&
          triangularArbitrageData.length === 0 && (
            <Box
              display="flex"
              alignItems={"center"}
              justifyContent="center"
              width="100%"
            >
              <NoDataFoundFrame data="Not showing profit paths" />
            </Box>
          )}
        {isSocLoading && (
          <Box
            display="flex"
            alignItems={"center"}
            justifyContent="center"
            width="100%"
          >
            <DataLoader />
          </Box>
        )}
      </Grid>

      <FilterModal
        setOpen={setOpen}
        open={open}
        type="triangular"
        filterData={filterData}
        setFilterData={setFilterData}
        setFilterStatus={setFilterStatus}
        filterStatus={filterStatus}
      />
    </ExchangeContainer>
  );
}
Triangular.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
