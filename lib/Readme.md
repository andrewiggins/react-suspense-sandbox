# React + tracing

These files are generated from github.com/andrewiggins/react, the `esm-tracing-latest` branch.

After running `yarn build` each file comes from:

Latest:

`react`: `build\oss-stable\react\umd\react.development.js`
`react-dom`: `build\oss-stable\react-dom\umd\react-dom.development.js`
`scheduler`: `build\oss-stable\scheduler\umd\scheduler.development.js`

The build automatically produces ESM for react and react-dom but not scheduler
so the scheduler package has been manually updated to ESM.

We run prettier on the build output in this repo to make comparisons more
consistent and less dependent on build process whitespace handling
