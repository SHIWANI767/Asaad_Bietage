import React from "react";
import {
  TableContainer,
  Table,
  Box,
  TableCell,
  TableBody,
  TableRow,
  Skeleton,
} from "@mui/material";

export default function TopTradingSkeleton({ skeleton, isMobile }) {
  return (
    <Box className={"classes.PostBox"}>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              {skeleton &&
                skeleton
                  .slice(0, isMobile ? 3 : skeleton.length)
                  ?.map((data) => (
                    <TableCell>
                      <Skeleton animation="wave" height={25} width="100%" />
                    </TableCell>
                  ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
