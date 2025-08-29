import {
  Box,
  Typography,
  Paper,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "@/context/AppContext";
import DashboardLayout from "@/layout/DashboardLayout";
import { useRouter } from "next/router";
import { getAPIHandler } from "@/api-services/service";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import moment from "moment";
import { convertArrayToXLSX, setCryptoDecimals } from "@/utils";
import SortAddress from "@/utils/SortAddress";
import MainFilter from "@/components/MainFilter";
import dynamic from "next/dynamic";
const CustomHead = dynamic(() => import("@/components/CustomHead"));
const TableComp = dynamic(() => import("@/components/TableComp"));
const QRCodeGenerator = dynamic(() => import("@/components/QRCodeGenerator"));
const Popup = dynamic(() => import("@/components/DynamicModel"));

const SubscriptionPlanStyle = styled("div")(({ theme }) => ({
  "& subscribtionBox": {
    position: "relative",
    zIndex: "999",
    "& .MuiIconButton-root": {
      padding: "0px",
    },

    "& .typoBox": {
      padding: "10px 0px 30px",
    },
    "& .invitebutton": {
      marginRight: "-13px",
      padding: "24px 39px",
    },
    "& .paperBox": {
      padding: "80px 30px",
      boredrRadius: "5px",
    },
    "& .invitelistBox": {
      padding: "30px 0px 10px",
      display: "flex",
      justifyContent: "space-between",
      textAlign: "center",
    },
    "& .tablepadding": {
      margin: "50px 0px 20px",
      [theme.breakpoints.down("xs")]: {
        margin: "20px 0px",
      },
    },
  },
  "& .tableBox": {
    minWidth: "800px",
  },
  "& .rowEven": {
    background: "rgb(16 21 17)",
  },
}));
const DialogeBox = styled("div")(({ theme }) => ({
  "& .mainBox": {
    // padding: "25px",
  },
  "& .imgBox": {
    display: "flex",
    justifyContent: "center",
    "& canvas": {
      position: "relative",
      height: "160px",
      width: "160px",
      maxWidth: "300px",
      width: "100%",
    },
  },
}));
const tableHead = [
  {
    heading: "Sr. No",
    isMobile: true,
    column: 0,
  },
  {
    heading: "Subscription Name",
    isMobile: true,
    column: 0,
  },
  {
    heading: "Subscription Name",
  },
  {
    heading: "Order Id",
    isCopy: true,
    isMobile: true,
    column: 0,
  },
  {
    heading: "Pay Amount",
    isMobile: true,
    column: 1,
  },
  {
    heading: "Pay Address",
    isCopy: true,
    isMobile: true,
    column: 1,
  },
  {
    heading: "Plan Price",
    isMobile: true,
    column: 1,
  },
  // {
  //   heading: "Pay Currency",
  //   isMobile: true,
  //   column: 0,
  // },
  {
    heading: "Subscription Id",
    isCopy: true,
    isMobile: true,
    column: 0,
  },
  {
    heading: "Pay Status",
    // isMobile: true,
    // column: 1,
  },
  {
    heading: "Payment Type",
    // isMobile: true,
    // column: 1,
  },
  {
    heading: "barStatus",
    isMobile: false,
    isNotShow: true,
  },
  {
    heading: "Start Time",
    isMobile: true,
    column: 2,
  },
  { heading: "End Time", isMobile: true, column: 2 },
  {
    heading: "Plan Status",
    isMobile: true,
    column: 2,
    isNotShow: false,
  },
  // { heading: "Action", isActionName: "Qr Code", isMobile: true, column: 2 },
];
export default function MyPlan() {
  const auth = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [invitePlan, setinvitePlan] = useState([]);
  const router = useRouter();
  const subscriptionDataParticular =
    router.query.data && JSON.parse(router.query.data);
  const [numPages, setNumPages] = useState(1);
  const [subscribeList, setSubscribeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClear, setIsClear] = useState(false);
  const [isClearData, setIsClearData] = useState(true);
  const [isDownLoading, setisDownLoading] = useState(false);
  const theme = useTheme();
  // console.log(" ------------- theme ", theme);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [filtersData, setFiltersData] = useState({
    fromDate: null,
    toDate: null,
    search: "",
    planStatus: "1",
    paymentStatus: "1",
  });
  const [open, setOpen] = useState(false);
  const [popValue, setPopValue] = useState({});
  const HandlePopup = (value) => {
    setPopValue(value);
    setOpen(true);
  };
  const viewSubscriptionListApi = async (source) => {
    try {
      setIsClear(false);
      setIsLoading(true);
      const response = await getAPIHandler({
        endPoint: "myPlan",
        paramsData: {
          userId: subscriptionDataParticular?.subscriptionId,
          search: filtersData?.search ? filtersData?.search : null,
          page: page,
          limit: isMobile ? "5" : "10",
          planStatus:
            filtersData?.planStatus !== "1" ? filtersData?.planStatus : null,
          paymentStatus:
            filtersData?.paymentStatus !== "1"
              ? filtersData?.paymentStatus
              : null,
          fromDate: filtersData.fromDate
            ? moment(filtersData.fromDate).format("YYYY-MM-DD")
            : null,
          toDate: filtersData.toDate
            ? moment(filtersData.toDate).format("YYYY-MM-DD")
            : null,
        },
        source: source,
      });
      if (response.data.responseCode === 200) {
        setIsClear(false);
        let dataReponse = response.data.result.docs?.map((data) => ({
          order_id: data.order_id,
          pay_amount: data.pay_amount,
          pay_currency: data.pay_currency,
          payment_id: data.payment_id,
          payment_status: data.payment_status,
          planStatus: data.planStatus,
          paymentType: data.paymentType,
          startTime: data.startTime,
          endTime: data.endTime,
        }));
        setinvitePlan(dataReponse);
        setNumPages(response.data.result?.pages);
        setSubscribeList(response.data.result?.docs);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      setSubscribeList([]);
      setNumPages(1);
      setIsLoading(false);
    }
  };
  const onDownload = async () => {
    try {
      setisDownLoading(true);
      const response = await getAPIHandler({
        endPoint: "myPlan",
        paramsData: {
          userId: subscriptionDataParticular?.subscriptionId,
          search: filtersData?.search ? filtersData?.search : null,
          page: 1,
          limit: numPages,
          planStatus:
            filtersData?.planStatus !== "1" ? filtersData?.planStatus : null,
          paymentStatus:
            filtersData?.paymentStatus !== "1"
              ? filtersData?.paymentStatus
              : null,
          fromDate: filtersData.fromDate
            ? moment(filtersData.fromDate).format("YYYY-MM-DD")
            : null,
          toDate: filtersData.toDate
            ? moment(filtersData.toDate).format("YYYY-MM-DD")
            : null,
        },
      });
      if (response.data.responseCode === 200) {
        let dataReponse = response.data.result.docs?.map((value, i) => ({
          "Sr. No": i + 1,
          "Subscription Name": value?.subScriptionPlanId?.title
            ? value?.subScriptionPlanId?.title
            : "-",
          "Order Id": value?.order_id ? value?.order_id : "-",
          "Pay Amount": value?.pay_amount
            ? value?.pay_amount + " " + value["pay_currency"].toUpperCase()
            : "-",
          "Plan Price": value?.price_amount
            ? value?.price_amount + " " + value["price_currency"].toUpperCase()
            : "-",
          "Pay Currency":
            value && value.pay_currency
              ? value["pay_currency"].toUpperCase()
              : "-",
          "Pay Address": value?.pay_address ? value?.pay_address : "-",
          "Subscription Id": value?.subScriptionPlanId._id
            ? value?.subScriptionPlanId._id
            : "-",
          "Pay Status": value?.payment_status
            ? setCryptoDecimals(value?.payment_status)
            : "-",
          "Plan Status": value?.planStatus ? value?.planStatus : "-",
          "Payment Type": value?.paymentType ? value?.paymentType : "-",
          barStatus: value?.planStatus
            ? value?.planStatus === "waiting"
              ? "PENDING"
              : value?.payment_status === "failed"
              ? "FAILED"
              : "Success"
            : "-",
          "Start Time":
            value?.payment_status === "waiting"
              ? "Payment Pending"
              : value?.payment_status === "failed"
              ? "Payment failed"
              : moment(value?.startTime).format("lll"),
          "End Time":
            value?.payment_status === "waiting"
              ? "Payment Pending"
              : value?.payment_status === "failed"
              ? "Payment failed"
              : moment(value?.endTime).format("lll"),
        }));

        convertArrayToXLSX(dataReponse, "my_plan");
        setisDownLoading(false);
      }
      setisDownLoading(false);
    } catch (error) {
      setisDownLoading(false);
    }
  };
  const handleClearFilter = () => {
    if (!isClearData) {
      setFiltersData({
        ...filtersData,
        ["fromDate"]: null,
        ["toDate"]: null,
        ["search"]: "",
        ["paymentStatus"]: "1",
        ["planStatus"]: "1",
      });
      // viewSubscriptionListApi();
      setPage(1);
      setIsClear(true);
      setIsClearData(true);
    }
  };
  useEffect(() => {
    const source = axios.CancelToken.source();
    viewSubscriptionListApi(source, page);
    return () => {
      source.cancel();
    };
  }, [subscriptionDataParticular?.subscriptionId, page, isMobile]);

  useEffect(() => {
    if (isClear) {
      viewSubscriptionListApi("", page);
    }
  }, [isClear]);

  useEffect(() => {
    if (auth?.topHeading) {
      auth?.setTopHeading("My Plan List");
    }
  }, []);
  return (
    <SubscriptionPlanStyle>
      <CustomHead
        title="My Plans | Bitedge"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Box className="subscribtionBox">
        <Box mb={3}>
          <Paper elevation={2}>
            <MainFilter
              filter={filtersData}
              setFilter={(data) => {
                setFiltersData(data);
                setIsClearData(false);
              }}
              clearFilters={handleClearFilter}
              onClickFun={() => {
                viewSubscriptionListApi("", 1);
                setIsClearData(false);
              }}
              userData={invitePlan}
              placeholder="Search by plan name"
              type="transactionMgmt"
              fileNames={"my_plans"}
              limit={subscribeList.length}
              onDownload={onDownload}
              isDownLoading={isDownLoading}
            />
          </Paper>
        </Box>

        <Paper elevation={2}>
          <TableComp
            tableHead={tableHead}
            isMobileAdaptive={true}
            scoreListData={
              subscribeList &&
              subscribeList.map((value, i) => ({
                "Sr. No": (page - 1) * 10 + i + 1,
                "Subscription Name": value?.subScriptionPlanId?.title
                  ? value?.subScriptionPlanId?.title
                  : "",
                "Order Id": value?.order_id ? value?.order_id : "",
                "Pay Amount": value?.pay_amount
                  ? value?.pay_amount +
                    " " +
                    value["pay_currency"].toUpperCase()
                  : "",
                "Plan Price": value?.price_amount
                  ? value?.price_amount +
                    " " +
                    value["price_currency"].toUpperCase()
                  : "",
                "Pay Currency":
                  value && value.pay_currency
                    ? value["pay_currency"].toUpperCase()
                    : "",
                "Pay Address": value?.pay_address ? value?.pay_address : "",
                "Subscription Id": value?.subScriptionPlanId._id
                  ? value?.subScriptionPlanId._id
                  : "",
                "Pay Status": value?.payment_status
                  ? setCryptoDecimals(value?.payment_status)
                  : "-",
                "Plan Status": value?.planStatus ? value?.planStatus : "-",
                "Payment Type": value?.paymentType ? value?.paymentType : "-",
                barStatus: value?.planStatus
                  ? value?.planStatus === "waiting"
                    ? "PENDING"
                    : value?.payment_status === "failed"
                    ? "FAILED"
                    : "Success"
                  : "-",
                "Start Time":
                  value?.payment_status === "waiting"
                    ? "Payment Pending"
                    : value?.payment_status === "failed"
                    ? "Payment failed"
                    : moment(value?.startTime).format("lll"),
                "End Time":
                  value?.payment_status === "waiting"
                    ? "Payment Pending"
                    : value?.payment_status === "failed"
                    ? "Payment failed"
                    : moment(value?.endTime).format("lll"),
                Action: [
                  {
                    icon: (
                      <RemoveRedEyeIcon
                        sx={{
                          color: (theme) => {
                            const isPaymentPending =
                              value?.payment_status === "waiting";
                            return isPaymentPending
                              ? theme.palette.primary.main
                              : "gray";
                          },
                          pointerEvents:
                            value?.payment_status === "waiting"
                              ? "auto"
                              : "none",
                        }}
                      />
                    ),
                    onClick: () => {
                      if (value?.payment_status === "waiting") {
                        HandlePopup(value);
                      }
                    },
                    disabled:
                      value?.payment_status === "waiting" ? false : true,
                  },
                ],
              }))
            }
            noOfPages={numPages}
            noOfTotalPages={numPages}
            page={page}
            setPage={setPage}
            limit={10}
            isLoading={isLoading}
            NoDataFoundText="No subscription purchased"
          />
        </Paper>
      </Box>
      {open && (
        <TransactionViewModal
          open={open}
          close={() => setOpen(false)}
          data={popValue}
        />
      )}
    </SubscriptionPlanStyle>
  );
}

