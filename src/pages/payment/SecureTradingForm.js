import { api_configs } from "@/api-services";
import { encrypt } from "@/utils";
import { useEffect, useRef } from "react";

const SecureTradingForm = ({ jwt, decryptData }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.eu.trustpayments.com/js/latest/st.js"; // Replace with the correct CDN URL
    script.async = true;
    script.onload = () => {
      try {
        // Ensure SecureTrading is available and log it
        if (typeof SecureTrading === "function") {
          const st = SecureTrading({
            jwt: jwt, // Replace with your actual JWT
            formId: "st-form",
            livestatus: 0,
            animatedCard: true,
          });

          console.log("SecureTrading initialized:", st);

          // Check if the form elements exist before initializing
          const cardNumber = document.getElementById("st-card-number");
          const expirationDate = document.getElementById("st-expiration-date");
          const securityCode = document.getElementById("st-security-code");

          if (cardNumber && expirationDate && securityCode) {
            st.Components();
          } else {
            console.error("Missing form elements for TrustPayment widget.");
          }
        } else {
          console.error("SecureTrading script did not load correctly.");
        }
      } catch (error) {
        console.error("Error initializing SecureTrading:", error);
      }
    };
    script.onerror = (error) => {
      console.error("Script load error:", error);
    };
    document.body.appendChild(script);
    if (buttonRef.current) {
      buttonRef.current.textContent =
        decryptData?.type === "update-payment-method"
          ? "Update"
          : "Pay Securely";
    }
    // Cleanup script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, [jwt]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
      });
      const data = await response.json();
      console.log("datatata===", data);
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  const checkEndPoint =
    api_configs[
      decryptData?.type === "update-payment-method"
        ? "tPaymentUpdateCredential"
        : "getTPaymentResult"
    ];

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.textContent =
        decryptData?.type === "update-payment-method"
          ? "Update"
          : "Pay Securely";
    }
  }, [decryptData?.type, jwt]);

  return (
    <div>
      <div id="st-notification-frame"></div>
      <form
        id="st-form"
        action={`${checkEndPoint}?url=${JSON.stringify({
          successUrl: `${window.location.origin}/payment-success/${encrypt({
            ...decryptData?.cardData,
            hashType:
              decryptData?.type === "update-payment-method"
                ? "update-payment-methods"
                : "cardSuccess",
          })}`,
          failUrl: `${window.location.origin}/payment-success/${encrypt({
            ...decryptData?.cardData,
            hashType:
              decryptData?.type === "update-payment-method"
                ? "update-payment-methods"
                : "cardFail",
          })}`,
          obj: JSON.parse(sessionStorage.getItem("paymentObj")),
        })}`}
        method="POST"
        onSubmit={handleSubmit} // Bind the custom submit handler
      >
        <div id="st-card-number" className="st-card-number"></div>
        <div id="st-expiration-date" className="st-expiration-date"></div>
        <div id="st-security-code" className="st-security-code"></div>

        <button
          type="submit"
          id="st-form__submit"
          className="st-form__submit"
          ref={buttonRef}
        >
          {decryptData?.type === "update-payment-method"
            ? "Update"
            : "Pay Securely"}
        </button>
      </form>
    </div>
  );
};

export default SecureTradingForm;
