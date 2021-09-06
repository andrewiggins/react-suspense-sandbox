import path from "path";
import { fileURLToPath } from "url";
import { transform } from "sucrase";
import { createCodeFrame } from "simple-code-frame";
import { defineConfig } from "wmr";

// @ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const expand = (...args) => path.join(__dirname, ...args);

export default defineConfig((config) => {
  return {
    ...config,
    publicPath: "/react-suspense-sandbox/",
    features: {
      preact: false,
    },
    alias: {
      react: expand("./lib/react.b4f119cdf.development.js"),
      "react-dom": expand("./lib/react-dom.b4f119cdf.development.js"),
      scheduler: expand("./lib/scheduler.b4f119cdf.development.js"),
    },
    plugins: [
      ...config.plugins,
      {
        name: "sucrase-jsx",
        enforce: "pre",
        transform(code, id) {
          if (!id.endsWith(".jsx")) {
            return;
          }

          try {
            const result = transform(code, {
              transforms: ["jsx"],
              production: true,
              filePath: id,
              disableESTransforms: true,
            });

            return {
              code: result.code,
              map: result.sourceMap,
            };
          } catch (err) {
            // Enhance error with code frame
            err.codeFrame = createCodeFrame(
              code,
              err.loc.line - 1,
              err.loc.column
            );
            throw err;
          }
        },
      },
    ],
  };
});
