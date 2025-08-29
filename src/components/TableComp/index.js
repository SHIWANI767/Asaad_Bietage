import React, { useState } from "react";
import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  IconButton,
  Pagination,
  styled,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import TopTradingSkeleton from "../Skeletons/TopTradingSkeleton";
import NoDataFound from "../NoDataFound";
import { sortAddressStart } from "@/utils";
import { CheckOutlined } from "@mui/icons-material";
import toast from "react-hot-toast";
import CustomTable from "@/pages/dashboard/transaction-history/CustomTable";
import { LuCopy } from "react-icons/lu";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const BoxCent = styled("div")(({ theme }) => ({
  // textTransform: "uppercase",
  display: "flex",
  alignItems: "center",
}));
const MainComponent = styled(Box)(({ theme }) => ({
  background: "transparent !important",
  border: "none",
  padding: "10px 0 0 0",
  "& .MuiTableHead-root": {
    "& .MuiTableCell-root": {
      fontSize: "16px",
      fontWeight: 500,
    },
  },
  "& .tableContainer": {
    "& .MuiIconButton-root": {
      color: "rgb(255 202 100)",
      "& svg": {
        paddingRight: "0px !important",
      },
      // marginRight: "20px",
    },
  },
  // "& .rowOdd": {
  //   background: "rgba(255, 255, 255, 0.04)",
  //   maxWidth: "220px",
  //   overflow: "hidden",
  //   textOverflow: "ellipsis",
  //   whiteSpace: "nowrap",
  // },
  // "& .rowEven": {
  //   background: theme.palette.background.tooltrip,
  //   maxWidth: "220px",
  //   overflow: "hidden",
  //   textOverflow: "ellipsis",
  //   whiteSpace: "nowrap",
  // },
  "& .MuiTableRow-root": {
    borderBottom: "1px solid #ccc", // Add border bottom for all rows
  },
  "& .MuiTableContainer-root": {
    maxHeight: "calc(100dvh - 300px)",
    // .css-41abqd-MuiTableContainer-root
    //     max-height: calc(100dvh - 300px);
  },
}));

function TableComp({
  tableHead,
  scoreListData,
  noOfPages,
  page,
  setPage,
  isLoading,
  NoDataFoundText = "No data found",
  maxHeight = "calc(100dvh - 400px)",
  isMobileAdaptive,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <MainComponent>
      {isMobileAdaptive && isMobile ? (
        <CustomTable tableHead={tableHead} scoreListData={scoreListData} />
      ) : (
        <TableContainer
          className={"tableContainer"}
          style={{ maxHeight: maxHeight }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow
              // sx={{
              //   // background: "#2f2f2f",
              //   background: (theme) =>
              //     theme.palette.mode === "dark" ? "#2f2f2f" : "#e5e5e5",
              // }}
              >
                {tableHead.map((head, index) =>
                  head.isNotShow ? null : (
                    <TableCell
                      // sx={{
                      //   paddingLeft: "20px",
                      //   background: (theme) =>
                      //     theme.palette.mode === "dark" ? "#2f2f2f" : "#e5e5e5",
                      // }}
                      key={index}
                      align="left"
                    >
                      {head.heading}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {scoreListData &&
                scoreListData.map((data, i) => (
                  <TableRow
                    key={i}
                    className={i % 2 === 0 ? "rowEven" : "rowOdd"}
                  >
                    {tableHead?.map((head, index) =>
                      head.isNotShow ? null : (
                        <StyledTableCell
                          data={data}
                          head={head}
                          index={index}
                          isMobile={isMobile}
                        />
                      )
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {isLoading &&
        [1, 2, 3].map((itm) => (
          <TopTradingSkeleton
            key={itm}
            skeleton={tableHead}
            isMobile={isMobile}
          />
        ))}
      {!isLoading && scoreListData && scoreListData.length === 0 && (
        <NoDataFound text={NoDataFoundText} />
      )}
      {!isLoading && noOfPages > 1 && (
        <Box my={2} display="flex" justifyContent="end">
          <Pagination
            count={noOfPages}
            page={page}
            StyledTextMessage
            onChange={(e, value) => setPage(value)}
            variant="outlined"
          />
        </Box>
      )}
    </MainComponent>
  );
}
const StyledTableCell = ({ data, head, index, isMobile }) => {
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

  return (
    <TableCell
      key={index}
      sx={{
        paddingLeft: "20px",
        padding: isMobile ? "8px 10px!important" : "8px 12px!important",
      }}
      align="left"
    >
      {head?.heading === "Action" ? (
        data[head?.heading]?.map((action, idx) =>
          action?.onClick ? (
            <IconButton
              size="small"
              key={idx}
              onClick={action?.onClick}
              disabled={!action?.icon}
              sx={{
                height: isMobile ? "20px" : "40px",
                width: isMobile ? "20px" : "40px",
                "& svg": {
                  fontSize: isMobile ? "14px" : "18px",
                },
              }}
            >
              {action?.icon}
            </IconButton>
          ) : (
            action?.icon
          )
        )
      ) : head?.isCopy ? (
        data[head?.heading] && (
          <BoxCent>
            {data[head?.heading] === "N/A" ? (
              <span
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                ...
              </span>
            ) : (
              <>
                {data[head?.heading] ? (
                  <>
                    <span>{sortAddressStart(data[head?.heading])}</span>
                    {copied ? (
                      <IconButton disabled>
                        <CheckOutlined
                          style={{
                            fontSize: "15px",
                          }}
                        />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => handleCopyClick(data[head?.heading])}
                      >
                        <ContentCopyIcon
                          sx={{
                            cursor: "pointer",
                            fontSize: "15px",
                            color: (theme) => theme.palette.primary.main,
                          }}
                        />
                      </IconButton>
                    )}
                  </>
                ) : (
                  "..."
                )}
              </>
            )}
          </BoxCent>
        )
      ) : (
        <>{data[head?.heading] || "..."}</>
      )}
    </TableCell>
  );
};
export default TableComp;
