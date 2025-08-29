import {
  Box,
  TableRow,
  styled,
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  IconButton,
  TablePagination,
  Pagination,
} from "@mui/material";
import React from "react";
import moment from "moment";
import { fixDecimal, sortAddress } from "@/utils";
// import CopyToClipboard from "react-copy-to-clipboard";
import NoDataFoundFrame from "@/components/NoDataFoundFrame";
import DataLoader from "@/components/DataLoader";

const MainBox = styled("div")(({ theme }) => ({
  "& .tableBox": {
    minWidth: "800px",
  },
  "& .rowOdd": {
    background: "rgba(255, 255, 255, 0.04)",
  },
  "& .rowEven": {
    background: theme.palette.background.tooltrip,
  },
}));

export default function Deposite({
  noOfPages,
  page,
  setPage,
  withdrawalHistory,
  isLoading,
  isDeposit,
}) {
  return (
    <MainBox>
      <TableContainer>
        <Table className={"tableBox"}>
          <TableHead>
            <TableRow>
              <TableCell>Sr. No</TableCell>

              <TableCell>
                {isDeposit ? "Transaction Hash" : "Adaptive Quantum AI Name"}
              </TableCell>

              <TableCell>Coin Name</TableCell>
              {isDeposit && <TableCell>Address</TableCell>}
              <TableCell>Deposit Amount</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {withdrawalHistory &&
              withdrawalHistory?.map((value, i) => (
                <TableRow
                  key={i}
                  className={i % 2 === 0 ? "rowEven" : "rowOdd"}
                >
                  <TableCell>{i + 1}</TableCell>

                  <TableCell>
                    {/* <SortAddress address={value.transactionHash} />{" arbitrageName "} */}
                    {isDeposit
                      ? value?.transactionHash
                        ? sortAddress(value?.transactionHash)
                        : ""
                      : value?.arbitrageName
                      ? value?.arbitrageName
                      : ""}{" "}
                  </TableCell>

                  <TableCell>
                    {" "}
                    {value?.coinName ? value?.coinName : ""}
                  </TableCell>

                  {isDeposit && (
                    <TableCell>
                      {value?.fromAddress
                        ? sortAddress(value?.fromAddress)
                        : "-"}{" "}
                    </TableCell>
                  )}

                  <TableCell>
                    {value?.amount ? fixDecimal(value?.amount) : "N/A"}{" "}
                    {value?.coinName ? value?.coinName : ""}
                  </TableCell>
                  <TableCell>{moment(value.createdAt).format("LLL")}</TableCell>
                  <TableCell>{value?.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {isLoading && withdrawalHistory?.length === 0 && <DataLoader />}
        {!isLoading && withdrawalHistory?.length === 0 && (
          <NoDataFoundFrame data={"No data found"} />
        )}

        {!isLoading &&
          withdrawalHistory &&
          withdrawalHistory?.length !== 0 &&
          noOfPages > 1 && (
            <Box mt={1} display="flex" justifyContent="end">
              <Pagination
                count={noOfPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                variant="outlined"
                shape="rounded"
              />
            </Box>
          )}
      </TableContainer>
    </MainBox>
  );
}
