import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Switch,
  Button,
  FormHelperText,
  Paper,
  FormControl,
  InputAdornment,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
// import {
//   dataPostHandler,
//   getDataHandlerAPI,
// } from "@/apiConfig/service/index";
import { toast } from "react-hot-toast";
// import apiConfigs from "src/apiConfig/ApiConfig";
import axios from "axios";
import PageLoader from "./PageLoader";
import { padding, styled } from "@mui/system";
import AppContext from "@/context/AppContext";
import { dataPostHandler, getDataHandlerAPI } from "@/api-services/service";
import { api_configs } from "@/api-services";
import { handleNegativeValue } from "@/utils";
import Image from "next/image";

const TradeCheckBox = styled(Box)(({ theme }) => ({
  width: "100%",
  "& p": {
    fontSize: "12px !important",
    fontWeight: "300",
  },
  "& .MuiInput-input": {
    padding: "4px 4px 4px 7px !important",
  },
  "& .MuiInputBase-sizeSmall": {
    height: "54px",
  },
  "& .dropdownBack": {
    background: theme.palette.background.paperBack,
  },

  "& .formBox": {
    "& p": {
      marginBottom: "5px",
      fontSize: "14px",
    },
  },
}));
export default function TradeCheck({
  open,
  setIsAutoTradeModal,
  type,
  botType,
}) {
  const auth = useContext(AppContext);
  const [exchangeList, setExchangeList] = useState([]);
  const [autoTradeExchange1Data, setAutoTradeExchange1Data] = useState([]);
  const [autoTradeExchange2Data, setAutoTradeExchange2Data] = useState([]);
  const [autoTradeExchange2Data1, setAutoTradeExchange2Data1] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isValidExchanges, setIsValidExchanges] = useState(true);
  const [isAutoTradeOn, setIsAutoTradeOn] = useState(false);
  const [coinList, setCoinList] = useState([{}]);
  const token = window.localStorage.getItem("token");
  const [isSubmit, setisSubmit] = useState(false);
  const [filtersData, setFiltersData] = useState({
    exchange1: [],
    exchange2: [],
    orderType: "",
  });

  useEffect(() => {
    setFiltersData({
      ...filtersData,
      ["exchange1"]: autoTradeExchange1Data ? autoTradeExchange1Data : [],
      ["exchange2"]: autoTradeExchange2Data ? autoTradeExchange2Data : [],
      ["orderType"]: autoTradeExchange2Data1 ? autoTradeExchange2Data1 : [],
    });
  }, [autoTradeExchange1Data, autoTradeExchange2Data]);

  useEffect(() => {
    let checkAutoSniper;
    if (botType == "autoTradeSetting") {
      checkAutoSniper = "autoTrade";
    } else {
      checkAutoSniper = "sniperBot";
    }

    if (auth.userData?.[checkAutoSniper] && type == "Direct") {
      setIsAutoTradeOn(auth.userData?.[checkAutoSniper]?.direct);
    } else if (auth.userData?.[checkAutoSniper] && type == "Intra") {
      setIsAutoTradeOn(auth.userData?.[checkAutoSniper]?.intraSingleExchange);
    } else if (auth.userData?.[checkAutoSniper] && type == "Loop") {
      setIsAutoTradeOn(auth.userData?.[checkAutoSniper]?.loop);
    } else {
      setIsAutoTradeOn(auth.userData?.[checkAutoSniper]?.triangular);
    }
  }, [auth.userData]);
  const [autoTradeData, setAutoTradeData] = useState({
    fromExchange: [],
    toExchange: [],
    toExchange1: [],
    capital: 0,
    threshold: 0,
    Minthreshold: 0,
    fromCoins: [],
    toCoins: [],
    numberOfTrades: "",
    isMaxTrades: false,
  });
  const [isValidThreshold, setIsValidThreshold] = useState(true);
  // get data autoTrade
  function findGETAPIEndPoint() {
    if (type === "Direct") {
      return "getDataAutoTradeOnOff";
    } else if (type === "Intra") {
      return "getDataAutoTradeOnOffArb";
    } else if (type === "Loop") {
      return "autoTradeOnOffLoop";
    } else {
      return "getDataAutoTradeOnOffTran";
    }
  }

  // sniperTrade
  function findGETSiniperAPIEndPoint() {
    if (type === "Direct") {
      return "getDataSniperBotOnOff";
    } else if (type === "Intra") {
      return "sniperBotOnOffIntraArb";
    } else if (type === "Loop") {
      return "sniperBotOnOffLoop";
    } else {
      return "getDataSniperBotOnOffTran";
    }
  }
  const getDataAutoTradeOnOffHander = async () => {
    try {
      let apiEndPointCheck;
      if (botType == "autoTradeSetting") {
        apiEndPointCheck = findGETAPIEndPoint();
      } else {
        apiEndPointCheck = findGETSiniperAPIEndPoint();
      }

      const response = await getDataHandlerAPI(apiEndPointCheck);
      // console.log(" response---------- ", response);
      if (response) {
        setAutoTradeData({
          ...autoTradeData,
          capital: response?.capital,
          Minthreshold: response?.minThreshold,
          toCoins: response?.toCoin,
          fromCoins: response?.fromCoin,
          numberOfTrades: response?.numberOfTrade
            ? response?.numberOfTrade
            : "",
          isMaxTrades: response?.isNumberOfTradeActive,
        });
        if (type === "Direct") {
          setAutoTradeExchange1Data(response?.exchange1);
        } else {
          setAutoTradeExchange1Data(response?.exchangeUID);
        }
        setAutoTradeExchange2Data(response?.exchange2);
        setAutoTradeExchange2Data1(response?.orderType);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //autoTrade Post
  function findAPIEndPoint() {
    if (type === "Direct") {
      return "autoTradeOnOffDirectArb";
    } else if (type === "Intra") {
      return "autoTradeOnOffIntraArb";
    } else if (type === "Loop") {
      return "autoTradeOnOffLoop";
    } else {
      return "autoTradeOnOffTriangular";
    }
  }

  // sniperTrade POST
  function findSiniperAPIEndPoint() {
    if (type === "Direct") {
      return "sniperBotOnOffDirectArb";
    } else if (type === "Intra") {
      return "sniperBotOnOffIntraArbOnOf";
    } else if (type === "Loop") {
      return "sniperBotOnOffLoop";
    } else {
      return "sniperBotOnOffTriangular";
    }
  }
  const autoTradeConnectAPIHandler = async () => {
    let apiEndPointCheck;
    if (botType == "autoTradeSetting") {
      apiEndPointCheck = findAPIEndPoint();
    } else {
      apiEndPointCheck = findSiniperAPIEndPoint();
    }

    setisSubmit(true);
    if (
      filtersData?.exchange1.length == 0 ||
      (type === "Direct" && filtersData?.exchange2.length == 0) ||
      (botType !== "autoTradeSetting" &&
        autoTradeData?.fromCoins.length == 0) ||
      (botType !== "autoTradeSetting" && autoTradeData?.toCoins.length == 0) ||
      (botType !== "autoTradeSetting" &&
        autoTradeData.isMaxTrades &&
        autoTradeData?.numberOfTrades == 0) ||
      (botType !== "autoTradeSetting" &&
        autoTradeData.isMaxTrades &&
        autoTradeData?.numberOfTrades == "") ||
      (botType !== "autoTradeSetting" &&
        autoTradeData.isMaxTrades &&
        autoTradeData?.numberOfTrades > 1000000000) ||
      autoTradeData?.capital < 50 ||
      autoTradeData?.Minthreshold < 0 ||
      autoTradeData?.Minthreshold > 100
    ) {
      return;
    }
    console.log(
      autoTradeData,
      " ----------- autoTradeData.isMaxTrades ",
      autoTradeData.isMaxTrades
    );
    setisSubmit(false);
    const dataToSend =
      type === "Direct"
        ? {
            exchange1: filtersData?.exchange1,
            exchange2: filtersData?.exchange2,
            capital: Number(autoTradeData.capital),
            minThreshold: Number(autoTradeData.Minthreshold),
            fromCoin: autoTradeData.fromCoins,
            toCoin: autoTradeData.toCoins,
            numberOfTrade: Number(autoTradeData.numberOfTrades),
            isNumberOfTradeActive: autoTradeData.isMaxTrades,
          }
        : type === "Loop"
        ? {
            exchange1: filtersData?.exchange1,
            exchange2: filtersData?.exchange2,
            exchange3: autoTradeData.toExchange1,
            capital: Number(autoTradeData.capital),
            minThreshold: Number(autoTradeData.Minthreshold),
            fromCoin: autoTradeData.fromCoins,
            toCoin: autoTradeData.toCoins,
            numberOfTrade: Number(autoTradeData.numberOfTrades),
            isNumberOfTradeActive: autoTradeData.isMaxTrades,
          }
        : {
            exchangeUID: filtersData?.exchange1,
            capital: Number(autoTradeData.capital),
            minThreshold: Number(autoTradeData.Minthreshold),
            orderType: "LIMIT",
            fromCoin: autoTradeData.fromCoins,
            toCoin: autoTradeData.toCoins,
            numberOfTrade: Number(autoTradeData.numberOfTrades),
            isNumberOfTradeActive: autoTradeData.isMaxTrades,
          };

    try {
      setIsProcessing(true);
      const response = await dataPostHandler(apiEndPointCheck, dataToSend);
      if (response.status == 200) {
        toast.success(response.data.responseMessage);
        auth.getProfileDataHandler(window.localStorage.getItem("token"));
        getDataAutoTradeOnOffHander();
        setIsProcessing(false);
        setIsAutoTradeModal(false);
      } else {
        toast.error(response.data.responseMessage);
        setIsProcessing(false);
      }
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
    }
  };

  const getTokenListHandler = async (_id) => {
    try {
      const response = await axios({
        method: "GET",
        url: api_configs.get_wallet_coinImageData,
        headers: {
          token: token,
        },
      });
      if (response.data.responseCode === 200) {
        const coin = [
          {
            name: "ALL",
            image: "", // Or any placeholder image
            symbol: "ALL",
            label: "ALL",
            value: "ALL",
          },
          ...response.data.result.map((item) => {
            return {
              name: item.name.toUpperCase(),
              image: item.image.toUpperCase(),
              symbol: item.symbol.toUpperCase(),
              label: item.symbol.toUpperCase(),
              value: item.symbol.toUpperCase(),
            };
          }),
        ];

        setCoinList(coin);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAutoTradeOn) {
      getDataAutoTradeOnOffHander();
    }
  }, [filtersData?.trade, isAutoTradeOn]);

  useEffect(() => {
    getTokenListHandler();
  }, []);

  useEffect(() => {
    if (auth?.connectedExchangeList) {
      const filterFun = auth?.connectedExchangeList.map((data) => {
        return data?.exchangeUID;
      });
      setExchangeList(filterFun);
      if (type === "Direct" || type === "Intra") {
        if (filterFun.length < 2) {
          setIsValidExchanges(false);
        } else {
          setIsValidExchanges(true);
        }
      } else if (type === "Loop") {
        if (filterFun.length < 3) {
          setIsValidExchanges(false);
        } else {
          setIsValidExchanges(true);
        }
      } else {
        if (filterFun.length < 1) {
          setIsValidExchanges(false);
        } else {
          setIsValidExchanges(true);
        }
      }
    }
  }, [auth?.connectedExchangeList, type]);

  const autoTradeOffAPIHandler = async () => {
    let EndPoint;
    if (botType == "autoTradeSetting") {
      if (auth.userData?.autoTrade && type == "Direct") {
        EndPoint = "autoTradeOnOffDirectArb";
      }
      if (auth.userData?.autoTrade && type == "Intra") {
        EndPoint = "autoTradeOnOffIntraArb";
      }
      if (auth.userData?.autoTrade && type == "Loop") {
        EndPoint = "autoTradeOnOffLoop";
      }
      if (auth.userData?.autoTrade && type == "Triangular") {
        EndPoint = "autoTradeOnOffTriangular";
      }
    } else {
      if (auth.userData?.autoTrade && type == "Direct") {
        EndPoint = "sniperBotOnOffDirectArb";
      }
      if (auth.userData?.autoTrade && type == "Intra") {
        EndPoint = "sniperBotOnOffIntraArbOnOf";
      }
      if (auth.userData?.autoTrade && type == "Loop") {
        EndPoint = "autoTradeOnOffLoop";
      }
      if (auth.userData?.autoTrade && type == "Triangular") {
        EndPoint = "sniperBotOnOffTriangular";
      }
    }
    try {
      const response = await dataPostHandler(EndPoint);
      if (response.status == 200) {
        setIsAutoTradeOn(false);
        setFiltersData({
          exchange1: [],
          exchange2: [],
          orderType: "",
        });
        setAutoTradeData({
          fromExchange: [],
          toExchange: [],
          toExchange1: [],
          capital: 0,
          threshold: 0,
          Minthreshold: 0,
          fromCoins: [],
          toCoins: [],
          numberOfTrades: 0,
          isMaxTrades: false,
        });
        setisSubmit(false);
        auth.getProfileDataHandler(window.localStorage.getItem("token"));
        toast.success("Auto trade has been off successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const options = [
    { value: "ALL", label: "All", image: "/images/etherum.png" },
    { value: "BTC", label: "Bitcoin", image: "/images/etherum.png" },
    { value: "ETH", label: "Ethereum", image: "/images/etherum.png" },
    { value: "USDT", label: "Tether", image: "/images/etherum.png" },
  ];

  const handleChange = (event, value, setFiltersData, filtersData) => {
    console.log(
      value,
      " value is :  ",
      value.some((v) => v.value === "ALL"),
      options?.filter((option) => option.value !== "ALL")
    );
    if (value.some((v) => v.value === "ALL")) {
      setFiltersData({
        ...filtersData,
        toCoins: options.filter((option) => option.value !== "ALL"),
      });
    } else {
      setFiltersData({ ...filtersData, toCoins: value });
    }
  };

  return (
    <TradeCheckBox>
      <Box>
        <Box mt={2}>
          <Typography variant="body2" color="primary">
            Auto- Off/On
          </Typography>

          <Switch
            onClick={() => {
              if (isAutoTradeOn) {
                autoTradeOffAPIHandler();
              }
            }}
            checked={isAutoTradeOn}
            disabled={!isAutoTradeOn}
            name="checkedA"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </Box>

        <Box mt={2}>
          <Box mb={1}>
            <Typography variant="body2" color="primary">
              {type == "Direct"
                ? "Choose Your First Exchange"
                : "Choose Your Exchange"}
            </Typography>
          </Box>

          <Box
            style={{ width: "100%", position: "relative" }}
            className="autocompleBox"
          >
            <Autocomplete
              // className={classes.dropdown12}
              disabled={isAutoTradeOn}
              size="small"
              multiple
              limitTags={4}
              options={exchangeList.filter(function (x) {
                return (
                  filtersData.exchange1.filter(function (y) {
                    return y == x;
                  }).length == 0
                );
              })}
              value={filtersData?.exchange1}
              onChange={(e, v) => {
                setFiltersData({ ...filtersData, ["exchange1"]: v });
              }}
              renderInput={(params) => (
                <TextField
                  disabled={isAutoTradeOn}
                  {...params}
                  variant="outlined"
                  placeholder={
                    type == "Direct"
                      ? "Choose Your First Exchange"
                      : "Choose Your Exchange"
                  }
                  style={{ marginLeft: 0, marginRight: 0 }}
                />
              )}
            />
            <FormHelperText
              error
              // className={classes.helperText}
            >
              {isSubmit &&
                filtersData?.exchange1.length == 0 &&
                "Please choose at least one exchange."}
            </FormHelperText>
          </Box>
        </Box>
        {type == "Direct" && (
          <Box mt={2}>
            <Box mb={1}>
              <Typography variant="body2" color="primary">
                Choose Your Second Exchange
              </Typography>
            </Box>
            <Box
              style={{ width: "100%", position: "relative" }}
              className="autocompleBox"
            >
              <Autocomplete
                // className={classes.dropdown12}
                disabled={isAutoTradeOn}
                multiple
                limitTags={4}
                value={filtersData?.exchange2}
                options={exchangeList.filter(function (x) {
                  return (
                    filtersData.exchange2.filter(function (y) {
                      return y == x;
                    }).length == 0
                  );
                })}
                onChange={(e, v) => {
                  setFiltersData({ ...filtersData, ["exchange2"]: v });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    disabled={isAutoTradeOn}
                    variant="standard"
                    placeholder="Choose Your Second Exchange"
                    style={{ marginLeft: 0, marginRight: 0 }}
                  />
                )}
              />{" "}
              <FormHelperText
                error
                // className={classes.helperText}
              >
                {isSubmit &&
                  filtersData?.exchange2.length == 0 &&
                  "Please choose at least one exchange."}
              </FormHelperText>
            </Box>
          </Box>
        )}
        <Box className="formBox">
          <Box mb={1} mt={2}>
            <Typography variant="body2" color="primary">
              Amount per Trade
            </Typography>
          </Box>

          <TextField
            name="capital"
            variant="standard"
            type="number"
            value={autoTradeData?.capital}
            disabled={isAutoTradeOn}
            onChange={(e, v) => {
              const value = e.target.value;
              if (value >= 0 || value === "") {
                setAutoTradeData({
                  ...autoTradeData,
                  fromExchange: autoTradeData.fromExchange,
                  toExchange: autoTradeData.toExchange,
                  toExchange1: autoTradeData.toExchange1,
                  capital: e.target.value,
                  threshold: autoTradeData.threshold,
                  Minthreshold: autoTradeData.Minthreshold,
                  fromCoins: autoTradeData.fromCoins,
                  toCoins: autoTradeData.toCoins,
                });
              }
              // setisSubmit(true);
            }}
            // error={isSubmit && autoTradeData?.capital == ""}
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
          />

          <FormHelperText error>
            {isSubmit && autoTradeData?.capital == "" && "Capital is required."}
            {isSubmit &&
              autoTradeData?.capital !== "" &&
              Number(autoTradeData?.capital) < 50 &&
              "Capital should be 50 or greater than 50."}
          </FormHelperText>
        </Box>

        <Box className="formBox" mt={2} mb={2}>
          <Box mb={1}>
            <Typography variant="body2" color="primary">
              Minimum Profit (USDT)
            </Typography>
          </Box>

          <TextField
            variant="standard"
            name="Minthreshold"
            type="number"
            value={autoTradeData?.Minthreshold}
            disabled={isAutoTradeOn}
            onChange={(e, v) => {
              const value = e.target.value;
              if (value >= 0 || value === "") {
                setAutoTradeData({
                  ...autoTradeData,
                  fromExchange: autoTradeData.fromExchange,
                  toExchange: autoTradeData.toExchange,
                  toExchange1: autoTradeData.toExchange1,
                  capital: autoTradeData.capital,
                  Minthreshold: e.target.value,
                  threshold: autoTradeData.threshold,
                  fromCoins: autoTradeData.fromCoins,
                  toCoins: autoTradeData.toCoins,
                });
                if (e.target.value > 100) {
                  setIsValidThreshold(false);
                } else {
                  setIsValidThreshold(true);
                }
              }
            }}
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
          />

          <FormHelperText error>
            {isSubmit &&
              isValidThreshold &&
              autoTradeData?.Minthreshold == "" &&
              "Minimum Profit is required."}
            {isSubmit &&
            autoTradeData?.Minthreshold !== "" &&
            Number(autoTradeData?.Minthreshold) > 100
              ? "Minimum Profit must be less than 100."
              : ""}
          </FormHelperText>
        </Box>

        {botType !== "autoTradeSetting" && (
          <>
            <Box mt={2}>
              <Box mb={1}>
                <Typography variant="body2" color="primary">
                  From Coin(Base Currency)
                </Typography>
              </Box>
              <Box mb={2}>
                <Box
                  style={{ width: "100%", position: "relative" }}
                  className="autocompleBox"
                >
                  <Autocomplete
                    disabled={isAutoTradeOn}
                    multiple
                    limitTags={5}
                    value={autoTradeData?.fromCoins}
                    options={coinList.map((option) => option.symbol)}
                    onChange={(e, v) => {
                      // setAutoTradeData({ ...autoTradeData, ["fromCoins"]: v });
                      let totalValues = coinList
                        .filter((op) => op.symbol !== "ALL")
                        .map((op) => op.symbol);

                      if (v.some((ve) => ve == "ALL")) {
                        setAutoTradeData({
                          ...autoTradeData,
                          ["fromCoins"]: totalValues,
                        });
                      } else {
                        setAutoTradeData({
                          ...autoTradeData,
                          ["fromCoins"]: v,
                        });
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        disabled={isAutoTradeOn}
                        variant="standard"
                        placeholder="Choose Your to coin"
                        style={{ marginLeft: 0, marginRight: 0 }}
                      />
                    )}
                  />{" "}
                  <FormHelperText error>
                    {isSubmit &&
                      autoTradeData?.fromCoins == "" &&
                      "Base Currency is required."}
                  </FormHelperText>
                </Box>
              </Box>
            </Box>

            <Box mt={2}>
              <Box mb={1}>
                <Typography variant="body2" color="primary">
                  To Coin(Quote Currency)
                </Typography>
              </Box>
              <Box mb={2}>
                <Box
                  style={{ width: "100%", position: "relative" }}
                  className="autocompleBox"
                >
                  <Autocomplete
                    disabled={isAutoTradeOn}
                    multiple
                    limitTags={3}
                    value={autoTradeData?.toCoins}
                    options={options.map((option) => option.value)}
                    onChange={(e, v) => {
                      let totalValues = options
                        .filter((op) => op.value !== "ALL")
                        .map((op) => op.value);

                      if (v.some((ve) => ve == "ALL")) {
                        setAutoTradeData({
                          ...autoTradeData,
                          ["toCoins"]: totalValues,
                        });
                      } else {
                        setAutoTradeData({ ...autoTradeData, ["toCoins"]: v });
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        disabled={isAutoTradeOn}
                        variant="standard"
                        placeholder="Choose Your to coin"
                        style={{ marginLeft: 0, marginRight: 0 }}
                      />
                    )}
                  />
                  <FormHelperText error>
                    {isSubmit &&
                      autoTradeData?.toCoins == "" &&
                      "Quote Currency is required."}
                  </FormHelperText>
                </Box>
              </Box>
            </Box>
            <Box className="formBox" mt={2} mb={2}>
              <Box mb={1}>
                <Typography variant="body2" color="primary">
                  No of trades
                </Typography>
              </Box>

              <TextField
                variant="standard"
                name="numberOfTrades"
                type="number"
                placeholder={
                  autoTradeData.isMaxTrades
                    ? "Enter number Of trades"
                    : "No cap is set"
                }
                value={autoTradeData?.numberOfTrades}
                onChange={(e, v) => {
                  const value = e.target.value;
                  if (value >= 0 || value === "") {
                    setAutoTradeData({
                      ...autoTradeData,
                      numberOfTrades: value,
                    });
                    // if (e.target.value > 100) {
                    //   setIsValidThreshold(false);
                    // } else {
                    //   setIsValidThreshold(true);
                    // }
                  }
                }}
                onKeyPress={(event) => {
                  if (
                    event?.key === "-" ||
                    event?.key === "+" ||
                    event?.key === "*" ||
                    event?.key === "." ||
                    event?.key === "/"
                  ) {
                    event.preventDefault();
                  }
                }}
                onKeyDown={(event) => handleNegativeValue(event)}
                inputProps={{ min: 0, max: 100000000 }}
                disabled={!autoTradeData.isMaxTrades || isAutoTradeOn}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      Off
                      <Switch
                        disabled={isAutoTradeOn}
                        onClick={() => {
                          setAutoTradeData({
                            ...autoTradeData,
                            isMaxTrades: autoTradeData.isMaxTrades
                              ? false
                              : true,
                          });
                        }}
                        checked={autoTradeData.isMaxTrades}
                        // disabled={!isAutoTradeOn}
                        name="checkedA"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />{" "}
                      On
                    </InputAdornment>
                  ),
                }}
              />
              {!autoTradeData.isMaxTrades && (
                <Typography
                  mt={1}
                  variant="subtitle"
                  color={"primary"}
                  fontSize="12px"
                >
                  <span style={{ color: "red" }}>Off</span> : Your "Number of
                  trades" feature is currently disabled, which can result in
                  unlimited trades being executed based on the available
                  balance. You can turn it ON to limit number of trades.
                </Typography>
              )}

              {autoTradeData.isMaxTrades && (
                <Typography
                  mt={1}
                  variant="subtitle"
                  color={"primary"}
                  fontSize="12px"
                >
                  <span style={{ color: "green" }}>On</span> : Your "Number of
                  trades" feature is currently set to a maximum of{" "}
                  {autoTradeData?.numberOfTrades} trades. If you want to allow
                  unlimited trades, you can turn this feature OFF.
                </Typography>
              )}

              <FormHelperText error>
                {isSubmit &&
                  autoTradeData.isMaxTrades &&
                  autoTradeData?.numberOfTrades == "" &&
                  "Number Of trades is required."}
                {isSubmit &&
                  autoTradeData.isMaxTrades &&
                  autoTradeData?.numberOfTrades !== "" &&
                  Number(autoTradeData?.numberOfTrades) > 100000000 &&
                  "Please enter valid value."}
                {isSubmit &&
                  autoTradeData.isMaxTrades &&
                  autoTradeData?.numberOfTrades !== "" &&
                  Number(autoTradeData?.numberOfTrades) == 0 &&
                  "Please enter valid value."}
              </FormHelperText>
            </Box>
          </>
        )}

        <Button
          className="modelbtn"
          color="primary"
          variant="contained"
          disabled={isAutoTradeOn}
          onClick={() => autoTradeConnectAPIHandler()}
        >
          Submit
        </Button>
        {isProcessing && <PageLoader />}
      </Box>
    </TradeCheckBox>
  );
}
