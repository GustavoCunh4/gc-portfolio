/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gc: {
          primary: "#7c3aed",
          secondary: "#22d3ee",
          accent: "#f472b6",
          dark: "#050712",
        },
      },
      dropShadow: {
        neon: "0 0 25px rgba(34,211,238,0.45)",
        glow: "0 5px 35px rgba(124,58,237,0.45)",
      },
      backgroundImage: {
        "hero-noise":
          "radial-gradient(circle at 20% 20%, rgba(124,58,237,0.35), transparent 65%), radial-gradient(circle at 80% 0%, rgba(34,211,238,0.32), transparent 55%), radial-gradient(circle at 50% 80%, rgba(244,114,182,0.28), transparent 60%)",
        "grid-soft":
          "linear-gradient(rgba(148,163,184,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-lg": "60px 60px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: 0.35 },
          "50%": { opacity: 0.65 },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s ease forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 8s ease-in-out infinite",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        sans: ["'Manrope'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
