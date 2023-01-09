import path, { resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const reactCommit = "d1f51f345";
/** @type {"development" | "profiling.min" | "production.min"} */
const buildType = "profiling.min";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const expand = (...args) => path.join(__dirname, ...args);

export default defineConfig({
	base: "/react-suspense-sandbox/",
	plugins: [
		react({
			jsxRuntime: "classic",
			fastRefresh: false,
		}),
	],
	resolve: {
		alias: {
			react: expand(`./lib/react.${reactCommit}.${buildType}.js`),
			"react-dom": expand(`./lib/react-dom.${reactCommit}.${buildType}.js`),
			scheduler: expand(`./lib/scheduler.${reactCommit}.${buildType}.js`),
		},
	},
	build: {
		minify: false,
		sourcemap: true,
		rollupOptions: {
			input: {
				main: expand("index.html"),
				children: expand("src/children/index.html"),
				fiber: expand("src/fiber/index.html"),
				fragments: expand("src/fragments/index.html"),
				movieApp: expand("src/movie-app/index.html"),
				// suspense: expand("src/suspense/index.html"),
			},
		},
	},
});
