import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import "@/Scss/main.css";
import { createCustomTheme, darkTheme, lighttheme } from "@/theme";
import { useState, useEffect } from "react";
import { useContext } from "react"; // Import useContext hook
import ContextWrapper from "@/context/ContextWrapper";
import PageLoader from "@/components/PageLoader";
import { Router, useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { isAuthenticated, withoutAuthRoutes } from "@/AuthGuard";
import CustomHead from "@/components/CustomHead";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { wagmiConfig } from "@/utils/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SettingsContext, { SettingsProvider } from "@/context/SettingsContext";
import { useMediaQuery } from "@mui/material";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const themeNew = useTheme();
  const isMobile = useMediaQuery(themeNew.breakpoints.down("sm"));
  const settings = useContext(SettingsContext);
  const theme = createCustomTheme({
    theme: settings.settings.theme,
  });
  const router = useRouter();
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = new QueryClient();
  const appInfo = {
    appName: "Bitefge-App",
  };
  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    const notRequiresAuth = !withoutAuthRoutes.includes(router.pathname);
    if (isAuthenticated() && router.pathname !== "/") {
      notRequiresAuth && router.push("/");
    }
  }, [router.pathname]);

  useEffect(() => {
    const isAuth = () => {
      return window.localStorage.getItem("user_token") !== null;
    };
    const withAntiAuthRoutes = [
      "/auth/login",
      "/auth/signup",
      "/auth/forgot",
      "/auth/reset",
      "/auth/otp",
    ];

    const notRequiresAuth = withAntiAuthRoutes.includes(router.pathname);
    if (typeof window !== "undefined" && isAuth() && router.pathname !== "/") {
      notRequiresAuth && router.push("/");
    }
  }, [router.pathname]);

  useEffect(() => {
    setIsClientLoaded(true);
  }, []);

  useEffect(() => {
    const startLoading = (url) => {
      if (url.includes("/dashboard/")) {
        setIsDashboardLoading(true);
      } else {
        setLoading(true);
      }
    };
    const stopLoading = () => {
      setLoading(false);
      setIsDashboardLoading(false);
    };

    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    Router.events.on("routeChangeError", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
      Router.events.off("routeChangeError", stopLoading);
    };
  }, []);

  return (
    <div className="App">
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        ></meta>
      </Head>
      <CustomHead
        title="Bitedge | Automated Trading Made Easy or build your own"
        description="Grow your portfolio effortlessly with automated bots designed for both seasoned traders and beginners, delivering elite-level performance."
        image="/images/FbSizeImage.png"
        video="/images/banner.gif"
        isVideo={true}
      />
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <SettingsProvider>
            <ThemeProvider
              theme={
                settings.settings.theme === "DARK" ? darkTheme : lighttheme
              }
            >
              <ContextWrapper
                isDashboardLoading={isDashboardLoading}
                loading={loading}
              >
                <Toaster
                  autoClose={1000}
                  position={isMobile ? "bottom-center" : "top-right"}
                  reverseOrder={false}
                  theme={theme.palette.type}
                />
                {loading && <PageLoader />}
                <RainbowKitProvider appInfo={appInfo}>
                  {!loading && isClientLoaded && (
                    <>{getLayout(<Component {...pageProps} />)}</>
                  )}
                </RainbowKitProvider>
              </ContextWrapper>
            </ThemeProvider>
          </SettingsProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}

export default MyApp;
