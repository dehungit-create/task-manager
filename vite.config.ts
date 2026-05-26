import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({ // 2. Cấu hình PWA tự động lưu cache file
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'] // Cache sạch các file giao diện
      },
      manifest: { // Thông tin để hiển thị khi cài lên điện thoại
        name: 'Ứng dụng Quản lý Task',
        short_name: 'TaskApp',
        description: 'App quản lý task chạy offline',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png', // Bạn cần chuẩn bị ảnh icon này trong thư mục public
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})