import { Box, Divider, Typography, styled } from "@mui/material";
import Image from "next/image";
import React from "react";

const CryptoDetailsBox = styled("div")(({ theme }) => ({}));

// const useStyles = makeStyles((theme) => ({
//   mainBox: {
//     "& .imageBox": {
//       "& img": {
//         width: "100%",
//       },
//     },
//   },
// }));

const CryptoDetails = ({ recentData }) => {
  // const classes = useStyles();
  return (
    <CryptoDetailsBox>
      <Box mt={1} className="mainBox displaySpacearound">
        <Box>
          <Typography variant="h2">
            {recentData?.topPerformingCrypto?.profit === 0
              ? "0"
              : recentData?.topPerformingCrypto?.profit.toFixed(5)}
          </Typography>
          <Typography variant="overline" style={{ marginLeft: "8px" }}>
            ({recentData?.topPerformingCrypto?.crypto})
          </Typography>
        </Box>
        <Divider
          style={{
            border: "1px solid #444444",
            height: "110px",
            marginTop: "16px",
          }}
        />
        <Box className="displayColumn">
          <Box className="imageBox">
            <Image
              height={44}
              width={28}
              onDragStart={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              src="/images/etherum.png"
              alt="etherum"
            />
          </Box>
          <Typography variant="overline">ETHEREUM</Typography>
        </Box>
      </Box>
    </CryptoDetailsBox>
  );
};

export default CryptoDetails;
