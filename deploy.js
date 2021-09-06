import { fileURLToPath } from "url";
import { dirname, join } from "path";
import ghPages from "gh-pages";

// @ts-ignore
const __dirname = dirname(fileURLToPath(import.meta.url));
const p = (...args) => join(__dirname, ...args);

let user;
if (process.env.GITHUB_WORKFLOW) {
  user = {
    name: "github-actions-bot",
    email: "support+actions@github.com",
  };
}

ghPages.publish(
  p("dist"),
  {
    src: [
      "index.html",
      "*.js",
      "assets/**/*",
      "chunks/**/*",
      "src/**/index.html",
      "!**/react-method-tracing*",
    ],
    user,
  },
  () => ghPages.clean()
);
