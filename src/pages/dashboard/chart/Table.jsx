import React from "react";

import {
  Box,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  IconButton,
  Grid,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
const SettingProfileBox = styled(Box)(({ theme }) => ({
  "& .viewButton": {
    borderRadius: "50px",
    border: "1px solid rgb(37, 177, 255) !important",
    padding: "6px 20px !important",
    background: "rgba(37, 177, 255, 0.05)",
    color: "#25B1FF !important",
  },
  "& .MuiTableCell-root": {
    fontSize: "12px",
    color: "rgba(255, 255, 255, 0.60)",
  },
  "& .MuiTableHead-root": {
    height: "57px",
    background: "rgb(255 255 255 / 12%)",
    display: "table-header-group",
  },
  "& .MuiTableRow-root": {
    borderRadius: "20px 0px 0px 0px",
  },
  "& .MuiTableBody-root": {
    background: "transparent",
  },
  "& .filterpaper": {
    padding: "22px 30px 40px",
    minHeight: "200px",
    "& p": {
      fontSize: "16px",
    },
  },
  "& .flexBox": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export default function UserManagment({ askBid }) {
  return (
    <SettingProfileBox>
      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow alignItems="center">
                <TableCell>Market</TableCell>
                <TableCell>Last</TableCell>
                <TableCell>Ask</TableCell>
                <TableCell>Bid</TableCell>
                <TableCell>Spread</TableCell>
                <TableCell>Volume</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>{askBid?.symbol}</TableCell>
                <TableCell>
                  {Number(askBid?.high) > Number(askBid?.low) ? (
                    <Box style={{ color: "#0CA51C" }}> {askBid?.high}</Box>
                  ) : (
                    <Box style={{ color: "#EF2114" }}> {askBid?.low}</Box>
                  )}
                </TableCell>
                <TableCell>{askBid}</TableCell>
                <TableCell>{askBid?.volume}</TableCell>

                <TableCell>{askBid?.volume}</TableCell>
                <TableCell>{askBid?.volume}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </SettingProfileBox>
  );
}
