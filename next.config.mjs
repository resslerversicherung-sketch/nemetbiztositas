import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/nemetbiztositas",
  images: {
    domains: ["localhost"],
    unoptimized: true,
  },
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
