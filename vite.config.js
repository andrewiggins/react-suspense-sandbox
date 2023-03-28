import path, { resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * @typedef ReactFileConfig
 * @property {"16" | "latest" | "archive"} version
 * @property {string} commit
 * @property {"development" | "profiling.min" | "production.min"} buildType
 */

/** @type {{ latest: ReactFileConfig; sixteen: ReactFileConfig; }} */
const config = {
	latest: {
		version: "latest",
		commit: "b2ae9ddb3",
		buildType: "profiling.min",
	},
	sixteen: {
		version: "16",
		commit: "16-14-0",
		buildType: "profiling.min",
	},
};

const currentConfig = config.latest;

/** @type {(config: ReactFileConfig) => Record<string, string>} */
const getAliases = (config) => ({
	"react-dom/client": expand(`./lib/clientAdapter.js`),
	react: expand(
		`./lib/${config.version}/react.${config.commit}.${config.buildType}.js`
	),
	"react-dom": expand(
		`./lib/${config.version}/react-dom.${config.commit}.${config.buildType}.js`
	),
	scheduler: expand(
		`./lib/${config.version}/scheduler.${config.commit}.${config.buildType}.js`
	),
});

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
		alias: getAliases(currentConfig),
	},
	build: {
		minify: false,
		sourcemap: true,
		modulePreload: { polyfill: false },
		rollupOptions: {
			input: {
				main: expand("index.html"),
				children: expand("src/children/index.html"),
				events: expand("src/events/index.html"),
				inputs: expand("src/inputs/index.html"),
				fiber: expand("src/fiber/index.html"),
				fragments: expand("src/fragments/index.html"),
				movieApp: expand("src/movie-app/index.html"),
				context: expand("src/context/index.html"),
				// suspense: expand("src/suspense/index.html"),
			},
		},
	},
});
