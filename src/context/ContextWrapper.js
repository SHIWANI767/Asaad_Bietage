import React, { useState, useEffect, createContext } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { apiRouterCall } from "../api-services/service";
import Cookies from "js-cookie";
import { api_configs } from "@/api-services";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("user_token", accessToken);
    axios.defaults.headers.common.Authorization = `${accessToken}`;
    Cookies.set("user_token", accessToken, { expires: 1 }); // Expires in 1 day
  } else {
    localStorage.removeItem("user_token");
    delete axios.defaults.headers.common.Authorization;
    Cookies.remove("user_token");
  }
};
function checkLogin(token) {
  const user_token = Cookies.get("user_token");

  if (typeof window !== "undefined" && window.localStorage) {
    if (user_token) {
      const accessToken = window.localStorage.getItem("user_token") || token;
      return !!accessToken;
    } else {
      window.localStorage.removeItem("user_token");
      return false;
    }
  } else {
    return false;
  }
}

const setRefCode = (refCode) => {
  if (refCode) {
    localStorage.setItem("ref_code", refCode);
    Cookies.set("ref_code", refCode, { expires: 7 });
  }
};

function checkRefCode() {
  const ref_code = Cookies.get("ref_code");
  if (ref_code) {
    // const refCode = localStorage.getItem("ref_code") || ref_code;
    return ref_code;
  } else {
    // localStorage.removeItem("ref_code");
    return false;
  }
}

export default function ContextWrapper({ children, ...props }) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(checkLogin());

  const [isLoadingProfile, setisLoadingProfile] = useState(true);

  const [refferalCode, setRefferalCode] = useState(checkRefCode());
  const [userData, setUserData] = useState();
  const [connectedExchangeList, setConnectedExchangeList] = useState();
  const [openTrmConPol, setOpenTrmConPol] = useState(false);
  const [nowpaymentCoinList, setNowpaymentCoin] = useState([]);
  const [trustPaymentCoin, settrustPaymentCoin] = useState([]);
  const [subscriptionIdd, setSubscriptionIdd] = useState("");
  const [topHeading, setTopHeading] = useState("Dashboard");
  const [count, setCount] = useState([]);
  const getNotificationHandler = async (token) => {
    try {
      const res = await axios({
        method: "get",
        url: api_configs.listNotification,
        headers: {
          token: token,
        },
        params: {
          page: "1",
          limit: "10000",
        },
      });
      if (res.data.responseCode === 200) {
        let resultList = res.data.result.docs.filter((data) => !data.isRead);
        setCount(resultList);
      }
    } catch (err) {
      console.log(err);
      setCount([]);
    }
  };

  const getNowPaymentcoins = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: api_configs.getNowPaymentcoins,
      });
      if (res.data.responseCode === 200) {
        setNowpaymentCoin(res.data.result.currencies);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTrustPaymentCoin = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: api_configs.trustPaymentCountries,
      });
      if (res.data.responseCode === 200) {
        settrustPaymentCoin(res.data.result);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getProfileDataHandler = async (token) => {
    try {
      const response = await apiRouterCall({
        method: "GET",
        url: api_configs.getProfile,
        token: token,
      });
      if (response.data.responseCode === 200) {
        setisLoadingProfile(false);
        setUserData(response.data.result);
        let is_admin = response.data.result.userType;
        Cookies.set("is_admin", is_admin);
        const cookieValue = Cookies.get("AcceptTerm&Condition");
        if (response.data.result.subscriptionPlaneStatus) {
          getMyPlan(response.data.result.subscriptionPlaneId, token);
        }
        if (response.data.result.termsAndConditions == "ACCEPT") {
          setOpenTrmConPol(false);
        } else if (cookieValue) {
          setOpenTrmConPol(false);
        } else {
          setOpenTrmConPol(true);
        }
      } else if (response.data.responseCode === 403) {
        setisLoadingProfile(true);
        handleLogout(response.data.responseMessage);
      } else {
        setisLoadingProfile(true);
        handleLogout("Your session has expired. Please log in again.");
      }
    } catch (error) {
      setisLoadingProfile(true);
      console.log(error);
    }
  };
  const getMyPlan = async (iddd, token) => {
    try {
      const res = await axios({
        method: "GET",
        url: api_configs.myPlan,
        headers: { token: token },
        params: {
          planStatus: "ACTIVE",
          limit: 10,
        },
      });
      if (res.data.responseCode === 200) {
        setSubscriptionIdd(res.data.result.docs[0]);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getConnectedExchangeList = async () => {
    try {
      const response = await apiRouterCall({
        method: "GET",
        url: api_configs.connectedExchangeList,
        token: window.localStorage.getItem("user_token"),
      });
      if (response.data.responseCode === 200) {
        setConnectedExchangeList(response.data.result);
        Cookies.set("is_exchange", response.data.result.length);
      }
    } catch (error) {
      console.log(error);
      Cookies.set("is_exchange", 0);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("user_token")) {
        getProfileDataHandler(window.localStorage.getItem("user_token"));
        getConnectedExchangeList(window.localStorage.getItem("user_token"));
        getNotificationHandler(window.localStorage.getItem("user_token"));
        getNowPaymentcoins();
        getTrustPaymentCoin();
      }
    }
  }, [isLogin]);

  const handleLogout = (mess) => {
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_token");
    data.userLogIn(false, null);
    router.replace("/");
    Cookies.remove("user_token");
    Cookies.remove("is_admin");
    Cookies.remove("is_exchange");
    Cookies.remove("AcceptTerm&Condition");
    toast.success(mess, {
      duration: 7000,
    });
  };

  //sign in using google
  const signInWithGoogle = () => {
    // signInWithPopup(auth, new GoogleAuthProvider());
  };
  //sign in using facebook
  const signInWithFacebook = () => {
    // signInWithPopup(auth, new FacebookAuthProvider());
  };
  let data = {
    userLoggedIn: isLogin,
    isAdmin: userData?.userType,
    isAdminTab: userData?.userType === "ADMIN" ? true : false,
    count,
    userData,
    refferalCode,
    topHeading,
    setTopHeading,
    userLogIn: (type, data) => {
      setSession(data);
      setIsLogin(type);
    },
    setRefCode: (data) => setRefCode(data),
    nowpaymentCoinList,
    trustPaymentCoin,
    isDashboardLoading: props.isDashboardLoading,
    loading: props.loading,
    connectedExchangeList,
    handleLogout: (e) => handleLogout(e),
    getProfileDataHandler: () =>
      getProfileDataHandler(window.localStorage.getItem("user_token")),
    getNotificationHandler: () =>
      getNotificationHandler(window.localStorage.getItem("user_token")),
    getConnectedExchangeList: (t) => getConnectedExchangeList(t),
    signInWithFacebook,
    signInWithGoogle,
    openTrmConPol,
    setOpenTrmConPol,
    subscriptionIdd,
    isLoadingProfile,
  };
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}
