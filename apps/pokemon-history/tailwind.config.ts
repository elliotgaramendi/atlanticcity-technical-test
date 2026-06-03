import type { Config } from "tailwindcss";
import { atlanticCityTailwindPreset } from "../../tailwind.shared";

export default {
  presets: [atlanticCityTailwindPreset],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ],
  plugins: []
} satisfies Config;
