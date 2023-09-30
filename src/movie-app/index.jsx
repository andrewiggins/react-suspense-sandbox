import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./index.css";

const container = document.getElementById("root");
if (!container) throw new Error("Couldn't find #root element");
const root = ReactDOM.createRoot(container);
root.render(<App />);
