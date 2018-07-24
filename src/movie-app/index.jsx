import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";

const container = document.getElementById("root");
const root = ReactDOM.unstable_createRoot(container);
root.render(<App />);
