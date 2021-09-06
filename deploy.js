import { fileURLToPath } from "url";
import { dirname, join } from "path";
import del from "del";
import cpy from "cpy";

// @ts-ignore
const __dirname = dirname(fileURLToPath(import.meta.url));
const p = (...args) => join(__dirname, ...args);

async function main() {
  await del(
    [
      "jsconfig.json",
      "deploy.js",
      "lib",
      "src",
      "assets/react-method-tracing*",
    ],
    {
      cwd: p("dist"),
    }
  );

  await cpy(["src/**/*.html"], "dist", { cwd: p(), parents: true });
}

main();
