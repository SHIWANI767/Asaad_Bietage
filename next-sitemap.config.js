/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.REDIRECT_URI || "https://bitedge.app", // Base URL
  generateRobotsTxt: true, // Generate robots.txt file
  sitemapBaseFileName: "custom-sitemap", // This will generate custom-sitemap.xml
  outDir: "./public", // Output directory
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/auth/*", "/admin/*"], // Exclude sensitive paths

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: [
          "/payment-success/[hash]",
          "/checkout/[id]",
          "/user-profile",
          "/auth/*",
          "/admin",
        ],
      },
      {
        userAgent: "*",
        allow: [
          "/",
          "/about",
          "/price",
          "/exchanges",
          "/tutorial",
          "/article/[dugs]/[slug]",
          "/articles/[blogType]/[id]",
        ],
      },
    ],
    additionalSitemaps: [
      `${process.env.REDIRECT_URI || "https://bitedge.app"}/custom-sitemap.xml`,
      `${process.env.REDIRECT_URI || "https://bitedge.app"}/sitemap.xml`,
    ],
  },
};
