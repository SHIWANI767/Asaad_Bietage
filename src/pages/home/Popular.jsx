import AppContext from "@/context/AppContext";
import { Box, Container, Grid, Typography, styled } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
const Client = dynamic(() => import("./Client"));

const PopularMainBox = styled("div")(({ theme }) => ({
  "& .fastBox": {
    marginBottom: "56px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "36px",
    },
  },
  "& .rulesBox": {
    background: "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)",
    boxShadow: "10px 10px 0px 0px #668B25",
    borderRadius: "40px",
    padding: "40px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px",
    },
  },
  "& h5": {
    fontSize: "18px",
  },
  "& .secureCrad": {
    p: {
      minHeight: "95px",
      maxWidth: "340px",
      [theme.breakpoints.down("sm")]: {
        minHeight: "79px",
      },
    },
  },
}));

const clientData = [
  {
    image: "/images/secure.svg",
    name: "Your Digital Assets Are Secure",
    description:
      "Bitedge.app cannot access or withdraw Digital Assets from your exchange account.",
    href: "/dashboard/setting?type=auto",
  },
  {
    image: "/images/automated.svg",
    name: "API-Key is all you need",
    description:
      "Just enable a secure API connection to link your exchange account, and then proceed to get started. It’s that simple.",
    href: "/dashboard/exchanges",
  },
  {
    image: "/images/easy.svg",
    name: "Quick Orders",
    description:
      "Our servers are situated near popular exchanges to guarantee dependable and quick order fulfillment.",
    href: "/dashboard/exchanges",
  },
];

export default function Popular() {
  const auth = useContext(AppContext);
  const router = useRouter();
  let refCode = router.query.refCode;

  useEffect(() => {
    if (refCode) {
      auth.setRefCode(refCode);
    }
  }, [refCode]);

  return (
    <PopularMainBox>
      <Box className="" style={{ position: "relative" }}>
        <Container>
          <Box className="rulesBox">
            <Box className="fastBox" align="center">
              <Typography
                variant="h2"
                color="rgba(25, 29, 19, 1)"
                style={{ maxWidth: "800px" }}
              >
                Crypto Trading Made Simple and Secure with Bitedge.app
              </Typography>
              <Box mt={2}>
                <Typography
                  variant="body2"
                  color="rgba(25, 29, 19, 0.8)"
                  style={{ maxWidth: "600px" }}
                >
                  Enjoy advanced trading tools with real-time data, all designed
                  to ensure a seamless and secure trading experience for both
                  beginners and experts.
                </Typography>
              </Box>
            </Box>
            <img
              src="/images/line_border.svg"
              className="borderImageBoxLeft"
              alt=""
              onDragStart={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
            />
            <img
              src="/images/line_border.svg"
              className="borderImageBoxRight"
              onDragStart={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              alt=""
            />
            <Grid container spacing={2} mb={3}>
              {clientData.map((data, index, i) => (
                <Grid item xs={12} md={4} sm={6} lg={4} key={index}>
                  <Box className="secureCrad" height="100%" align="center">
                    <Image
                      src={data.image}
                      height={52}
                      width={52}
                      quality={100}
                      alt=""
                      onDragStart={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    <Typography
                      variant="h5"
                      color="rgba(25, 29, 19, 1)"
                      mt={3}
                      mb={1}
                    >
                      {data.space === "break" ? (
                        <>
                          No Code <br /> Required
                        </>
                      ) : (
                        data.name
                      )}
                    </Typography>
                    <Typography variant="body2" color="rgba(25, 29, 19, 0.6)">
                      {data.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Client />
          </Box>
        </Container>
      </Box>
    </PopularMainBox>
  );
}
