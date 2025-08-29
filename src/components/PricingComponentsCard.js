import { Box, Button, Typography, styled, Tooltip, Paper } from "@mui/material";
import React, { useContext, useState } from "react";
import { BiDollar } from "react-icons/bi";
import AppContext from "@/context/AppContext";
import { arbitrageNameFilterReverse, encrypt, replacetext } from "@/utils";
import { useRouter } from "next/router";
import { MdOutlineCheckCircle } from "react-icons/md";
const PricingComponentsCard = ({
  data,
  cardHeight,
  featureCheckBackgroundColor,
  isDisabled,
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const auth = useContext(AppContext);
  const handleSubmit = () => {
    console.log("Card Payment Selected");
    router.push({
      pathname: "/checkout/[id]",
      // query: { id: replacetext(data?.title, " ", "-") },
      query: { id: encrypt(data) },
    });
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Paper
      elevation={1}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="paperBox1"
      style={cardHeight}
      align="left"
    >
      <Box className="paperMain" style={{ position: "relative" }}>
        <Box className="basicPlanBox" align="left">
          <Box className="displaySpacebetween">
            <Typography variant="h5" color="primary" className="priceText">
              {data?.title}
            </Typography>

            {data?.isSubscribe && (
              <Box
                sx={{
                  border: "1px solid #9aeb80!important",
                  borderRadius: "20px",
                  margin: "0px !important",
                  px: 1,
                  background: "#9aeb8033",
                }}
              >
                <Typography
                  variant="body1"
                  color="secondary"
                  sx={{
                    color: "#9aeb80!important",
                    margin: "0px !important",
                  }}
                >
                  Active
                </Typography>
              </Box>
            )}
            {data?.isPlanPending && (
              <Box
                sx={{
                  border: "1px solid #e3bf00!important",
                  borderRadius: "20px",
                  margin: "0px !important",
                  px: 1,
                  background: "#e3bf001a",
                }}
              >
                <Typography
                  variant="body1"
                  color="secondary"
                  sx={{
                    color: "#e3bf00!important",
                    margin: "0px !important",
                  }}
                >
                  Pending
                </Typography>
              </Box>
            )}
          </Box>{" "}
          <Box className="displayStart" style={{ marginLeft: "-7px" }}>
            <BiDollar style={{ fontSize: "40px" }} />

            <Typography
              variant="h4"
              color="primary"
              style={{ fontSize: "28px" }}
            >
              {data?.value}
              <span style={{ fontSize: "14px", fontWeight: "700" }}>
                / {data?.planDuration} days
              </span>
            </Typography>
          </Box>
          {data?.isBuy && (
            <Typography
              variant="body2"
              color="secondary"
              className="descripborder"
              style={{ marginTop: "10px" }}
            >
              Payable amount: {data?.enteryFee} + {data?.recursivePayAmount}
              <sup style={{ fontSize: "14px" }}>*</sup> = ${data?.payableAmount}
            </Typography>
          )}
          <Typography
            variant="body2"
            color="secondary"
            className="descripborder"
            sx={{
              wordBreak: "break-all",
            }}
          >
            {data?.description}
          </Typography>
        </Box>

        <Box className="featureControl">
          <Typography
            variant="body2"
            color="primary"
            mt={1}
            mb={2}
            style={{
              fontWeight: "700",
            }}
          >
            Plan details
          </Typography>

          <FeatureListItem
            item={
              data?.isFuelDeduction
                ? `Trading fee: ${data?.tradeFee} % from fuel wallet ${data?.coinType}`
                : "Trading fee: 0 %"
            }
            backgroundColor={featureCheckBackgroundColor}
          />

          {data?.profits && (
            <FeatureListItem
              item={`Maximum profits: $ ${data?.profits}`}
              backgroundColor={featureCheckBackgroundColor}
            />
          )}
          {data?.recursiveValue && (
            <FeatureListItem
              item={`Recurring subscription: $ ${data?.recursiveValue}`}
              backgroundColor={featureCheckBackgroundColor}
              isTrue={true}
            />
          )}
          {data?.arbitrageName && (
            <FeatureListItem
              item={`Adaptive Quantum AI: ${data?.arbitrageName
                .map((item) => arbitrageNameFilterReverse[item] || item)
                .join(", ")}`}
              backgroundColor={featureCheckBackgroundColor}
            />
          )}
          {data?.exchangeUID && (
            <FeatureListItem
              item={`Exchange names: ${data?.exchangeUID
                .map((item) => item)
                .join(", ")}`}
              backgroundColor={featureCheckBackgroundColor}
            />
          )}
        </Box>
      </Box>

      {isDisabled && (
        <Box className="bottomButtonBox">
          {auth?.userLoggedIn && (
            <Tooltip
              title={
                auth?.subscriptionIdd.subScriptionPlanId === data?._id
                  ? "This plan is already purchased for you."
                  : !data?.isBuy
                  ? "Buy a higher plan."
                  : ""
              }
              arrow
              placement="top"
            >
              {" "}
              <Box
                className="displayCenter"
                sx={{
                  mt: 1,
                  mb: 1,
                  "& button": {
                    color: isHovered ? "#000 !important" : "",
                  },
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  // onClick={(e) => setopen(true)}
                  onClick={() => handleSubmit()}
                  // disabled={!isDisabled || !data?.isBuy}
                  sx={{
                    pointerEvents:
                      !isDisabled || !data?.isBuy ? "none" : "auto",
                  }}
                >
                  {auth?.subscriptionIdd.subScriptionPlanId === data?._id
                    ? "Subscribed"
                    : "Buy"}
                </Button>
              </Box>
            </Tooltip>
          )}
          {!auth?.userLoggedIn && (
            <Box
              className="displayCenter"
              sx={{
                mt: 1,
                mb: 1,
                "& button": {
                  fontSize: "12px",
                  color: isHovered ? "#000 !important" : "",
                },
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={() => router.push("/auth/login")}
              >
                Login to buy
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
};
export default PricingComponentsCard;

export const FeatureListItem = ({ item, isTrue }) => {
  return (
    <Box>
      {item && item && (
        <Box
          mb={1}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          {item && (
            <Box className="featureCheck">
              <MdOutlineCheckCircle
                style={{
                  fontSize: "28px",
                }}
              />
            </Box>
          )}

          <Typography
            color="secondary"
            variant="body2"
            sx={{ marginLeft: "10px", marginBottom: "10px" }}
          >
            {isTrue && <sup style={{ fontSize: "14px" }}>*</sup>} {item}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
