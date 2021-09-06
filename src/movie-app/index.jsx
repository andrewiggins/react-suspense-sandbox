import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App.jsx";
import "./styles.scss";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
