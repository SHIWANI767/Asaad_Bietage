import React, { useEffect, useState } from "react";
import { Box, styled, Container, Typography, Paper } from "@mui/material";
import axios from "axios";
import { api_configs } from "@/api-services";
import DataLoader from "@/components/DataLoader";
import HomeLayout from "@/layout/HomeLayout";
import { kebabToCamel } from "@/utils";
import NoDataFoundFrame from "@/components/NoDataFoundFrame";

const VideoCardBox = styled("div")(({ theme }) => ({
  "& .root": {
    padding: "15px",
    "& .postImg": {
      height: "635px",
      overflow: "hidden",
      position: "relative",
      background: "rgba(0,0,0,0.7)",
      backgroundSize: "100% !important",
      backgroundRepeat: "no-repeat !important",
      backgroundPosition: "center !important",
      borderRadius: "10px 10px 0px 0px",
      margin: "0",
      "@media(max-width:767px)": {
        height: "150px",
      },
      "& img": {
        top: "50%",
        left: "50%",
        width: "auto",
        height: "auto",
        position: "absolute",
        minWidth: "100%",
        transform: "translate(-50%, -50%)",
        minHeight: "100%",
      },
    },
    "& .ContentSection": {
      padding: "20px 0px",

      "& .ContentBox": {
        paddingTop: "15px",
        "& h6": {
          color: "rgba(255, 255, 255, 0.6)",
          marginTop: "35px",
          fontSizeL: "14px",
        },
      },
    },
  },

  "& .imgbox": {
    textAlign: "center",
    width: "100%",
    backgroundColor: "#08111B",
    boxSizing: "border-box",
    borderImageSlice: "1",
    position: "relative",
    "& img": {
      width: "100%",
      height: "100%",
      // position: "absolute",
      // top: "50%",
      // left: "50%",
      // transform: "translate(-50%, -50%)",
      objectFit: "cover",
    },
  },
  "& .videobox": {
    width: "100%",
    position: "relative",
    zIndex: "9",
    height: "85vh",
    [theme.breakpoints.down("md")]: {
      height: "65vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "45vh",
    },
    [theme.breakpoints.down("xs")]: {
      height: "25vh",
    },
  },
  "& .btnActive": {
    // background: "red !important",

    color: "#fff",
    lineHeight: "31px",
    background: "#b51632 !important",
    boxShadow:
      "0px 4px 4px rgb(0 0 0 / 25%), inset 0px 0px 8px #b61733, inset 0px 0px 35px #b51632 !important",
    borderRadius: "50px",
    fontWeight: "300",
    [theme.breakpoints.down("xs")]: {
      fontSize: "13px",
    },
  },
  "& .description": {
    // maxHeight: "35px",
    // overflow: "hidden",
    // textOverflow: "ellipsis",
    // display: "-webkit-box",
    // WebkitLineClamp: "2",
    // WebkitBoxOrient: "vertical",

    "& figure": {
      marginLeft: "0",
    },
    "& a": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
    },
    "& td": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
    },
    "& span, section": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
    },

    "& iframe": {
      width: "100%",
      // overflow: "hidden",
      display: "inherit",
    },
    "& img": {
      width: "100%",
      height: "auto",
    },

    "& >*": {
      backgroundColor: "unset !important",
      wordBreak: "break-word",
      overflow: "auto",
      color: `${theme.palette.text.primary} !important`,
    },
    "& strong": {
      // backgroundColor: "unset !important",
      backgroundColor: "transparent !important",
      color: `${theme.palette.text.primary} !important`,
    },
    "& h4": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
    },
    "& h5": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
    },
    "& h6": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
    },
    "& h1": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
    },
    "& h2": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
    },
    "& h3": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
    },
    "& span": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
    },
    "& em": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
    },
    "& p": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
      fontSize: "14px !important",
    },
    "& strong": {
      color: `${theme.palette.text.primary} !important`,
    },
  },
}));
function kebabToTitle(str) {
  return str
    .split("-")
    .map((word, index) =>
      index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
    )
    .join(" ");
}
export default function TermsAndConditions() {
  const slug = "terms-conditions";
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = api_configs.viewStaticContent;
        const { data } = await axios.get(url, {
          params: { type: kebabToCamel(slug) },
        });

        if (data.responseCode === 200) {
          setResult(data.result);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (isLoading) {
    return <DataLoader />;
  }
  return (
    <VideoCardBox>
      <Container maxWidth="lg">
        <Box className={"root"}>
          <Paper elevation={1} style={{ padding: "20px" }}>
            <Box className="ContentSection" py={1}>
              <Box className="headingBox">
                <Typography
                  variant="h3"
                  color="primary"
                  sx={{
                    whiteSpace: "pre-line",
                    wordBreak: "break-all",
                  }}
                >
                  {result?.title ? result?.title : kebabToTitle(slug)}
                </Typography>
              </Box>
              <Box className="ContentBox">
                <Typography variant="body2">
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{
                      __html: result?.description ? result?.description : "",
                    }}
                  />
                </Typography>
              </Box>

              {!result?.title && (
                <Box
                  sx={{
                    minHeight: "calc(100vh - 600px)",
                  }}
                >
                  <NoDataFoundFrame data={`${kebabToTitle(slug)} not found`} />
                </Box>
              )}
            </Box>
          </Paper>
        </Box>
      </Container>
    </VideoCardBox>
  );
}

TermsAndConditions.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
