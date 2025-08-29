const URLEND = process.env.baseURL;
// const URLEND = "node.bitedge.app/";

// export const baseurl = "http://172.16.1.254:2027/"; //  local url
// export const baseurlSocket = "ws://172.16.1.254:2027/"; // new local URL

export const baseurl = "https://" + URLEND; // new stagin url
export const baseurlSocket = "wss://" + URLEND; // new stagin URL
export const reCaptacha = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

let user = `${baseurl}api/v1/user`;
let admin = `${baseurl}api/v1/admin`;
let staticContent = `${baseurl}api/v1/static`;
let notification = `${baseurl}api/v1/notification`;
let triangularArbitrage = `${baseurl}api/v1/triangularArbitrage`;
let DirectArb = `${baseurl}api/v1/directArbitrage`;
let IntraArb = `${baseurl}api/v1/intraArbitrageSingleExchange`;
let analytics = `${baseurl}api/v1/analytics`;
let wallet = `${baseurl}api/v1/wallet`;
let loopArbitrage = `${baseurl}api/v1/loopArbitrage`;

export const api_configs = {
  // -------------------Auth---------------------

  // user Login
  login: `${user}/userLogin`,
  socialLogin: `${user}/socialLogin`,
  userSignup: `${user}/userSignup`,
  verifyOTP: `${user}/verifyOTP`,
  forgotPasswordU: `${user}/forgotPassword`,
  resendOTPU: `${user}/resendOTP`,
  resetPasswordU: `${user}/resetPassword`,
  getProfile: `${user}/getProfile`,
  buySubscription: `${user}/buySubscription`,
  getNowPaymentcoins: `${user}/getNowPaymentcoins`,
  myPlan: `${user}/myPlan`,
  updateTermsAndConditions: `${user}/updateTermsAndConditions`,
  editUserProfile: `${user}/editUserProfile`,
  fuelWallet: `${user}/fuelWallet`,
  myFuelWalletHistory: `${user}/myFuelWalletHistory`,
  myFuelWalletDeducteHistory: `${user}/myFuelWalletDeducteHistory`,
  createdocusealinfo: `${user}/createdocusealinfo`,
  viewPlan: `${user}/viewPlan`,
  buySubscriptionCard: `${user}/buySubscriptionCard`,
  trustPaymentCountries: `${user}/trustPaymentCountries`,
  checkAvailableCoupon: `${user}/checkAvailableCoupon`,
  getCustomPlan: `${user}/getCustomPlan`,
  updatePaymentMethod: `${user}/updatePaymentMethod`,
  tPaymentUpdateCredential: `${user}/tPaymentUpdateCredential`,
  getTPaymentResult: `${user}/getTPaymentResult`,

  //AUTHENCATION
  verifyGoogleAuthenctionCodeForEnableDisable: `${admin}/verifyGoogleAuthenctionCodeForEnableDisable`,
  enableDisableGoogleAuthenction: `${admin}/enableDisableGoogleAuthenction`,
  verifyGoogleAuthenctionCode: `${admin}/verifyGoogleAuthenctionCode`,
  subscriptionPlanListWithFilterV1: `${admin}/subscriptionPlanListWithFilterV1`,
  disableUserGoogleAuthByAdmin: `${admin}/disableUserGoogleAuthByAdmin`,
  subscriptionPlanList: `${admin}/subscriptionPlanList`,

  // admin
  forgotPassword: `${admin}/forgotPassword`,
  changePassword: `${admin}/changePassword`,
  viewSubscription: `${admin}/viewSubscription`,

  updateCapitalAmount: `${admin}/updateCapitalAmount`,
  getCapitalAmount: `${admin}/getCapitalAmount`,
  getTrustPaymentKeysStatus: `${admin}/getTrustPaymentKeysStatus`,

  //staticContent

  // addVideo: `${staticContent}/addVideo`,
  // editVideo: `${staticContent}/editVideo`,
  // deleteVideo: `${staticContent}/deleteVideo`,
  // addNews: `${staticContent}/addNews`,
  // editNews: `${staticContent}/editNews`,
  // deleteNews: `${staticContent}/deleteNews`,
  // listStaticContent: `${staticContent}/listStaticContent`,
  // editStaticContent: `${staticContent}/editStaticContent`,
  // faqList: `${staticContent}/faqList`,
  // deleteFAQ: `${staticContent}/deleteFAQ`,
  // addFAQ: `${staticContent}/addFAQ`,
  // editFAQ: `${staticContent}/editFAQ`,
  // viewFAQ: `${staticContent}/viewFAQ`,

  viewVideo: `${staticContent}/viewVideo`,
  videoList: `${staticContent}/videoList`,
  viewNews: `${staticContent}/viewNews`,
  newsList: `${staticContent}/newsList`,
  viewStaticContent: `${staticContent}/viewStaticContent`,
  addContactUs: `${staticContent}/addContactUs`,
  newLetter: `${staticContent}/newLetter`,

  changePasswordUser: `${user}/changePassword`,

  //notification
  listNotification: `${notification}/listNotification`,
  readNotification: `${notification}/readNotification`,
  clearNotification: `${notification}/clearNotification`,
  enableDisableNotification: `${notification}/enableDisableNotification`,

  //triangularArbitrage
  filterProfitPathsTriangular: `${triangularArbitrage}/filterProfitPaths`,
  getDataAutoTradeOnOffTran: `${triangularArbitrage}/getDataAutoTradeOnOff`,
  tradeProfitPathsTriangular: `${triangularArbitrage}/tradeProfitPaths`,
  listPlacedTradeTriangular: `${triangularArbitrage}/listPlacedTrade`,
  viewPlacedTradeTriangular: `${triangularArbitrage}/viewPlacedTrade`,
  activeBlockvPlacedTradeTriangular: `${triangularArbitrage}/activeBlockPlacedTrade`,
  deletePlacedTradeTriangular: `${triangularArbitrage}/deletePlacedTrade`,
  cancelledOrderTriangular: `${triangularArbitrage}/cancelledOrder/`,
  autoTradeOnOffTriangular: `${triangularArbitrage}/autoTradeOnOff`,
  listPlacedTriangularTradeWithFilter: `${triangularArbitrage}/listPlacedTradeWithFilter`,
  listPlacedTradeWithFilterForParticularUserTriangular: `${triangularArbitrage}/listPlacedTradeWithFilterForParticularUser`,
  getDataSniperBotOnOffTran: `${triangularArbitrage}/getDataSniperBotOnOff`,
  sniperBotOnOffTriangular: `${triangularArbitrage}/sniperBotOnOff`,
  rebalancingTriangularTrade: `${triangularArbitrage}/rebalancingTrade`,
  getDataRebalancingBotOnOffTran: `${triangularArbitrage}/getDataRebalancingBotOnOff`,
  // /intraArbitrageSingleExchange/getDataRebalancingBotOnOff,
  updatePlacedTradeTri: `${triangularArbitrage}/updatePlacedTrade`,

  //IntraArb
  profitPathsIntraArb: `${IntraArb}/profitPaths`,
  filterProfitPathsIntraArb: `${IntraArb}/filterProfitPaths`,
  autoTradeOnOffIntraArb: `${IntraArb}/autoTradeOnOff`,
  tradeProfitPathsIntraArb: `${IntraArb}/tradeProfitPaths`,
  listPlacedTradeIntraArb: `${IntraArb}/listPlacedTrade`,
  viewPlacedTradeIntraArb: `${IntraArb}/viewPlacedTrade/`,
  activeBlockvPlacedTradeIntraArb: `${IntraArb}/activeBlockvPlacedTrade`,
  deletePlacedTradeIntraArb: `${IntraArb}/deletePlacedTrade`,
  cancelledOrderIntraArb: `${IntraArb}/cancelledOrder/`,
  sniperBotOnOffIntraArb: `${IntraArb}/getDataSniperBotOnOff`,
  getDataAutoTradeOnOffArb: `${IntraArb}/getDataAutoTradeOnOff`,
  // sniperBotOnOff: `${IntraArb}//directArbitrage/getDataSniperBotOnOff`,  /intraArbitrageSingleExchange/sniperBotOnOff
  sniperBotOnOffIntraArbOnOf: `${IntraArb}/sniperBotOnOff`,
  rebalancingTradeIntra: `${IntraArb}/rebalancingTrade`,
  getDataRebalancingBotOnOffIntraArb: `${IntraArb}/getDataRebalancingBotOnOff`,
  updatePlacedTradeIntra: `${IntraArb}/updatePlacedTrade`,

  //analytics
  arbitrageData: `${analytics}/arbitrageData`,
  tradingDetails: `${analytics}/tradingDetails`,
  tradingView: `${analytics}/tradingView`,

  //analytics
  // arbitrageData: `${analytics}/arbitrageData`,
  // tradingDetails: `${analytics}/tradingDetails`,
  // tradingView: `${analytics}/tradingView`,

  //wallet
  connectedExchangeList: `${wallet}/connectedExchangeList`,
  connectedExchangePreviousList: `${wallet}/connectedExchangePreviousList`,
  exchangeBalance: `${wallet}/exchangeBalance`,
  listExchange: `${wallet}/listExchange`,
  serverIPAddress: `${wallet}/serverIPAddress`,
  connectExchange: `${wallet}/connectExchange`,
  exchangeCoins: `${wallet}/exchangeCoins`,
  removeConnectedExchange: `${wallet}/removeConnectedExchange`,
  asks_bids_prices: `${wallet}/asks_bids_prices`,
  mexcPairList: `${wallet}/mexcPairList`,
  generateAddress: `${wallet}/generateAddress`,
  getWithdrawAddress: `${wallet}/getWithdrawAddress`,
  deposit: `${wallet}/deposit`,
  withdraw: `${wallet}/withdraw`,
  withdrawDetails: `${wallet}/withdrawDetails`,
  // withdrawHistory: `${wallet}/withdrawHistoryy`,
  Dashboard: `${wallet}/Dashboard`,
  DashboardRecentData: `${wallet}/DashboardRecentData`,
  cryptoAssetprofit: `${wallet}/cryptoAssetprofit`,
  mexcPairList: `${wallet}/mexcPairList`,
  // cryptoAssetprofit: `${wallet}/cryptoAssetprofit`,
  shortTimeProfit: `${wallet}/shortTimeProfit`,
  withdrawDepositeHistory: `${wallet}/withdrawDepositeHistory`,
  transationHistory: `${wallet}/transationHistory`,
  statistic: `${wallet}/statistic`,
  profitStats: `${wallet}/profitStats`,
  get_wallet_coinImageData: `${wallet}/coinImageData`,
  exchangeBalanceParticularUser: `${wallet}/exchangeBalanceParticularUser`,
  pairList: `${wallet}/pairList`,
  transactionStatistic: `${wallet}/transactionStatistic`,
  exchangeTradeCount: `${wallet}/exchangeTradeCount`,

  //wallet
  // listExchange: `${wallet}/listExchange`,
  // serverIPAddress: `${wallet}/serverIPAddress`,
  // connectExchange: `${wallet}/connectExchange`,
  // exchangeCoins: `${wallet}/exchangeCoins`,
  // removeConnectedExchange: `${wallet}/removeConnectedExchange`,
  // asks_bids_prices: `${wallet}/asks_bids_prices`,

  //notification

  //DirectArb
  profitPathsDirectArb: `${DirectArb}/profitPaths`,
  filterProfitPathsDirectArb: `${DirectArb}/filterProfitPaths`,
  autoTradeOnOffDirectArb: `${DirectArb}/autoTradeOnOff`,
  tradeProfitPathsDirectArb: `${DirectArb}/tradeProfitPaths`,
  listPlacedTradeDirectArb: `${DirectArb}/listPlacedTrade`,
  viewPlacedTradeDirectArb: `${DirectArb}/viewPlacedTrade/`,
  activeBlockvPlacedTradeDirectArb: `${DirectArb}/activeBlockvPlacedTrade`,
  deletePlacedTradeDirectArb: `${DirectArb}/deletePlacedTrade`,
  cancelledOrderDirectArb: `${DirectArb}/cancelledOrder/`,

  //DirectArb
  // profitPathsDirectArb: `${DirectArb}/profitPaths`,
  getDataAutoTradeOnOff: `${DirectArb}/getDataAutoTradeOnOff`,
  // filterProfitPathsDirectArb: `${DirectArb}/filterProfitPaths`,
  // autoTradeOnOffDirectArb: `${DirectArb}/autoTradeOnOff`,
  // tradeProfitPathsDirectArb: `${DirectArb}/tradeProfitPaths`,
  // listPlacedTradeDirectArb: `${DirectArb}/listPlacedTrade`,
  // viewPlacedTradeDirectArb: `${DirectArb}/viewPlacedTrade/`,
  // activeBlockvPlacedTradeDirectArb: `${DirectArb}/activeBlockvPlacedTrade`,
  // deletePlacedTradeDirectArb: `${DirectArb}/deletePlacedTrade`,
  // cancelledOrderDirectArb: `${DirectArb}/cancelledOrder/`,
  listPlacedDirectTradeWithFilter: `${DirectArb}/listPlacedTradeWithFilter`,
  listPlacedTradeWithFilterForParticularUser: `${DirectArb}/listPlacedTradeWithFilterForParticularUser`,
  rebalancingTradeIntra: `${IntraArb}/rebalancingTrade`,
  getDataSniperBotOnOff: `${DirectArb}/getDataSniperBotOnOff`,
  sniperBotOnOffDirectArb: `${DirectArb}/sniperBotOnOff`,

  //IntraArb
  profitPathsIntraArb: `${IntraArb}/profitPaths`,
  filterProfitPathsIntraArb: `${IntraArb}/filterProfitPaths`,
  autoTradeOnOffIntraArb: `${IntraArb}/autoTradeOnOff`,
  tradeProfitPathsIntraArb: `${IntraArb}/tradeProfitPaths`,
  listPlacedTradeIntraArb: `${IntraArb}/listPlacedTrade`,
  viewPlacedTradeIntraArb: `${IntraArb}/viewPlacedTrade/`,
  activeBlockvPlacedTradeIntraArb: `${IntraArb}/activeBlockvPlacedTrade`,
  deletePlacedTradeIntraArb: `${IntraArb}/deletePlacedTrade`,
  cancelledOrderIntraArb: `${IntraArb}/cancelledOrder/`,
  listPlacedTradeWithFilterIntraArb: `${IntraArb}/listPlacedTradeWithFilter`,

  //Loop Arbitrage
  filterProfitPathsLoop: `${loopArbitrage}/filterProfitPaths`,
  listPlacedTradeLoop: `${loopArbitrage}/listPlacedTrade`,
  tradeProfitPathsLoop: `${loopArbitrage}/tradeProfitPaths`,
  viewPlacedTradeLoop: `${loopArbitrage}/viewPlacedTrade`,
  activeBlockPlacedTradeLoop: `${loopArbitrage}/activeBlockvPlacedTrade`,
  cancelledOrderLoop: `${loopArbitrage}/cancelledOrder`,
  deletePlacedTradeLoop: `${loopArbitrage}/deletePlacedTrade`,
  autoTradeOnOffLoop: `${loopArbitrage}/autoTradeOnOff`,
  listPlacedLoopTradeWithFilter: `${loopArbitrage}/listPlacedTradeWithFilter`,
};
