/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(0, 0%, 100%)", // --background
        foreground: "hsl(224, 71.4%, 4.1%)", // --foreground
        card: "hsl(0, 0%, 100%)", // --card
        "card-foreground": "hsl(224, 71.4%, 4.1%)", // --card-foreground
        popover: "hsl(0, 0%, 100%)", // --popover
        "popover-foreground": "hsl(224, 71.4%, 4.1%)", // --popover-foreground
        primary: "hsl(262.1, 83.3%, 57.8%)", // --primary
        "primary-foreground": "hsl(210, 20%, 98%)", // --primary-foreground
        secondary: "hsl(220, 14.3%, 95.9%)", // --secondary
        "secondary-foreground": "hsl(220.9, 39.3%, 11%)", // --secondary-foreground
        muted: "hsl(220, 14.3%, 95.9%)", // --muted
        "muted-foreground": "hsl(220, 8.9%, 46.1%)", // --muted-foreground
        accent: "hsl(220, 14.3%, 95.9%)", // --accent
        "accent-foreground": "hsl(220.9, 39.3%, 11%)", // --accent-foreground
        destructive: "hsl(0, 84.2%, 60.2%)", // --destructive
        "destructive-foreground": "hsl(210, 20%, 98%)", // --destructive-foreground
        border: "hsl(220, 13%, 91%)", // --border
        input: "hsl(220, 13%, 91%)", // --input
        ring: "hsl(262.1, 83.3%, 57.8%)", // --ring
        "chart-1": "hsl(12, 76%, 61%)", // --chart-1
        "chart-2": "hsl(173, 58%, 39%)", // --chart-2
        "chart-3": "hsl(197, 37%, 24%)", // --chart-3
        "chart-4": "hsl(43, 74%, 66%)", // --chart-4
        "chart-5": "hsl(27, 87%, 67%)", // --chart-5
      },
      borderRadius: {
        DEFAULT: "0.5rem", // --radius
      },
    },
  },
  plugins: [],
};
