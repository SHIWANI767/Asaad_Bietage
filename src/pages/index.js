import React, { useEffect } from "react";
import { useContext } from "react";
import HomeLayout from "@/layout/HomeLayout";
import { Box, Button, Container, Typography } from "@mui/material";
import CustomHead from "@/components/CustomHead";
import SettingsContext from "@/context/SettingsContext";
import Scroll from "react-scroll";
import Banner from "./home/Banner";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { CgArrowTopRightO } from "react-icons/cg";
import Support from "./home/Support";
import Smarter from "./home/Smarter";
// import Saying from "./home/Saying";
import AppContext from "@/context/AppContext";
import Faq from "./home/Faq";
import Performance from "./home/Performance";
import PriceCard from "@/components/PriceCard";

const Popular = dynamic(() => import("./home/Popular"));
const Video = dynamic(() => import("./home/Video"));
const Build = dynamic(() => import("./home/Build"));
const Secure = dynamic(() => import("./home/Secure"));
const Price = dynamic(() => import("./home/Price"));

export default function HomePage() {
  const auth = useContext(AppContext);
  const router = useRouter();
  const themeSetting = useContext(SettingsContext);
  const background = themeSetting.settings.theme === "DARK" ? "root1" : "root";
  useEffect(() => {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("id")) {
      let param = searchParams.get("id");
      const getdiv = document.getElementById(param);
      const ofsetTop = getdiv.offsetTop - 30;
      var scroll = Scroll.animateScroll;
      scroll.scrollTo(ofsetTop, param);
    }
  }, []);

  return (
    <>
      <CustomHead
        title="Bitedge | Automated Trading Made Easy or build your own"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video="/images/banner.gif"
        isVideo={true}
      />
      <Box>
        <Box className={background}>
          <Banner />
          <Popular />
          <Secure />
          <Box className="pricemain-landing2 pricemain-landing1" align="center">
            <Box mt={4} className="displayCenter">
              <Button
                variant="contained"
                color="primary"
                endIcon={<CgArrowTopRightO />}
                onClick={() => {
                  if (auth.userLoggedIn) {
                    router.push("/dashboard/exchanges");
                  } else {
                    router.push("/auth/signup");
                  }
                }}
              >
                Get Started
              </Button>
            </Box>
            <Performance />
            <Support />
            <Typography
              variant="h2"
              color="primary"
              textAlign="center"
              className="pricemain-landing"
            >
              Plans & Pricing
            </Typography>

            <Box className="textColor" mt={2}>
              <Typography
                variant="body2"
                color="secondary"
                textAlign="center"
                style={{ maxWidth: "600px" }}
              >
                With Bitedge.app, enjoy automated crypto trading at competitive
                prices, ensuring affordability and accessibility for all users.
              </Typography>
            </Box>
            <Box mt={5}>
              <Container maxWidth="lg">
                <PriceCard
                  isViewGrid={
                    router.asPath.includes("/price") ||
                    router.asPath.includes("/pricing")
                  }
                />
              </Container>
            </Box>
            <div id="Pricing">
              <Price />
            </div>
            <Smarter />
            {/* <Saying /> */}

            <Faq />
          </Box>

          <Video />

          {/* <Build /> */}
        </Box>
      </Box>
    </>
  );
}

HomePage.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
