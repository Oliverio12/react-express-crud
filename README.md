// dependencias para express
npm init -yes
npm i express
npm i mysql2 express-mysql-session morgan dotenv cors moment mysql mysql2 body-parser
npm install --save-dev nodemon
npm install bcrypt

//dependencias para React
npm create vite@latest

//rutas
npm install react-router-dom

//Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

//configuracion de tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',    // Asegura que Tailwind procese el archivo HTML principal
    './src/*/.{js,jsx,ts,tsx}', // Procesa los archivos dentro de la carpeta src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// postcss.config.js
export default {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }

// colocar en index.css o app.css
@tailwind base;
@tailwind components;
@tailwind utilities;

  







