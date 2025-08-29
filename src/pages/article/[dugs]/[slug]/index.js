import React, { useState, useEffect } from "react";
import {
  Box,
  styled,
  Container,
  Grid,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import ReactPlayer from "react-player";
import { api_configs } from "@/api-services";
import { useRouter } from "next/router";
import { Fullscreen } from "@mui/icons-material";
import DataLoader from "@/components/DataLoader";
import HomeLayout from "@/layout/HomeLayout";
import Image from "next/image";
import CustomHead from "@/components/CustomHead";
import NoDataFoundFrame from "@/components/NoDataFoundFrame";

const VideoCardBox = styled("div")(({ theme }) => ({
  "& .root": {
    position: "relative",
    padding: "15px",
    // background: "rgba(255, 255, 255, 0.02)",
    borderRadius: "15px",
    margin: "15px 0px",
    zIndex: 1,
    "& .ContentSection": {
      padding: "20px 0px",

      "& .ContentBox": {
        paddingTop: "5px",
        "& h6": {
          color: "rgba(255, 255, 255, 0.6)",
          marginTop: "35px",
          fontSizeL: "14px",
        },
      },
    },
  },

  "& .imageContainer": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
  },

  "& .imageWrapper": {
    width: "100%",
    height: "auto",
    position: "relative",
    "& video,& img": {
      width: " 100%",
      height: "auto",
      display: "block",
      objectFit: "cover",
    },
  },
  "& .description": {
    "& figure, & a, & td, & span, & section, & iframe, & img, & >*, & strong, & h4, & h5, & h1, & h2, & h3, & em, & p":
      {
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
        wordBreak: "break-word",
        overflow: "auto",
      },
    "& p": {
      fontSize: "14px !important",
    },
    "& figure": {
      marginLeft: "0",
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
  },
}));

export default function Article(props) {
  const router = useRouter();
  // const [isLoading, setIsLoading] = useState(true);
  // const [newsData, setNewsData] = useState({});
  const { newsData, status, isLoading, url } = props;
  // const typeOfData = router?.query?.dugs;
  // const iddds = router?.query?.slug;
  // console.log("article metadata", props);
  // const newsDataAPIHandler = async (id, type) => {
  //   try {
  //     setIsLoading(true);
  //     const res = await axios({
  //       method: "GET",
  //       url: type === "video" ? api_configs.viewVideo : api_configs.viewNews,
  //       params: { _id: id },
  //     });
  //     if (res.data.responseCode === 200) {
  //       setNewsData(res.data.result);
  //       setIsLoading(false);
  //     } else {
  //       setIsLoading(false);
  //       router.back();
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     router.back();
  //   }
  // };

  // useEffect(() => {
  //   if (typeOfData && iddds) {
  //     newsDataAPIHandler(iddds, typeOfData);
  //   }
  // }, [typeOfData, iddds]);

  const openFullscreen = () => {
    const videoElement = document.getElementById("myvideo");
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
      videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) {
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) {
      videoElement.msRequestFullscreen();
    }
  };
  console.log(" ---------- router.asPath getStaticProps ");
  return (
    <VideoCardBox>
      <CustomHead
        title={
          status === 200
            ? newsData?.title
            : "Bitedge | Automated Trading Made Easy or build your own"
        }
        description={
          status === 200
            ? newsData?.description
            : "Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        }
        image={status === 200 ? newsData?.image : "/images/FbSizeImage.png"}
        video={
          status === 200
            ? newsData?.isaddVideo
              ? newsData?.videoUrl
              : "/images/banner.gif"
            : "/images/banner.gif"
        }
        isVideo={false}
        url={url}
      />
      <Container maxWidth="lg">
        <Box className="root">
          {isLoading ? (
            <DataLoader />
          ) : (
            <>
              <Container
                maxWidth="md"
                sx={{
                  maxWidth: "1024px !important",
                  // padding: 0, margin: 0
                  paddingLeft: "0px !important",
                  paddingRight: "0px !important",
                }}
              >
                <figure className="imgbox imageContainer">
                  {!newsData?.isaddVideo ? (
                    <Box className="imageWrapper">
                      {newsData?.image && (
                        <Image
                          alt={newsData?.title}
                          src={newsData?.image}
                          width={1024}
                          height={576}
                          quality={100}
                          onDragStart={(e) => e.preventDefault()}
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      )}
                    </Box>
                  ) : (
                    <Box className="imageWrapper">
                      <ReactPlayer
                        id="myvideo"
                        url={newsData?.videoUrl}
                        playing={true}
                        width="100%"
                        height="100%"
                        muted={false}
                      />
                      <IconButton
                        variant="contained"
                        color="primary"
                        onClick={openFullscreen}
                        style={{
                          position: "absolute",
                          right: "0px",
                          top: "0px",
                        }}
                      >
                        <Fullscreen fontSize="large" />
                      </IconButton>
                    </Box>
                  )}
                </figure>
                <Box className="ContentSection">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box className="headingBox">
                        <Typography
                          variant="h3"
                          color="primary"
                          sx={{
                            whiteSpace: "pre-line",
                            wordBreak: "break-all",
                          }}
                        >
                          {newsData?.title || ""}
                        </Typography>
                      </Box>
                      <Box className="ContentBox">
                        <Typography variant="body2">
                          <div
                            className="description"
                            dangerouslySetInnerHTML={{
                              __html: newsData?.description || "",
                            }}
                          />
                        </Typography>
                      </Box>
                      {newsData?.link?.includes("https") && (
                        <Box align="left" mt={2}>
                          <Button
                            variant="contained"
                            color="primary"
                            target="_blank"
                            href={newsData?.link}
                          >
                            News Link
                          </Button>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                  {!newsData?.image &&
                    !newsData?.description &&
                    isLoading === false && (
                      <Box>
                        <Typography variant="body2">
                          <NoDataFoundFrame data="Following artical does not founds" />
                        </Typography>
                      </Box>
                    )}
                </Box>
              </Container>
            </>
          )}
        </Box>
      </Container>
    </VideoCardBox>
  );
}

Article.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

// export async function getServerSideProps({ params }) {
//   const { dugs, slug } = params;
//   let status = 201;

//   const fetchNewsData = async () => {
//     try {
//       const url =
//         dugs === "video" ? api_configs.viewVideo : api_configs.viewNews;
//       const { data } = await axios.get(url, { params: { _id: slug } });

//       if (data.responseCode === 200) {
//         status = data.responseCode || 200;
//         return data.result;
//       } else {
//         // If the API response is not successful
//         status = data.responseCode || 500;
//         return null; // Return null or a default value in case of failure
//       }
//     } catch (error) {
//       console.error(error);
//       status = error.response?.status || 500; // Default to 500 if no response status
//       return null; // Returning null if an error occurs
//     }
//   };

//   const newsData = await fetchNewsData();

//   return {
//     props: {
//       newsData: newsData || null, // Ensure newsData is null if there was an error
//       status,
//       url: `/article/${dugs}/${slug}`,
//     },
//   };
// }

// export async function getServerSideProps({ params }) {
export async function getStaticProps({ params }) {
  const { dugs, slug } = params;
  let status = 201;

  const fetchNewsData = async () => {
    try {
      const url =
        dugs === "video" ? api_configs.viewVideo : api_configs.viewNews;
      const { data } = await axios.get(url, { params: { _id: slug } });

      if (data.responseCode === 200) {
        status = data.responseCode || 200;
        return data.result;
      } else {
        status = data.responseCode || 500;
        return null;
      }
    } catch (error) {
      console.error(error);
      status = error.response?.status || 500;
      return null;
    }
  };

  const newsData = await fetchNewsData();

  return {
    props: {
      newsData: newsData || null,
      status,
      url: `/article/${dugs}/${slug}`,
      isLoading: false,
    },
    revalidate: 60,
  };
}
export async function getStaticPaths() {
  // Pre-generate paths for some slugs
  return {
    paths: [], // Optionally define static paths
    fallback: "blocking", // Enable ISR or fallback behavior
  };
}
