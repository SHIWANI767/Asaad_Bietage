import { useContext } from "react";
import Footer from "./Footer";
import Topbar from "./Topbar";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import AppContext from "@/context/AppContext";

const MainLayout = styled("div")(({ theme }) => ({
  minHeight: "calc(100vh - 120px)",
  paddingTop: "77px",
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

const BlogLayout = ({ children }) => {
  // const { loading } = useContext(AppContext);
  return (
    <>
      <MainLayout>
        <Topbar />
        <Box>{children}</Box>
        <Footer />
      </MainLayout>
    </>
  );
};

export default BlogLayout;
