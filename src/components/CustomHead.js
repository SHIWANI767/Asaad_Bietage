import Head from "next/head";

const CustomHead = ({
  title: pageTitle,
  description: pageDescription,
  image: pageImage,
  url: pageUrl,
}) => {
  const fullPageUrl = pageUrl?.includes("https")
    ? pageUrl
    : `${process.env.REDIRECT_URI}${pageUrl ?? ""}`;

  const fullPageImage = pageImage?.includes("https")
    ? pageImage
    : pageImage
    ? `${process.env.REDIRECT_URI}${pageImage}`
    : "";

  return (
    <Head>
      {/* Basic Meta Tags */}
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      <meta httpEquiv="Content-Language" content="en" />
      <link rel="canonical" href={fullPageUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={"website"} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={fullPageImage} />
      <meta property="og:image:alt" content={pageTitle} />

      <meta property="og:url" content={fullPageUrl} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={"summary_large_image"} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={fullPageImage} />
      <meta name="twitter:image:alt" content={pageTitle} />
      <meta name="twitter:url" content={fullPageUrl} />

      {/* Robots */}
      <meta name="robots" content="follow, index" />

      {/* Favicon */}
      {/* <link rel="icon" href="/favicon.ico" /> 
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      /> */}

      {/* Schema Markup for Videos */}

      <meta
        name="keywords"
        content={
          "Bitedge, Coin, QuantumFlow, QuantumLoop, QuantumBridge, Exchange, Kraken, Binance, Mexc, Gemini, TradingView chart, ETH, BTC, USDT, Sniper Trade, Smart Limit Orders, Auto Trade, Trade, Arbitrage, Direct Arbitrage, Intra Arbitrage, Triangular Arbitrage"
        }
      />
    </Head>
  );
};

export default CustomHead;
