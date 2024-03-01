import react from '@vitejs/plugin-react';
import {defineConfig} from "vite";

export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            usePolling: true
        },
        port: 3000,
        host: '0.0.0.0',
        strictPort: true,
    }
});
