/* ============================================= */
/* CONFIGURACIÓN DE TAILWIND CSS                 */
/* Define la paleta de colores y tipografías     */
/* personalizadas para MichiAdopta Shop          */
/* ============================================= */

/** @type {import('tailwindcss').Config} */
export default {
  /* content: indica a Tailwind dónde buscar las clases para generar el CSS */
  content: [
    "./index.html",              /* Escanea el HTML principal */
    "./src/**/*.{js,jsx,ts,tsx}", /* Escanea todos los archivos JS/JSX de src */
  ],
  theme: {
    extend: {
      /* Paleta de colores personalizada con prefijo "michi-" */
      colors: {
        'michi-bg': '#FDF6EE',         /* Fondo crema suave (calma, hogar) */
        'michi-primary': '#E8734A',    /* Terracota/naranja michi (botones, detalles) */
        'michi-secondary': '#7BA05B',  /* Verde salvia (adopción, éxito) */
        'michi-accent': '#F4A6A6',     /* Rosa patita (acentos tiernos) */
        'michi-text': '#3E2F23',       /* Café oscuro (texto legible) */
        'michi-card': '#FFFFFF',       /* Blanco (tarjetas con sombra) */
      },
      /* Tipografías de Google Fonts */
      fontFamily: {
        'heading': ['Fredoka', 'sans-serif'], /* Títulos redondeados y amigables */
        'body': ['Nunito', 'sans-serif'],     /* Cuerpo suave y legible */
      },
    },
  },
  plugins: [],
}