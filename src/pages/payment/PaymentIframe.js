// components/PaymentIframe.js
// const CDN_DOMAIN = "https://cdn.eu.trustpayments.com/js/latest/st.js";
// const CDN_DOMAIN = "https://cdn.eu.trustpayments.com/js/latest/st.js";
// const CDN_DOMAIN = "https://cdn.securetrading.com/js/latest/st.js"; // Replace with actual CDN URL if needed
import { useEffect, useState } from "react";
import SecureTradingForm from "./SecureTradingForm";

export default function PaymentIframe({ order }) {
  const [token, setToken] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const CDN_DOMAIN = "cdn.eu.trustpayments.com/js/latest";
  const LIVESTATUS = 0; // Use 1 for production or 0 for sandbox

  // Fetch JWT token from the backend
  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch("/api/generate-payment-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch JWT token");
        }

        const data = await response.json();
        if (!data.token) {
          throw new Error("Invalid JWT token received");
        }
        console.log(data.token, "token");
        setToken(data.token);
      } catch (error) {
        console.error("Error fetching JWT token:", error);
      }
    }
    if (order.amount) {
      fetchToken();
    }
  }, [order]);

  // Load SecureTrading st.js and initialize components
  // useEffect(() => {
  //   if (token) {
  //     const script = document.createElement("script");
  //     script.src = CDN_DOMAIN;

  //     script.onload = () => {
  //       try {
  //         if (typeof SecureTrading === "undefined") {
  //           throw new Error("SecureTrading library failed to load");
  //         }

  //         const st = SecureTrading({
  //           jwt: token,
  //           livestatus: LIVESTATUS,
  //         });

  //         st.Components(); // Initialize SecureTrading components
  //         setIsLoaded(true);
  //         console.log("SecureTrading components initialized successfully");
  //       } catch (error) {
  //         console.error("Error initializing SecureTrading components:", error);
  //       }
  //     };

  //     script.onerror = () => {
  //       console.error("Failed to load SecureTrading script");
  //     };

  //     document.body.appendChild(script);
  //   }
  // }, [token]);

  return (
    <div>
      {/* <div id="st-notification-frame"></div> */}
      {token && <SecureTradingForm jwt={token} CDN_DOMAIN={CDN_DOMAIN} />}
      {/* <form
        id="st-form"
        action={`${process.env.NEXT_PUBLIC_PAYMENT_SUCCESS_URL}`}
        method="POST"
      >
        <div id="st-card-number"></div>
        <div id="st-expiration-date"></div>
        <div id="st-security-code"></div>
        <div id="st-animated-card"></div>{" "}
        <button type="submit" disabled={!isLoaded}>
          {isLoaded ? "Pay securely" : "Loading..."}
        </button>
      </form> */}
    </div>
  );
}

// import { useEffect, useState } from "react";

// export default function PaymentIframe({ order }) {
//   const [token, setToken] = useState("");
//   const [isFormReady, setIsFormReady] = useState(false);
//   const CDN_DOMAIN = "https://cdn.eu.trustpayments.com/js/latest/st.js"; // Secure Trading CDN URL

//   useEffect(() => {
//     // Fetch the JWT token from the backend when the component mounts
//     async function fetchToken() {
//       try {
//         const response = await fetch("/api/generate-payment-token", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(order),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch JWT token");
//         }

//         const data = await response.json();
//         if (!data.token) {
//           throw new Error("Invalid token received");
//         }

//         setToken(data.token); // Store the token in the state
//       } catch (error) {
//         console.error("Error fetching token:", error);
//       }
//     }
//     if (order.amount) {
//       fetchToken();
//     }
//   }, [order]);

//   useEffect(() => {
//     if (token) {
//       // Load Secure Trading SDK after the token is fetched
//       const script = document.createElement("script");
//       script.src = CDN_DOMAIN;
//       script.onload = () => {
//         if (typeof SecureTrading === "undefined") {
//           console.error("Secure Trading SDK failed to load.");
//           return;
//         }

//         const st = SecureTrading({
//           jwt: token,
//         });
//         console.log("st", st);
//         // Verify that st.Components() is callable and returns a Promise
//         if (st && typeof st.Components === "function") {
//           try {
//             // Initialize the components for card number, expiration date, and security code
//             st.Components()
//               .then(() => {
//                 setIsFormReady(true); // Enable form submission once components are ready
//                 console.log("Secure Trading components initialized.");
//               })
//               .catch((error) => {
//                 console.error(
//                   "Error initializing Secure Trading components:",
//                   error
//                 );
//               });
//           } catch (error) {
//             console.error("Error calling st.Components:", error);
//           }
//         } else {
//           console.error("Secure Trading SDK is not initialized correctly.");
//         }
//       };

//       script.onerror = (error) => {
//         console.error("Error loading Secure Trading SDK.", error);
//         document.getElementById("st-notification-frame").innerText =
//           "Failed to load payment form.";
//       };

//       document.body.appendChild(script);
//     }
//   }, [token]);

//   if (!token) {
//     return <p>Loading payment form...</p>;
//   }

//   return (
//     <div>
//       <div id="st-notification-frame"></div>
//       <form
//         id="st-form"
//         action={`${process.env.NEXT_PUBLIC_REDIRECT_URI}/payment-success/${order.orderReference}`}
//         method="POST"
//       >
//         <div id="st-card-number"></div>
//         <div id="st-expiration-date"></div>
//         <div id="st-security-code"></div>
//         <button type="submit" disabled={!isFormReady}>
//           {isFormReady ? "Pay securely" : "Loading..."}
//         </button>
//       </form>
//     </div>
//   );
// }