MyPlan.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

const TransactionViewModal = ({ close, open, data, tab }) => {
  // console.log(" ---------- data ", data);
  return (
    <Popup
      maxWidth={"sm"}
      open={open}
      handleClose={close}
      title={`View Buy Plan (${
        data?.subScriptionPlanId?.title
          ? data?.subScriptionPlanId?.title?.slice(0, 10)
          : ""
      }  )`}
      // children=""
      actions={[
        {
          label: "Close",
          onClick: () => close(),
          color: "secondary",
          variant: "contained",
        },
      ]}
      titleIcon=""
      isLoading=""
      isRemove=""
    >
      <DialogeBox>
        <Box className="imgBox">
          {data?.pay_address && (
            <QRCodeGenerator qrCodeText={data?.pay_address} />
          )}
        </Box>
        <Box className="imgBox" mt={1}>
          <Typography variant="body2" color="primary">
            Amount to pay: &nbsp; {data.pay_amount}{" "}
            {data.pay_currency?.toUpperCase()}
          </Typography>
        </Box>
        <Box className="imgBox" mt={1}>
          <Typography variant="body2" color="primary" className="displayCenter">
            Address to pay: &nbsp; <SortAddress address={data?.pay_address} />
          </Typography>
        </Box>
      </DialogeBox>
    </Popup>
  );
};
