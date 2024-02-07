/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        apiEndpoint: process.env.API_ENDPOINT,
    }
};

export default nextConfig;
