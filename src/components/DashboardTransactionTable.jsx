import React from "react";
import { styled, useMediaQuery, useTheme } from "@mui/material";
import { Typography } from "@mui/material";
import moment from "moment";
import TableComp from "@/components/TableComp";
import { capitalizeFirstLetter, setCryptoDecimals } from "@/utils";
const MainBox = styled("div")(({ theme }) => ({
  "& .MuiTableCell-root": {
    padding: "25px 16px",
  },
}));

const tableHead = [
  { heading: "S. No." },
  { heading: "Exchange" },
  { heading: "Capital" },
  { heading: "Trade Type" },
  { heading: "Profit/Loss (USDT)" },
  { heading: "Open Time" },
  { heading: "Close Time" },
];

function DashboardTransactionTable({ isLoading, arbitrageData, tabView }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <MainBox>
      <TableComp
        maxHeight={"calc(100dvh - 400px)"}
        tableHead={tableHead}
        scoreListData={
          arbitrageData &&
          arbitrageData?.map((value, i) => ({
            "S. No.": i + 1,
            Exchange:
              tabView === "listPlacedDirectTradeWithFilter"
                ? `${
                    value.connectedExchangeId1
                      ? capitalizeFirstLetter(value.connectedExchangeId1.uid)
                      : ""
                  }/${
                    value.connectedExchangeId2
                      ? capitalizeFirstLetter(value.connectedExchangeId2.uid)
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
            "Trade Type": (
              <Typography
                variant="h6"
                className="displayCenter"
                sx={{
                  color: "#1CA03F",
                  fontSize: "12px",
                  background: "rgba(40, 41, 40, 1)",
                  borderRadius: "10px",
                  width: "fit-content",
                  padding: "4px 6px",
                }}
              >
                Completed
              </Typography>
            ),
            "Profit/Loss (USDT)": (
              <Typography
                variant="h6"
                sx={{
                  color:
                    value?.profit > 0
                      ? "rgba(75, 214, 91, 1)"
                      : "rgba(220, 4, 4, 1)",

                  fontSize: "12px",
                }}
              >
                {value?.profit ? setCryptoDecimals(value?.profit) : "-"}
              </Typography>
            ),
            "Open Time": isMobile
              ? moment(value?.createdAt).format(" DD MMM YY, h:mm a")
              : moment(value?.createdAt).format("lll"),
            "Close Time": isMobile
              ? moment(value?.updatedAt).format(" DD MMM YY, h:mm a")
              : moment(value?.updatedAt).format("lll"),
          }))
        }
        isLoading={isLoading}
      />
    </MainBox>
  );
}
export default React.memo(DashboardTransactionTable);
