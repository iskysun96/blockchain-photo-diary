import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_ALGOD_TOKEN': JSON.stringify(process.env.VITE_ALGOD_TOKEN),
    'process.env.VITE_ALGOD_SERVER': JSON.stringify(process.env.VITE_ALGOD_SERVER),
    'process.env.VITE_ALGOD_PORT': JSON.stringify(process.env.VITE_ALGOD_PORT),
    'process.env.VITE_ALGOD_NETWORK': JSON.stringify(process.env.VITE_ALGOD_NETWORK),
    'process.env.VITE_INDEXER_TOKEN': JSON.stringify(process.env.VITE_INDEXER_TOKEN),
    'process.env.VITE_INDEXER_SERVER': JSON.stringify(process.env.VITE_INDEXER_SERVER),
    'process.env.VITE_INDEXER_PORT': JSON.stringify(process.env.VITE_INDEXER_PORT),
    'process.env.VITE_PINATA_JWT': JSON.stringify(process.env.VITE_PINATA_JWT),
  },
})
