/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Ensure the protocol matches (http or https)
        hostname: 'images.unsplash.com', // The hostname from your image URLs
        port: '', // Leave empty unless a specific port is used
        pathname: '/**', // Allow any path on this hostname
      },
      // Add other domains here if you use images from different sources
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      //   port: '',
      //   pathname: '/my-images/**',
      // },
    ],
  },
};

export default config;
