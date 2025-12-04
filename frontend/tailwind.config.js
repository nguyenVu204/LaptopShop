/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    // Thêm đoạn cấu hình container này vào:
    container: {
      center: true,      // Tự động căn giữa (margin auto)
      padding: {
        DEFAULT: '1rem', // Mặc định cách lề 16px
        sm: '2rem',      // Màn hình nhỏ cách 32px
        lg: '4rem',      // Màn hình lớn cách 64px
        xl: '5rem',      // Màn hình to hơn cách 80px
      },
    },
  },
  plugins: [],
}