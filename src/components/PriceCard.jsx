import dynamic from "next/dynamic";
import { useMemo, useState, useContext, useEffect } from "react";
import { Container, Box, Grid } from "@mui/material";
import axios from "axios";
import { styled } from "@mui/system";
import HomeLayout from "@/layout/HomeLayout";
import { api_configs } from "@/api-services";
import NoDataFound from "./NoDataFound";
import Carousel from "react-multi-carousel";
import AppContext from "@/context/AppContext";
import "react-multi-carousel/lib/styles.css";

const PricingComponentsCard = dynamic(() => import("./PricingComponentsCard"), {
  ssr: false,
});
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1600 },
    items: 3,
  },
  largeDesktop: {
    breakpoint: { max: 1599, min: 1280 },
    items: 4,
  },
  largeDesktop: {
    breakpoint: { max: 3000, min: 1280 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1280, min: 1024 },
    items: 3,
  },
  smallTablet: {
    breakpoint: { max: 768, min: 769 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 767, min: 499 },
    items: 1,
  },
  smallMobile: {
    breakpoint: { max: 499, min: 1 },
    items: 1,
  },
};
const CurrentPlanBox = styled("div")(({ theme }) => ({
  "& .descripborder": {
    borderBottom: "1px solid #8080804a",
    padding: "10px 0 15px",
  },

  "& .pricepaper": {
    padding: "0px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "56px",
    },
  },
  "& .filterpaper": {
    padding: "22px 30px 40px",
    minHeight: "200px",
  },
  "& .textColor": {
    "& p": {
      width: "100%",
      maxWidth: "515px",
      margin: "0 auto",
      padding: "14px 0px",
    },
  },
  "& .featureControl": {
    minHeight: "294px",
  },
  "& .paperMain": {
    padding: "30px !important",
    minHeight: "520px",
    height: "98%px",
  },
  "& .bottomButtonBox": {
    position: "absolute",
    left: "17%",
    bottom: "15px",
    transform: "translate(50%, 8px)",
  },
  "& .paperBox1": {
    position: "relative",
    margin: "10px",
    height: "98%",
    padding: "0 !important",
    [theme.breakpoints.down("sm")]: {
      // margin: "5px",
    },
    "& svg": {
      color: theme.palette.text.secondary,
    },
    "& h4": {
      fontWeight: "700",
    },
    "& button": {
      width: "140px",
      "&:hover": {
        color: "#000",
        // boxShadow: "10px 10px 0px 0px #668B25",dsgdg
      },
    },
    "&:hover": {
      boxShadow: "10px 10px 0px 0px #668B25",
      background: "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)",
      "& h5": {
        color: "#191D13",
      },
      "& h4": {
        color: "#191D13",
      },
      "& p": {
        color: "#191D13CC",
      },
      "& span": {
        color: "#191D13CC",
      },
      "& svg": {
        color: "#191d13a6",
      },
    },
  },
  "& .basicPlanBox": {
    textAlign: "left",
    "& p": {
      margin: "3px 0px 10px",
    },
  },
}));

export default function PriceCard({ isViewGrid }) {
  const [subscribeListData, setSubscribeListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);
    subscribeListHandler();
  }, []); // eslint-disable-line
  const subscribeListHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: auth.userLoggedIn
          ? api_configs.subscriptionPlanListWithFilterV1
          : api_configs.subscriptionPlanList,
        headers: {
          token: window.localStorage.getItem("user_token"),
        },
        data: {
          page: "1",
          limit: "10000",
        },
      });
      if (res.data.responseCode === 200) {
        let responseData = [];
        if (auth.userLoggedIn) {
          responseData = res.data.result.docs.filter(
            (data) => data.status == "ACTIVE"
          );
        } else {
          responseData = res.data.result.filter(
            (data) => data.status == "ACTIVE"
          );
        }
        if (responseData.length > 0) {
          setSubscribeListData(responseData);
        } else {
          setSubscribeListData([]);
        }
        setIsLoading(false);
      } else {
        setSubscribeListData([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setSubscribeListData([]);
    }
  }; // eslint-disable-line

  const SubscribeList = useMemo(() => subscribeListData, [subscribeListData]);
  return (
    <CurrentPlanBox>
      <Box className="pricepaper">
        <Box>
          {isViewGrid ? (
            <>
              <Grid container spacing={1}>
                {!isLoading &&
                  SubscribeList &&
                  SubscribeList?.map((data, i) => {
                    const featureCheckBackgroundColor =
                      i === 1
                        ? "rgba(239, 93, 168, 1)"
                        : "rgba(42, 171, 227, 1)";
                    const cardHeight =
                      i === 1 ? { minHeight: "250px" } : { minHeight: "200px" };

                    return (
                      <Grid item xs={12} sm={6} md={4} lg={4} key={i}>
                        <PricingComponentsCard
                          data={data}
                          cardHeight={cardHeight}
                          featureCheckBackgroundColor={
                            featureCheckBackgroundColor
                          }
                          nowpaymentCoinList={auth.nowpaymentCoinList}
                          isDisabled={auth.userLoggedIn}
                          callback={subscribeListHandler}
                        />
                      </Grid>
                    );
                  })}
              </Grid>
            </>
          ) : (
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={false}
              responsive={responsive}
              ssr={true}
              infinite={false}
              autoPlay={false}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              customTransition="transform 500ms cubic-bezier(0.42, 0, 0.58, 1)"
              transitionDuration={500}
              containerClass="carousel-container"
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {!isLoading &&
                SubscribeList &&
                SubscribeList?.map((data, i) => {
                  const featureCheckBackgroundColor =
                    i === 1 ? "rgba(239, 93, 168, 1)" : "rgba(42, 171, 227, 1)";
                  const cardHeight =
                    i === 1 ? { minHeight: "450px" } : { minHeight: "450px" };

                  return (
                    <Box key={i}>
                      <PricingComponentsCard
                        data={data}
                        cardHeight={cardHeight}
                        featureCheckBackgroundColor={
                          featureCheckBackgroundColor
                        }
                        nowpaymentCoinList={auth.nowpaymentCoinList}
                        isDisabled={auth.userLoggedIn}
                        callback={subscribeListHandler}
                      />
                    </Box>
                  );
                })}
            </Carousel>
          )}
          {!isLoading && SubscribeList.length == 0 && (
            <NoDataFound text="No plan found" />
          )}
        </Box>
      </Box>
    </CurrentPlanBox>
  );
}

PriceCard.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
