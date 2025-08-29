// "use server";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
// import { useRouter } from "next/router";
import DashboardLayout from "@/layout/DashboardLayout";
import AppContext from "@/context/AppContext";
import Image from "next/image";

import dynamic from "next/dynamic";
const CustomHead = dynamic(() => import("@/components/CustomHead"));
const ExchangeTab = dynamic(() => import("./ExchangeTab"));
// import ExchangeTab from "./ExchangeTab";
// import CustomHead from "@/components/CustomHead";

export default function ExchangeMain(props) {
  // const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const auth = useContext(AppContext);
  useEffect(() => {
    if (!props?.is_exchange) {
      setIsConnected(true);
    }
  }, [props]);

  useEffect(() => {
    async function fetchData() {
      // "use server";
      const token = window.localStorage.getItem("user_token");
      try {
        const response = await fetch("/api/ExchangeList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const data = await response.json();
        console.log(" ExchangeList data: ------- ", data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    // fetchData();
  }, []);
  useEffect(() => {
    if (auth?.topHeading) {
      auth?.setTopHeading("Exchange");
    }
  }, []);

  return (
    <>
      <CustomHead
        title="Exchange | Bitedge"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      {props?.is_exchange && !isConnected && (
        <Paper elevation={2}>
          <Box sx={{ textAlign: "center" }} className="exchangemainBox">
            <Container maxWidth="sm">
              <Box sx={{ textAlign: "center" }} className="flexdirection">
                <Image
                  height={106}
                  width={106}
                  onDragStart={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  src="/images/exchange_icon.svg"
                  alt="MoneyIcon"
                />
                <Typography variant="body12" color="primary" fontSize="16px">
                  Add your first exchange account &nbsp;!
                </Typography>
                <Typography variant="body2" color="secondary" mt={1}>
                  You haven't created or added any exchange accounts yet. Use
                  the button below to add an account for trading.
                </Typography>
                <Box mt={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    // onClick={() => router.push("/exchange-tab")}
                    onClick={() => setIsConnected(true)}
                  >
                    Add New Exchange
                  </Button>
                </Box>
              </Box>
            </Container>
          </Box>
        </Paper>
      )}{" "}
      {isConnected && <ExchangeTab />}
      {/* {isConnected && <ExchangeTab />} */}
    </>
  );
}

ExchangeMain.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps({ req }) {
  const isExchange = req.cookies.is_exchange === "0";
  const token = req.cookies.user_token;

  // const user = { id: 1, name: "User" }; // Example user data

  // Generate token server-side
  // const tokenssss = jwt.sign(user, process.env.DOCUSEAL_TOKEN);
  // console.log("token: tokenssss new ----------", tokenssss);

  return {
    props: { is_exchange: isExchange },
  };
}
