import React, { useEffect, useState } from "react";
import { Box, Container, Button } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { getAPIHandler } from "@/api-services/service";
import dynamic from "next/dynamic";
const VideomainBox = dynamic(() => import("./VideomainBox"));
const News = dynamic(() => import("./News"));

const VideoMainBoxStyle = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: "999",
  marginTop: "100px",

  [theme.breakpoints.down("sm")]: {
    marginTop: "70px",
  },
  "& .MuiSvgIcon-root.MuiSelect-icon ": {
    color: "#fff",
  },
  "& .filterpaperBox": {
    padding: "10px",
    marginTop: "40px",
    marginBottom: "40px",
    borderRadius: "10px",
    background: "rgba(255, 255, 255, 0.04)",
    boxShadow: "none",
  },
  "& .tabBox": {
    display: "flex",
    justifyContent: "flex-start",
    flex: 1,
  },
  "& .tabButton": {
    fontSize: "40px",
    fontWeight: "600",
    color: theme.palette.text.secondary,
    background: "transparent",
    padding: "0px",
    marginRight: "28px",
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      marginBottom: "10px",
    },
    "&:hover": {
      borderRadius: "5px",
      color: theme.palette.text.primary,
      backgroundColor: "transparent",
    },
    "&.active": {
      color: theme.palette.text.primary,
      borderRadius: "5px",
      backgroundColor: "transparent",
    },
  },
}));

export default function Video() {
  const [tabView, setTabView] = useState("VideomainBox");
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [videoList, setVideoList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState("VideomainBox");

  const getVideoList = async (source) => {
    try {
      setVideoList([]);
      setIsLoading(true);
      const response = await getAPIHandler({
        endPoint: "videoList",
        paramsData: {
          page: page1,
          limit: 20,
        },
        source: source,
      });
      if (response.data.responseCode === 200) {
        setVideoList(response.data.result?.docs);
        setIsLoading(false);
      }
    } catch (error) {
      setVideoList({});
      setTabView("News");
      setIsLoading(false);
    }
  };
  const getNewsList = async (source) => {
    try {
      setNewsList([]);
      setIsLoading(true);
      const response = await getAPIHandler({
        endPoint: "newsList",
        paramsData: {
          page: page2,
          limit: 20,
        },
        source: source,
      });
      if (response.data.responseCode === 200) {
        setNewsList(response.data.result?.docs);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setNewsList([]);
    }
  };
  useEffect(() => {
    const source = axios.CancelToken.source();
    getNewsList(source);
    getVideoList(source);
    return () => {
      source.cancel();
    };
  }, []);
  return (
    <>
      {!isLoading && (videoList.length > 0 || newsList.length > 0) && (
        <VideoMainBoxStyle>
          <Container>
            <Box className="tabBox">
              {videoList && videoList.length > 0 && (
                <Button
                  className={`tabButton ${
                    tabView === "VideomainBox" ? "active" : ""
                  }`}
                  onClick={() => {
                    setTabView("VideomainBox");
                    setPage2(1);
                  }}
                >
                  Videos
                </Button>
              )}
              {newsList && newsList.length > 0 && (
                <Button
                  className={`tabButton ${tabView === "News" ? "active" : ""}`}
                  onClick={() => {
                    setTabView("News");
                    setPage1(1);
                  }}
                >
                  Blogs
                </Button>
              )}
            </Box>
            {(tabView === "VideomainBox" &&
              videoList &&
              videoList.length > 0) ||
            (tabView === "News" && newsList && newsList.length > 0) ? (
              <>
                {tabView === "VideomainBox" && (
                  <VideomainBox list={videoList} />
                )}
                {tabView === "News" && <News list={newsList} />}
              </>
            ) : (
              <>
                {videoList && videoList.length > 0 && (
                  <VideomainBox list={videoList} />
                )}
                {newsList && newsList.length > 0 && <News list={newsList} />}
              </>
            )}
          </Container>
        </VideoMainBoxStyle>
      )}
    </>
  );
}
