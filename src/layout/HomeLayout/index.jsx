import { useContext } from "react";
import Footer from "./Footer";
import Topbar from "./Topbar";
import { Box, ThemeProvider } from "@mui/material";
import SettingsContext from "@/context/SettingsContext";
import { darkTheme, lighttheme } from "@/theme";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import { fetchNewsData } from "@/pages/articles/[blogType]/[id]";
import AppContext from "@/context/AppContext";

const MainLayout = styled("div")(({ theme, isBlogScreen }) => ({
  minHeight: "calc(100vh - 120px)",
  paddingTop: isBlogScreen ? "77px" : "130px",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${
    theme.palette.mode === "dark"
      ? "/images/back_dark.svg"
      : "/images/lightbg.svg"
  })`,
  backgroundPosition: "top left",
  backgroundSize: "cover",
  backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
  // animation: "fadein 1s",
  "@keyframes fadein": {
    "0%": {
      opacity: 0,
      backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
    },
    "100%": {
      opacity: 1,
    },
  },
  "@media all and (max-width: 767px)": {
    backgroundSize: "100%",
  },
  "@media all and (max-width: 479px)": {
    backgroundSize: "120%",
  },
  zIndex: "2",
  [theme.breakpoints.down("sm")]: {
    paddingTop: "70px",
  },
}));

const HomeLayout = ({ children }) => {
  const { loading } = useContext(AppContext);
  const themeSetting = useContext(SettingsContext);
  const router = useRouter();
  return (
    <>
      {!loading && (
        <ThemeProvider
          theme={
            themeSetting.settings.theme === "DARK" ? darkTheme : lighttheme
          }
        >
          <MainLayout
            isBlogScreen={
              router.pathname === "/article/[dugs]/[slug]"
                ? true
                : router.pathname === "/articles/[blogType]/[id]"
                ? true
                : false
            }
          >
            <Topbar />
            <Box>{children}</Box>
            <Footer />
          </MainLayout>
        </ThemeProvider>
      )}
    </>
  );
};

export default HomeLayout;
export const generateMetadata = async function ({ params }) {
  // const post = await getData(params.slug);
  const { blogType, id } = params;
  let post;

  if (blogType) {
    post = await fetchNewsData(blogType, id);
    console.log("Fetching metadata for: generateMetadata", { blogType, id });
    console.log("Fetched post: generateMetadata", result);
  } else {
    post = {
      title: "Bitedge | Automated Trading Made Easy or build your own",
      description:
        "Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance.",
      image: "/images/FbSizeImage.png",
      video: "/images/banner.gif",
    };
  }
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
