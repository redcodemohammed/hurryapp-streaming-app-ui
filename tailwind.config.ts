import type { Config } from "tailwindcss";
import tailwindcssScrollbar from "tailwind-scrollbar";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        "ibm-plex-sans-arabic": ["IBM Plex Sans Arabic", "sans-serif"],
        "noto-naskh-arabic": ["Noto Naskh Arabic", "serif"],
      },
    },
  },
  plugins: [tailwindcssScrollbar],
};
