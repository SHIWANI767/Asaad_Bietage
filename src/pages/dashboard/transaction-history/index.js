import {
  Box,
  Typography,
  IconButton,
  Button,
  Grid,
  Paper,
  styled,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";
import {
  capitalizeFirstLetter,
  sortAddress,
  setCryptoDecimals,
  convertArrayToXLSX,
  setCryptoDecimalsBTC,
} from "@/utils";

import AppContext from "@/context/AppContext";
import { toast } from "react-hot-toast";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { api_configs } from "@/api-services";
import DashboardLayout from "@/layout/DashboardLayout";
import { AiOutlineCopy } from "react-icons/ai";
import MainFilter from "@/components/MainFilter";
import { CheckOutlined } from "@mui/icons-material";
import dynamic from "next/dynamic";
import SortAddress from "@/utils/SortAddress";
import { LuRefreshCcw } from "react-icons/lu";
const CustomHead = dynamic(() => import("@/components/CustomHead"));
const TableComp = dynamic(() => import("@/components/TableComp"));
const Popup = dynamic(() => import("@/components/DynamicModel"));
const CommonConfirmationDialog = dynamic(() =>
  import("@/components/CommonConfirmationDialog")
);

const TransactionBox = styled(Box)(({ theme }) => ({
  "& .contentHeading": {
    "& p": {
      fontWeight: 400,
      fontSize: "12px",
      // color: "#000",
    },
  },
  "& .tabmainBox": {
    width: "100%",
    padding: "0px !important",
    borderRadius: "0px",
    border: "none",
    background: "transparent",
    borderBottom: "1px solid #80808024",
  },
  "& .transactionBox": {
    position: "relative",
    zIndex: "999",
    "& .mainTab": {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      borderRadius: "50px",
      flexWrap: "wrap",
    },
    "& .tabActiveButtons": {
      padding: "9px 21px 15px",
      cursor: "pointer",
      whiteSpace: "pre",
      fontWeight: "500",
      color: "#000",
      borderRadius: "0px",
      borderBottom: "2px solid",
      borderColor: theme.palette.text.green,
      background: "transparent",
      "& h6": {
        fontWeight: 400,
        fontSize: "14px",
        color: "#000",
        background: theme.palette.text.green,

        WebkitBackgroundClip: "text",
        color: "transparent",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "5px 20px",
        "& h6": {},
        "& p": {
          fontSize: "10px !important",
        },
      },
    },
    "& .tabButtons": {
      borderRadius: "0px",
      padding: "9px 21px 15px",
      whiteSpace: "pre",
      cursor: "pointer",
      borderBottom: "2px solid",
      borderColor: "transparent",
      "& h6": {
        fontWeight: 400,
        fontSize: "14px",
        color: theme.palette.text.primary,
      },
      [theme.breakpoints.down("sm")]: {
        padding: "5px 20px",
        "& h6": {
          fontSize: "12px !important",
        },
      },
    },
    "& h4": {
      fontWeight: 700,
    },
  },
  "& .cardBox": {
    padding: "10px",
    borderRadius: "12px",
    // border: "1px solid #cccccc36",
    // background: "#33323882",
    marginBottom: "10px",
  },
  "& .contentBox": {
    textAlign: "right",
    width: "100%",
  },
}));

const tableHead = [
  {
    heading: "Sr. No",
    isMobile: true,
    column: 0,
  },
  {
    heading: "Pair",
    isMobile: true,
    column: 0,
  },

  {
    heading: "Exchange",
    isMobile: true,
    column: 0,
  },
  {
    heading: "Capital",
    isMobile: true,
    column: 1,
  },
  {
    heading: "Trade Status",
    // isMobile: false,
    // column: 2,
  },
  {
    heading: "Profit (USDT)",
    isMobile: true,
    column: 1,
  },
  {
    heading: "Trade Type",
    isMobile: true,
    column: 0,
  },
  {
    heading: "barStatus",
    isMobile: false,
    isNotShow: true,
  },
  {
    heading: "Strategy",
    isMobile: false,
    isNotShow: true,
  },
  {
    heading: "Open Time",
    isMobile: true,
    column: 2,
    isNotShow: false,
  },
  {
    heading: "Close Time",
    isMobile: true,
    column: 2,
    isNotShow: false,
  },
  { heading: "Status", isMobile: true, column: 2, isNotShow: false },
  { heading: "Action", isMobile: true, column: 2, isNotShow: false },
];
export default function Transection() {
  const auth = useContext(AppContext);
  const token = window.localStorage.getItem("user_token");
  const [isDownLoading, setIsLoadingDownLoad] = useState(false);
  const [limit, setTotalDownloadLimit] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [numPages, setNumPages] = useState(1);
  const [arbitrageData, setArbitargeData] = useState([]);
  const [strategyData, setstrategyData] = useState([]);
  const [_idd, set_idd] = useState("");
  const [openCancel, setOpenCancel] = useState(false);
  const [open, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState("listPlacedDirectTradeWithFilter");
  const [isClear, setIsClear] = useState(false);
  const [isClearData, setIsClearData] = useState(true); //
  const [isLoadingCancel, setIsLoadingCancel] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [filtersData, setFiltersData] = useState({
    fromDate: null,
    toDate: null,
    search: "",
    planStatus: "1",
    arbitrageType: "1",
  });
  const handleTab = (e) => {
    setTab(e);
    handleClear();
  };
  const getTransactionHistory = async (endPoint, pageNo) => {
    try {
      setArbitargeData([]);
      setIsClear(false);
      setIsLoading(true);
      const res = await axios({
        method: "POST",
        url: api_configs[endPoint],
        headers: {
          token: token,
        },
        data: {
          search: filtersData?.search ? filtersData?.search : undefined,
          page: pageNo.toString(),
          limit: isMobile ? "5" : "10",
          arbitrageStatus:
            filtersData?.planStatus != "1"
              ? filtersData?.planStatus
              : undefined,
          arbitrageType:
            filtersData?.arbitrageType != "1"
              ? filtersData?.arbitrageType
              : undefined,
          fromDate: filtersData.fromDate
            ? moment(filtersData.fromDate).format("YYYY-MM-DD")
            : undefined,
          toDate: filtersData.toDate
            ? moment(filtersData.toDate).format("YYYY-MM-DD")
            : undefined,
        },
      });
      if (res.data.responseCode === 200) {
        setArbitargeData(res.data.result.docs);
        setIsClear(false);
        let currencyId = [];
        for (var i = 0; i < res.data.result.docs?.length; i++) {
          const arbitrageStatus = res.data.result.docs[i]?.arbitrageStatus;
          const base = res.data.result.docs[i]?.base;
          const pair = res.data.result.docs[i]?.pair;
          const arbitrageType = res.data.result.docs[i]?.arbitrageType;
          const status = res.data.result.docs[i]?.status;
          const capital = res.data.result.docs[i]?.capital;
          const createdAt = res.data.result.docs[i]?.createdAt;
          const connectedExchangeId1 = res.data.result.docs[i]
            ?.connectedExchangeId1
            ? res.data.result.docs[i]?.connectedExchangeId1.uid
            : "";
          const connectedExchangeId2 = res.data.result.docs[i]
            ?.connectedExchangeId2
            ? res.data.result.docs[i]?.connectedExchangeId2.uid
            : "";
          let obj = {
            arbitrageStatus: arbitrageStatus,
            arbitrageName:
              tab == "listPlacedDirectTradeWithFilter"
                ? "QuantumFlow"
                : tab == "listPlacedTradeWithFilterIntraArb"
                ? "QuantumBridge"
                : tab == "listPlacedTriangularTradeWithFilter"
                ? "QuantumLoop"
                : "",
            base: base,
            pair: pair,
            arbitrageType: arbitrageType,
            status: status,
            capital: capital,
            createdAt: createdAt,
            connectedExchangeId1: connectedExchangeId1
              ? connectedExchangeId1
              : "N/A",
            connectedExchangeId2: connectedExchangeId2
              ? connectedExchangeId2
              : "N/A",
          };
          currencyId.push(obj);
        }
        setNumPages(res.data.result.pages);
        setPage(res?.data?.result?.page);
        setRowsPerPage(res.data.result.limit);
        setTotalDownloadLimit(res.data.result.total);
      } else {
        setArbitargeData([]);
        setNumPages(1);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setArbitargeData([]);
      // setIsClear(false);
      setNumPages(1);
      setIsLoading(false);
    }
  };
  const onDownload = async (endPoint) => {
    try {
      // setArbitargeData([]);
      // setIsClear(false);
      setIsLoadingDownLoad(true);
      const res = await axios({
        method: "POST",
        url: api_configs[endPoint],
        headers: {
          token: token,
        },
        data: {
          search: filtersData?.search ? filtersData?.search : undefined,
          page: "1",
          limit: limit.toString(),
          arbitrageStatus:
            filtersData?.planStatus != "1"
              ? filtersData?.planStatus
              : undefined,
          arbitrageType:
            filtersData?.arbitrageType != "1"
              ? filtersData?.arbitrageType
              : undefined,
          fromDate: filtersData.fromDate
            ? moment(filtersData.fromDate).format("YYYY-MM-DD")
            : undefined,
          toDate: filtersData.toDate
            ? moment(filtersData.toDate).format("YYYY-MM-DD")
            : undefined,
        },
      });
      if (res.data.responseCode === 200) {
        const currencyId = res.data.result.docs?.map((doc) => ({
          arbitrageStatus: doc?.arbitrageStatus,
          arbitrageName:
            tab === "listPlacedDirectTradeWithFilter"
              ? "QuantumFlow"
              : tab === "listPlacedTradeWithFilterIntraArb"
              ? "QuantumBridge"
              : tab === "listPlacedTriangularTradeWithFilter"
              ? "QuantumLoop"
              : "",
          base: doc?.base,
          pair: doc?.pair,
          exchangeName: doc?.exchangeName,
          expectedProfit: doc?.expectedProfit,
          filledTotal: doc?.filledTotal,
          amount: doc?.amount,
          start: doc?.start,
          profit: doc?.profit ? doc?.profit : 0,
          capital: doc?.capital,
          filledTotal: doc?.filledTotal,
          orderType: doc?.orderType,
          rebalancingNumber: doc?.rebalancingNumber,
          arbitrageType: doc?.arbitrageType,
          status: doc?.status,
          capital: doc?.capital,
          createdAt: doc?.createdAt,
          connectedExchange1: doc?.connectedExchangeId1?.uid || "N/A",
          connectedExchange2: doc?.connectedExchangeId2?.uid || "N/A",
          strategy: doc?.strategy,
        }));
        convertArrayToXLSX(currencyId, "transaction_history");
        setIsLoadingDownLoad(false);
        // setIsClear(false);
      } else {
        setIsLoadingDownLoad(false);
      }
    } catch (error) {
      console.log(error, " ------- error");
      setIsLoadingDownLoad(false);
    }
  };
  const handleClearFilter = () => {
    if (!isClearData) {
      handleClear();
      setIsClear(true);
      setIsClearData(true);
    }
  };
  const handleClear = () => {
    setFiltersData({
      ...filtersData,
      ["fromDate"]: null,
      ["toDate"]: null,
      ["search"]: "",
      ["planStatus"]: "1",
      ["arbitrageType"]: "1",
    });
    setPage(1);
  };
  useEffect(() => {
    getTransactionHistory(tab, page);
  }, [page, tab, isMobile]);
  useEffect(() => {
    if (isClear) {
      getTransactionHistory(tab, page);
    }
  }, [isClear]);

  function findGETAPIEndPoint(ty) {
    if (ty === "listPlacedDirectTradeWithFilter") {
      return "cancelledOrderDirectArb";
    } else if (ty === "listPlacedTradeWithFilterIntraArb") {
      return "cancelledOrderIntraArb";
    } else {
      return "cancelledOrderTriangular";
    }
  }

  const handleCancel = async () => {
    let endPoint = findGETAPIEndPoint(tab);
    try {
      setIsLoadingCancel(true);
      const res = await axios({
        method: "POST",
        url: api_configs[endPoint] + _idd,
        headers: {
          token: token,
        },
      });
      if (res.data.responseCode === 200) {
        setOpenCancel(false);
        getTransactionHistory(tab, page);
      } else {
      }
      setIsLoadingCancel(false);
    } catch (error) {
      console.log(error);
      setIsLoadingCancel(false);
    }
  };

  const handleUpdateTrade = async (id) => {
    try {
      setUpdateLoading(id);
      const res = await axios({
        method: "PUT",
        url: api_configs[
          tab === "listPlacedTriangularTradeWithFilter"
            ? "updatePlacedTradeTri"
            : "updatePlacedTradeIntra"
        ],
        headers: {
          token: token,
        },
        data: {
          _id: id,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res?.data?.responseMessage);
        getTransactionHistory(tab, 1);
      } else {
        toast.error(res?.data?.responseMessage);
      }
      setUpdateLoading(null);
    } catch (error) {
      console.log(error);
      setUpdateLoading(null);
    }
  };

  const ITEM_HEIGHT = isMobile ? 36 : 48;
  const ITEM_PADDING_TOP = isMobile ? 2 : 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 7 + ITEM_PADDING_TOP,
      },
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: isMobile ? null : undefined,
  };

  useEffect(() => {
    if (auth?.topHeading) {
      auth?.setTopHeading("Transaction History");
    }
  }, []);

  return (
    <TransactionBox>
      <CustomHead
        title="Transaction | Bitedge"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        transactionArbitrage
        isVideo={false}
      />
      <Box className="transactionBox">
        <Box mb={2} mt={2}>
          {isMobile ? (
            <Box className="mainTab displayStart">
              <FormControl variant="outlined" fullWidth color="primary">
                <Select
                  labelId="transaction-tab-select"
                  id="transaction-tab-select"
                  value={tab}
                  onChange={(e) => {
                    handleTab(e.target.value);
                  }}
                  displayEmpty
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Select Transaction Tab" }}
                  color="primary"
                >
                  <MenuItem value="listPlacedDirectTradeWithFilter">
                    QuantumFlow
                  </MenuItem>
                  <MenuItem value="listPlacedTriangularTradeWithFilter">
                    QuantumLoop
                  </MenuItem>
                  <MenuItem value="listPlacedTradeWithFilterIntraArb">
                    QuantumBridge
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          ) : (
            <Paper elevation={2} className="tabmainBox">
              <Box className="mainTab displayStart">
                <Box
                  onClick={() => handleTab("listPlacedDirectTradeWithFilter")}
                  className={
                    tab === "listPlacedDirectTradeWithFilter"
                      ? "tabActiveButtons"
                      : "tabButtons"
                  }
                >
                  <Typography variant="h6"> QuantumFlow</Typography>
                </Box>
                <Box
                  onClick={() =>
                    handleTab("listPlacedTriangularTradeWithFilter")
                  }
                  className={
                    tab === "listPlacedTriangularTradeWithFilter"
                      ? "tabActiveButtons"
                      : "tabButtons"
                  }
                >
                  <Typography variant="h6">QuantumLoop</Typography>
                </Box>
                <Box
                  onClick={() => handleTab("listPlacedTradeWithFilterIntraArb")}
                  className={
                    tab === "listPlacedTradeWithFilterIntraArb"
                      ? "tabActiveButtons"
                      : "tabButtons"
                  }
                >
                  <Typography variant="h6">QuantumBridge</Typography>
                </Box>
              </Box>
            </Paper>
          )}
        </Box>
        <Box mt={1}>
          <MainFilter
            filter={filtersData}
            setFilter={(data) => {
              setFiltersData(data);
              setIsClearData(false);
            }}
            clearFilters={handleClearFilter}
            onClickFun={() => {
              getTransactionHistory(tab, 1);
              setIsClearData(false);
            }}
            userData={[]}
            placeholder="Search by..."
            type="transactionArbitrage"
            onDownload={() => onDownload(tab)}
            isDownLoading={isDownLoading}
            limit={limit}
          />
        </Box>

        <Box style={{ border: "none" }} mt={2}>
          <Paper elevation={2}>
            <TableComp
              maxHeight={"calc(100dvh - 150px)"}
              isMobileAdaptive={true}
              minHeight="400px"
              tableHead={
                tab !== "listPlacedDirectTradeWithFilter"
                  ? tableHead.filter((item) => item.heading !== "Pair")
                  : tableHead
              }
              scoreListData={
                arbitrageData &&
                arbitrageData.map((value, i) => ({
                  "Sr. No": (page - 1) * rowsPerPage + i + 1,
                  Pair:
                    value.base && value.pair
                      ? `${value.base}/${value.pair}`
                      : "N/A",
                  Exchange:
                    tab === "listPlacedDirectTradeWithFilter"
                      ? `${
                          value.connectedExchangeId1
                            ? capitalizeFirstLetter(
                                value.connectedExchangeId1.uid
                              )
                            : ""
                        }/${
                          value.connectedExchangeId2
                            ? capitalizeFirstLetter(
                                value.connectedExchangeId2.uid
                              )
                            : ""
                        }`
                      : value &&
                        value.exchangeName &&
                        capitalizeFirstLetter(value?.exchangeName),
                  Capital: value.capital
                    ? `${setCryptoDecimals(value.capital)} ${
                        value?.start || value?.pair
                      }`
                    : "-",
                  "Trade Status": value?.arbitrageStatus
                    ? value?.arbitrageStatus
                    : "-",
                  "Profit (USDT)": (
                    <span
                      style={{
                        color: value?.profit
                          ? value?.profit > 0
                            ? "green"
                            : "red"
                          : "white",
                      }}
                    >
                      {value?.profit ? setCryptoDecimals(value?.profit) : "-"}
                    </span>
                  ),
                  "Trade Type": value?.arbitrageType
                    ? value?.arbitrageType
                    : "-",
                  barStatus: value?.arbitrageStatus
                    ? value?.arbitrageStatus
                    : "-",
                  "Open Time": isMobile
                    ? moment(value?.createdAt).format(" DD MMM YY, h:mm a")
                    : moment(value?.createdAt).format("lll"),
                  "Close Time": isMobile
                    ? moment(value?.updatedAt).format(" DD MMM YY, h:mm a")
                    : moment(value?.updatedAt).format("lll"),
                  Status: value.status,
                  Strategy: value.strategy,
                  Action: [
                    {
                      icon: <RemoveRedEyeIcon sx={{ pr: "10px" }} />,
                      onClick: () => {
                        setstrategyData(value.strategy);
                        setOpen(true);
                      },
                      isMobile: false,
                      label: "View Strategy",
                      color: "primary",
                      variant: "contained",
                    },

                    {
                      icon: (
                        <Button
                          color="primary"
                          // disabled={value?.arbitrageStatus !== "PENDING"}
                          variant="contained"
                          sx={{
                            // height: "25px",
                            maxWidth: "99px",
                            fontSize: "12px",
                            fontWeight: 400,
                            padding: "12px 12px",
                            margin: "0 0 0 9px",
                            background: (theme) =>
                              value?.arbitrageStatus !== "PENDING"
                                ? theme.palette.background.default
                                : "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)",
                            color: (theme) =>
                              value?.arbitrageStatus !== "PENDING"
                                ? theme.palette.text.secondary
                                : "#191D13CC",
                            // pr: "5px",
                            lineHeight: 0,
                            pointerEvents:
                              value?.arbitrageStatus !== "PENDING"
                                ? "none"
                                : "auto",
                          }}
                          onClick={() => {
                            if (value?.arbitrageStatus == "PENDING") {
                              set_idd(value._id);
                              setOpenCancel(true);
                            }
                          }}
                        >
                          Cancel
                        </Button>
                      ),
                      disabled: value?.arbitrageStatus !== "PENDING",
                      onClick: false,
                      onClickIs: () => {
                        if (value?.arbitrageStatus == "PENDING") {
                          set_idd(value._id);
                          setOpenCancel(true);
                        }
                      },
                      // onClick: () => {
                      //   if (value?.arbitrageStatus == "PENDING") {
                      //     set_idd(value._id);
                      //     setOpenCancel(true);
                      //   }
                      // },
                      isMobile:
                        value?.arbitrageStatus == "PENDING" ? true : false,
                      label: "Cancel",
                      color: "primary",
                      variant: "contained",
                    },
                    ...(tab !== "listPlacedDirectTradeWithFilter" &&
                    value?.arbitrageStatus === "FAILED"
                      ? [
                          {
                            icon: (
                              <LuRefreshCcw
                                className={
                                  updateLoading === value?._id && "refresh-icon"
                                }
                                sx={{ pr: "10px" }}
                              />
                            ),
                            onClick: () => {
                              !updateLoading && handleUpdateTrade(value?._id);
                            },
                            isMobile: false,
                            label: "Activate Trade",
                            color: "primary",
                            variant: "contained",
                          },
                        ]
                      : []),
                  ],
                }))
              }
              noOfPages={numPages}
              noOfTotalPages={numPages}
              page={page}
              setPage={setPage}
              limit={10}
              isLoading={isLoading}
            />
          </Paper>

          {open && (
            <TransactionViewModal
              open={open}
              close={() => setOpen(false)}
              data={strategyData}
              tab={tab}
            />
          )}

          {openCancel && (
            <CommonConfirmationDialog
              open={openCancel}
              handleClose={() => setOpenCancel(false)}
              type="Disconnect"
              title="Cancel Trade"
              heading={`Are you sure you want to cancel the arbitrage transaction?`}
              handleSubmit={(v) => handleCancel(v)}
              isLoading={isLoadingCancel}
            />
          )}

          {/* <CustomTable /> */}
        </Box>
      </Box>
    </TransactionBox>
  );
}

Transection.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

const TransactionViewModal = ({ close, open, data, tab }) => {
  return (
    <Popup
      maxWidth={tab === "listPlacedTriangularTradeWithFilter" ? "md" : "sm"}
      open={open}
      handleClose={close}
      title="Transaction Details"
      // children=""
      actions=""
      titleIcon=""
      isLoading=""
      isRemove=""
    >
      <Grid container spacing={2} mt={1}>
        {data &&
          data.map((item, i) => {
            return (
              <Grid
                item
                lg={tab === "listPlacedTriangularTradeWithFilter" ? 4 : 6}
                sm={tab === "listPlacedTriangularTradeWithFilter" ? 4 : 6}
                xs={12}
                md={tab === "listPlacedTriangularTradeWithFilter" ? 4 : 6}
              >
                <SubDetailCard item={item} index={i} />
              </Grid>
            );
          })}
      </Grid>
    </Popup>
  );
};

const SubDetailCard = ({ item, index }) => {
  const [copied, setCopied] = useState(false);
  const handleCopyClick = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Copied!");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Unable to copy text", err);
      });
  };
  const [copied1, setCopied1] = useState(false);
  const handleCopyClick1 = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Copied!");
        setCopied1(true);
        setTimeout(() => setCopied1(false), 2000);
      })
      .catch((err) => {
        console.error("Unable to copy text", err);
      });
  };
  return (
    <TransactionBox>
      <Paper elevation={2} className="cardBox" key={`cccc${index}`}>
        <Grid container spacing={2}>
          <Grid
            item
            lg={6}
            sm={6}
            md={6}
            xs={6}
            alignContent="left"
            className="contentHeading"
          >
            <Typography variant="body2" color="primary">
              Type
            </Typography>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <Box className="contentBox">
              <Typography
                variant="body2"
                style={
                  item.action === "buy" ? { color: "green" } : { color: "red" }
                }
              >
                {item && item.action && capitalizeFirstLetter(item.action)}
              </Typography>
            </Box>
          </Grid>
          {item && item.coinName && (
            <Grid
              item
              lg={6}
              sm={6}
              md={6}
              xs={6}
              alignContent="left"
              className="contentHeading"
            >
              <Typography variant="body2" color="primary">
                Pair
              </Typography>
            </Grid>
          )}
          {item && item.coinName && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body2" color="secondary">
                  {item &&
                    item.baseCurrency &&
                    item.quoteCurrency &&
                    `${item.baseCurrency}/${item.quoteCurrency}`}
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.exchange && (
            <Grid
              item
              lg={6}
              sm={6}
              md={6}
              xs={6}
              alignContent="left"
              className="contentHeading"
            >
              <Typography variant="body2" color="primary">
                Exchange
              </Typography>
            </Grid>
          )}
          {item && item.exchange && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body2" color="secondary">
                  {item &&
                    item.exchange &&
                    capitalizeFirstLetter(item.exchange)}
                </Typography>
              </Box>
            </Grid>
          )}

          <Grid
            item
            lg={6}
            sm={6}
            md={6}
            xs={6}
            alignContent="left"
            className="contentHeading"
          >
            <Typography variant="body2" color="primary">
              Price
            </Typography>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <Box className="contentBox">
              <Typography variant="body2" color="secondary">
                {item && item.price && setCryptoDecimalsBTC(item.price)}
              </Typography>
            </Box>
          </Grid>
          {item && item.amount && (
            <Grid
              item
              lg={6}
              sm={6}
              md={6}
              xs={6}
              alignContent="left"
              className="contentHeading"
            >
              <Typography variant="body2" color="primary">
                Amount
              </Typography>
            </Grid>
          )}
          {item && item.amount && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body2" color="secondary">
                  {item && item.amount && item.amount}
                </Typography>
              </Box>
            </Grid>
          )}

          {item && item.buyStatus && (
            <Grid
              item
              lg={6}
              sm={6}
              md={6}
              xs={6}
              alignContent="left"
              className="contentHeading"
            >
              <Typography variant="body2" color="primary">
                Buy Status
              </Typography>
            </Grid>
          )}
          {item && item.buyStatus && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body2" color="secondary">
                  {item &&
                    item.buyStatus &&
                    capitalizeFirstLetter(item.buyStatus)}
                </Typography>
              </Box>
            </Grid>
          )}
          <Grid
            item
            lg={6}
            sm={6}
            md={6}
            xs={6}
            alignContent="left"
            className="contentHeading"
          >
            <Typography variant="body2" color="primary">
              Traded
            </Typography>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <Box className="contentBox">
              <Typography variant="body2" color="secondary">
                {item && item.isTrade ? "Yes" : "No"}
              </Typography>
            </Box>
          </Grid>
          {item && item.isWithdraw !== undefined && (
            <Grid
              item
              lg={6}
              sm={6}
              md={6}
              xs={6}
              alignContent="left"
              className="contentHeading"
            >
              <Typography variant="body2" color="primary">
                Withdrawed
              </Typography>
            </Grid>
          )}
          {item && item.isWithdraw !== undefined && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body2" color="secondary">
                  {item && item.isWithdraw ? "Yes" : "No"}
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.isDeposit !== undefined && (
            <Grid
              item
              lg={6}
              sm={6}
              md={6}
              xs={6}
              alignContent="left"
              className="contentHeading"
            >
              <Typography variant="body2" color="primary">
                Withdrawed
              </Typography>
            </Grid>
          )}
          {item && item.isDeposit !== undefined && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body2" color="secondary">
                  {item && item.isDeposit ? "Yes" : "No"}
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.orderId && (
            <Grid
              item
              lg={6}
              sm={6}
              md={6}
              xs={6}
              alignContent="left"
              className="contentHeading"
            >
              <Typography variant="body2" color="primary">
                Order Id
              </Typography>
            </Grid>
          )}
          {item && item.orderId && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography
                  variant="body2"
                  color="secondary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <SortAddress address={item?.orderId?.toString()} />
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.withdrawId && (
            <Grid
              item
              lg={6}
              sm={6}
              md={6}
              xs={6}
              alignContent="left"
              className="contentHeading"
            >
              <Typography variant="body2" color="primary">
                Withdraw Id
              </Typography>
            </Grid>
          )}
          {item && item.withdrawId && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body2" color="secondary">
                  <SortAddress address={item?.withdrawId?.toString()} />
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.address && (
            <Grid
              item
              lg={6}
              sm={6}
              md={6}
              xs={6}
              alignContent="left"
              className="contentHeading"
            >
              <Typography variant="body2" color="primary">
                Address
              </Typography>
            </Grid>
          )}
          {item && item.address && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography
                  variant="body2"
                  color="secondary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <SortAddress address={item?.address?.toString()} />
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.sellStatus && (
            <Grid
              item
              lg={6}
              sm={6}
              md={6}
              xs={6}
              alignContent="left"
              className="contentHeading"
            >
              <Typography variant="body2" color="primary">
                Sell Status
              </Typography>
            </Grid>
          )}
          {item && item.sellStatus && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body2" color="secondary">
                  {item &&
                    item.sellStatus &&
                    capitalizeFirstLetter(item?.sellStatus)}
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.depositStatus && (
            <Grid
              item
              lg={6}
              sm={6}
              md={6}
              xs={6}
              alignContent="left"
              className="contentHeading"
            >
              <Typography variant="body2" color="primary">
                Deposit Status
              </Typography>
            </Grid>
          )}
          {item && item.depositStatus && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body2" color="secondary">
                  {item &&
                    item.depositStatus &&
                    capitalizeFirstLetter(item?.depositStatus)}
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.status && (
            <Grid
              item
              lg={6}
              sm={6}
              md={6}
              xs={6}
              alignContent="left"
              className="contentHeading"
            >
              <Typography variant="body2" color="primary">
                Status
              </Typography>
            </Grid>
          )}
          {item && item.status && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body2" color="secondary">
                  {item && item.status && capitalizeFirstLetter(item?.status)}
                </Typography>
              </Box>
            </Grid>
          )}
          {item && item.receiveAmount && (
            <Grid
              item
              lg={6}
              sm={6}
              md={6}
              xs={6}
              alignContent="left"
              className="contentHeading"
            >
              <Typography variant="body2" color="primary">
                Receive Amount
              </Typography>
            </Grid>
          )}
          {item && item.receiveAmount && (
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Box className="contentBox">
                <Typography variant="body2" color="secondary">
                  {item && item.receiveAmount && item?.receiveAmount}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>
    </TransactionBox>
  );
};
