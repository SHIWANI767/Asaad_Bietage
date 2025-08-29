import React, { useEffect, useRef, useState } from "react";

export default function TVChart({ coinType, exchangeName, secondaryCoin }) {
  const chartContainerRef = useRef(null);
  const scriptRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (
      scriptRef.current &&
      chartContainerRef.current &&
      chartContainerRef.current.contains(scriptRef.current)
    ) {
      chartContainerRef.current.removeChild(scriptRef.current);
    }
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        fullscreen: true,
        width: "100%",
        autosize: true,
        hide_side_toolbar: false,
        withdateranges: true,
        symbol: `${exchangeName}:${coinType}${secondaryCoin}`,
        interval: "D",
        timezone: "Asia/Kolkata",
        container_id: "tradingview_Ohl",
        show_popup_button: true,
        popup_width: 500,
        popup_height: 500,
        enable_publishing: false,
        locale: "en",
        theme: "dark",
        hide_top_toolbar: true,
        studies: ["Volume@tv-basicstudies"],
        drawings_access: {
          type: "black",
          tools: [{ name: "Regression Trend" }],
        },
      });
      setLoading(false);
    };
    chartContainerRef.current.appendChild(script);
    scriptRef.current = script;
    return () => {
      if (scriptRef.current) {
        scriptRef.current.onload = null;
      }
      if (
        scriptRef.current &&
        chartContainerRef.current &&
        chartContainerRef.current.contains(scriptRef.current)
      ) {
        chartContainerRef.current.removeChild(scriptRef.current);
      }
    };
  }, [coinType]);

  return (
    <>
      {loading && (
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Loading...
        </p>
      )}
      <div
        ref={chartContainerRef}
        id="tradingview_Ohl"
        className="trade-full"
        style={{ height: "400px", borderRadius: "10px" }}
      ></div>
    </>
  );
}
