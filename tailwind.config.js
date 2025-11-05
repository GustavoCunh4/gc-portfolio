/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gc: {
          primary: "var(--gc-primary)",
          secondary: "var(--gc-secondary)",
          accent: "var(--gc-accent)",
          surface: "var(--gc-surface)",
          surfaceAlt: "var(--gc-surface-alt)",
          border: "var(--gc-border)",
          text: "var(--gc-foreground)",
        },
      },
      boxShadow: {
        "ambient-strong": "0 40px 120px rgba(15,23,42,0.45)",
        "ambient-soft": "0 24px 80px rgba(56,189,248,0.22)",
        "surface-glow": "0 0 0 1px rgba(255,255,255,0.06), 0 45px 120px rgba(15,23,42,0.65)",
      },
      dropShadow: {
        glow: "0 6px 40px rgba(124,58,237,0.45)",
      },
      backgroundImage: {
        "hero-noise":
          "radial-gradient(circle at 0% 0%, rgba(124,58,237,0.3), transparent 55%), radial-gradient(circle at 80% 10%, rgba(34,211,238,0.28), transparent 60%), radial-gradient(circle at 50% 90%, rgba(244,114,182,0.24), transparent 55%)",
        "grid-soft":
          "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 0), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 0)",
        "gradient-radial":
          "radial-gradient(circle at 20% 20%, rgba(124,58,237,0.35), transparent 55%), radial-gradient(circle at 85% 30%, rgba(34,211,238,0.3), transparent 60%)",
        "glass-sheen":
          "linear-gradient(140deg, rgba(148,163,184,0.1), rgba(15,23,42,0.55) 55%, rgba(30,41,59,0.25) 100%)",
      },
      backgroundSize: {
        "grid-lg": "72px 72px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(36px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-14px,0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: 0.3 },
          "50%": { opacity: 0.65 },
        },
        "sheen-sweep": {
          "0%": { transform: "translateX(-120%) skewX(-12deg)" },
          "100%": { transform: "translateX(220%) skewX(-12deg)" },
        },
        "gradient-move": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s ease forwards",
        float: "float 7.5s ease-in-out infinite",
        "pulse-soft": "pulse-soft 10s ease-in-out infinite",
        sheen: "sheen-sweep 1.8s cubic-bezier(0.33, 1, 0.68, 1) infinite",
        "gradient-move": "gradient-move 12s ease infinite",
      },
      fontFamily: {
        display: ["'Poppins'", "system-ui", "sans-serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        extra: "0.35em",
      },
    },
  },
  plugins: [],
}
