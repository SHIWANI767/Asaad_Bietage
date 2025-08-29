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
// import { Pagination } from "@material-ui/lab";
import moment from "moment";
import { sortAddress } from "@/utils";
// import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";
import { AiOutlineCopy } from "react-icons/ai";
import DataLoader from "@/components/DataLoader";
import NoDataFoundFrame from "@/components/NoDataFoundFrame";

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

export default function WithdrawHistory({
  noOfPages,
  page,
  setPage,
  withdrawalHistory,
  isLoading,
}) {
  // const classes = useStyles();
  return (
    <MainBox>
      <TableContainer className={"tableContainer"} style={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow
              sx={{
                background: (theme) =>
                  theme.palette.mode === "dark" ? "#2f2f2f" : "#e5e5e5",
                "MuiTableCell-root": {
                  paddingLeft: "20px",
                  background: (theme) =>
                    theme.palette.mode === "dark" ? "#2f2f2f" : "#e5e5e5",
                },
              }}
            >
              <TableCell>Sr. No</TableCell>
              <TableCell>Exchange Name</TableCell>
              <TableCell>Coin Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Transaction Fee</TableCell>
              <TableCell>Withdraw ID</TableCell>
              <TableCell>Withdraw Amount</TableCell>
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
                  <TableCell>{sortAddress(value?.address)} </TableCell>
                  <TableCell>
                    {value.transactionFee ? value.transactionFee : "N/A"}
                  </TableCell>
                  <TableCell>{sortAddress(value?.withdrawId)} </TableCell>
                  <TableCell>{value.amount}</TableCell>
                  <TableCell>{moment(value.createdAt).format("LLL")}</TableCell>
                  <TableCell>{value.withdrawStatus}</TableCell>
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
              // rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={noOfPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              // rowsPerPage={rowsPerPage}
              // onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )} */}
      </TableContainer>
    </MainBox>
  );
}
