// envProbe.js
// This module is imported only for debugging Vite env injection.

// eslint-disable-next-line no-console
console.log("[envProbe] import.meta.env.VITE_API_URL=", import.meta.env.VITE_API_URL);

export const __envProbe = {
  viteApiUrl: import.meta.env.VITE_API_URL,
};

