// article/[blogType]/[id]
import React from "react";
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
// import { useRouter } from "next/router";
import { Fullscreen } from "@mui/icons-material";
import DataLoader from "@/components/DataLoader";
import BlogLayout from "@/layout/BlogLayout";
import Image from "next/image";
import NoDataFoundFrame from "@/components/NoDataFoundFrame";
import CustomHead from "@/components/CustomHead";
import Head from "next/head";

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

export const fetchNewsData = async (blogType, id) => {
  try {
    if (blogType) {
      const url =
        blogType === "video" ? api_configs.viewVideo : api_configs.viewNews;
      const { data } = await axios.get(url, { params: { _id: id } });

      if (data.responseCode === 200) {
        return data.result;
      } else {
        return null;
      }
    }
  } catch (error) {
    return null;
  }
};

export default function Article(props) {
  const { result, status, isLoading, url } = props;

  // console.log(url, "with sitmap article metadata --- props", props);
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
  return (
    <VideoCardBox>
      <Head>
        <title>{result?.title}</title>
        <meta name="description" content={result?.description} />
        <meta property="og:title" content={result?.title} />
        <meta property="og:description" content={result?.description} />
        <meta property="og:image" content={result?.image} />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={result?.title} />
        <meta name="twitter:description" content={result?.description} />
        <meta name="twitter:image" content={result?.image} />
        <meta name="twitter:image:alt" content={result?.title} />
        <meta name="robots" content="follow, index" />
      </Head>

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
                  {!result?.isaddVideo ? (
                    <Box className="imageWrapper">
                      {result?.image && (
                        <Image
                          alt={result?.title}
                          src={result?.image}
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
                        url={result?.videoUrl}
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
                          {result?.title || ""}
                        </Typography>
                      </Box>
                      <Box className="ContentBox">
                        <Typography variant="body2">
                          <div
                            className="description"
                            dangerouslySetInnerHTML={{
                              __html: result?.description || "",
                            }}
                          />
                        </Typography>
                      </Box>
                      {result?.link?.includes("https") && (
                        <Box align="left" mt={2}>
                          <Button
                            variant="contained"
                            color="primary"
                            target="_blank"
                            href={result?.link}
                          >
                            News Link
                          </Button>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                  {!result?.image &&
                    !result?.description &&
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
  return <BlogLayout>{page}</BlogLayout>;
};
export const generateMetadata = async function ({ params }) {
  // const post = await getData(params.slug);
  const { blogType, id } = params;
  const post = await fetchNewsData(blogType, id);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${process.env.REDIRECT_URI}articles/${blogType}/${id}`,
      images: [
        {
          url: post.image,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    alternates: {
      canonical: `${process.env.REDIRECT_URI}articles/${blogType}/${id}`,
    },
  };
};

export async function getStaticProps({ params }) {
  const { blogType, id } = params;
  let status = 200;

  const result = await fetchNewsData(blogType, id);
  if (blogType) {
    return {
      props: {
        result: result || null,
        status,
        url: `/articles/${blogType}/${id}`,
        isLoading: false,
      },
      revalidate: 60,
    };
  } else {
    // If the API response is not successful
    // status = 200;
    let Data = {
      title: "Page Not Found",
      description: "The page you are looking for does not exist.",
      image: "/images/FbSizeImage.png",
      isaddVideo: false,
      videoUrl: "/images/banner.gif",
    };
    return {
      props: {
        result: Data,
        status,
        url: `/`,
        isLoading: false,
      },
      revalidate: 60,
    };
  }
}
export async function getStaticPaths() {
  return {
    paths: [], // Optionally define static paths
    fallback: "blocking", // Enable ISR or fallback behavior
  };
}
