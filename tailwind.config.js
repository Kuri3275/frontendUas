/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // Tambahkan ini agar kita bisa switch manual dark/light via class 'dark' di <html>
 
}
module.exports = {
  darkMode: 'class', // Penting: agar toggle berfungsi via class 'dark' di <html>
  // ... rest of config
}