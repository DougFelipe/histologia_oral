import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // other Babel plugins
          [
            "@locator/babel-jsx/dist",
            {
              env: "development",
            },
          ],
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
