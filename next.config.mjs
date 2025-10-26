// next.config.mjs - VERCEL DEBUG
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 👇 CONFIGURAÇÕES QUE A VERCEL RESPEITA
  reactStrictMode: false,
  
  compiler: {
    removeConsole: false, // Isso funciona na Vercel
    reactRemoveProperties: false,
  },
  
  // 👇 IMAGES DESABILITADAS para debug
  images: {
    unoptimized: true, // Isso a Vercel respeita
  },
  
  // 👇 HEADERS para identificar o deploy
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Debug-Deploy',
            value: `${process.env.VERCEL_GIT_COMMIT_SHA || 'local'}-${Date.now()}`,
          },
        ],
      },
    ];
  },
  
  // 👇 ENV VARIABLES (funcionam na Vercel)
  env: {
    DEBUG_HYDRATION: 'true',
    NEXT_PUBLIC_APP_ENV: process.env.VERCEL_ENV || 'development',
  },
  
  // 👇 WEBPACK config básica
  webpack: (config, { isServer }) => {
    // Source maps na Vercel
    if (!isServer) {
      config.devtool = 'source-map';
    }
    
    return config;
  },
};

export default nextConfig;