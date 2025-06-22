import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Retro Roblox color palette
        retro: {
          blue: {
            50: "hsl(210, 40%, 98%)",
            100: "hsl(210, 40%, 96%)",
            200: "hsl(214, 32%, 91%)",
            300: "hsl(213, 27%, 84%)",
            400: "hsl(215, 20%, 65%)",
            500: "hsl(215, 16%, 47%)",
            600: "hsl(215, 19%, 35%)",
            700: "hsl(215, 25%, 27%)",
            800: "hsl(217, 33%, 17%)",
            900: "hsl(222, 47%, 11%)",
          },
          gray: {
            50: "hsl(0, 0%, 98%)",
            100: "hsl(240, 5%, 96%)",
            200: "hsl(240, 6%, 90%)",
            300: "hsl(240, 5%, 84%)",
            400: "hsl(240, 5%, 65%)",
            500: "hsl(240, 4%, 46%)",
            600: "hsl(240, 5%, 34%)",
            700: "hsl(240, 5%, 26%)",
            800: "hsl(240, 4%, 16%)",
            900: "hsl(240, 6%, 10%)",
          },
          green: {
            500: "hsl(120, 100%, 25%)",
            600: "hsl(120, 100%, 20%)",
          },
          red: {
            500: "hsl(0, 100%, 50%)",
            600: "hsl(0, 100%, 45%)",
          },
        },
        // Original color system for compatibility
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        retro: ["Tahoma", "Verdana", "Arial", "sans-serif"],
        pixel: ["Courier New", "monospace"],
      },
      borderRadius: {
        none: "0px",
        retro: "1px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        retro: "2px 2px 0px 0px rgba(0, 0, 0, 0.8)",
        "retro-inset":
          "inset 1px 1px 0px 0px rgba(255, 255, 255, 0.5), inset -1px -1px 0px 0px rgba(0, 0, 0, 0.3)",
        "retro-button":
          "1px 1px 0px 1px rgba(0, 0, 0, 0.8), inset 1px 1px 0px 0px rgba(255, 255, 255, 0.6)",
        "retro-button-pressed": "inset 1px 1px 2px 0px rgba(0, 0, 0, 0.5)",
        "retro-window":
          "2px 2px 4px 0px rgba(0, 0, 0, 0.5), inset 1px 1px 0px 0px rgba(255, 255, 255, 0.8)",
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.2s ease-out",
        "fade-in": "fade-in 0.1s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
