import { defineConfig } from "vite-plus";
import { voidPlugin } from "void";
import { voidVue } from "@void/vue/plugin";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [voidPlugin(), voidVue(), tailwindcss()],
  staged: {
    "*": "vp check --fix",
  },
  lint: { options: { typeAware: true, typeCheck: true } },
});
