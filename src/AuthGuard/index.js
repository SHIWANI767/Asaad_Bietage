export const isAuthenticated = () => {
  const token = localStorage.getItem("user_token") === null;
  return !!token;
};
export const withoutAuthRoutes = [
  "/404",
  "/500",
  "/_error",
  "/about",
  "/about-us",
  "/privacy-policy",
  "/terms-and-conditions",
  "/risk-disclosure",
  "/price",
  "/tutorial",
  "/exchanges",
  "/features",
  "/auth/login",
  "/auth/signup",
  "/auth/forgot",
  "/auth/forgot-password",
  "/auth/forgot-verify",
  "/auth/reset",
  "/auth/otp",
  "/auth/verify-otp",
  "/auth/reset-password",
  "/article/[dugs]/[slug]",
  "/articles/[blogType]/[id]",
  // "/payment/[id]",
  // "/payment-success/[hash]",
];
