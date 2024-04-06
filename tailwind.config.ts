import type { Config } from "tailwindcss"
import { join } from "path"

export default {
    content: [join(import.meta.dir, "web/**/*.{js,ts,jsx,tsx}")],
    theme: {
        extend: {}
    },
    darkMode: "class",
    plugins: [require("daisyui")]
} satisfies Config
