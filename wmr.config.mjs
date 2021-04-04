import path from "path";
import { fileURLToPath } from "url";
import { transform } from "sucrase";
import { createCodeFrame } from "simple-code-frame";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const expand = (...args) => path.join(__dirname, ...args);

/** @type {(config: import('wmr').Options) => void} */
export default async function (config) {
  config.features = { preact: false };

  config.plugins.push({
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
        });

        return {
          code: result.code,
          map: result.sourceMap,
        };
      } catch (err) {
        // Enhance error with code frame
        err.codeFrame = createCodeFrame(code, err.loc.line - 1, err.loc.column);
        throw err;
      }
    },
  });

  config.aliases = {
    react: expand("./lib/react.b4f119cdf.development.js"),
    "react-dom": expand("./lib/react-dom.b4f119cdf.development.js"),
    scheduler: expand("./lib/scheduler.b4f119cdf.development.js"),
  };
}
