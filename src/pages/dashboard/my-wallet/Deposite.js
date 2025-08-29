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
import { sortAddress } from "@/utils";
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
}) {
  return (
    <MainBox>
      <TableContainer className={"tableContainer"} style={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Sr. No</TableCell>
              <TableCell>Exchange Name</TableCell>
              <TableCell>Coin Name</TableCell>
              <TableCell>Address</TableCell>
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
                  <TableCell>{value.exchangeName}</TableCell>
                  <TableCell>{value.coin ? value.coin : "N/A"}</TableCell>

                  <TableCell>
                    {value?.address ? sortAddress(value?.address) : "-"}{" "}
                  </TableCell>

                  <TableCell>{value?.amount ? value?.amount : "N/A"}</TableCell>
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
                count={3}
                page={page}
                onChange={(e, value) => setPage(value)}
                variant="outlined"
                shape="rounded"
              />
            </Box>
          )}

        {/* {!isLoading &&
          withdrawalHistory &&
          withdrawalHistory?.length >= (page === 1 ? 15 : 0) && (
            <TablePagination
              component="div"
              count={noOfPages}
              page={page}
              onChange={(e, value) => setPage(value)}
            />
          )} */}
      </TableContainer>
    </MainBox>
  );
}
