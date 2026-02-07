export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        floatSlow: "floatSlow 12s ease-in-out infinite",
        floatMedium: "floatMedium 8s ease-in-out infinite",
        floatFast: "floatFast 6s ease-in-out infinite",
        glow: "glow 2.5s ease-in-out infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-40px)" },
        },
        floatMedium: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-60px)" },
        },
        floatFast: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-80px)" },
        },
        glow: {
          "0%, 100%": {
            textShadow: "0 0 8px rgba(255,215,0,0.6), 0 0 16px rgba(255,215,0,0.4)",
          },
          "50%": {
            textShadow: "0 0 14px rgba(255,215,0,0.9), 0 0 28px rgba(255,215,0,0.7)",
          },
        },
      },
    },
  },
  plugins: [],
};
