import * as React from "react";
import * as ReactDOM from "react-dom";
import { ReactTracer } from "../../lib/ReactTracer.js";

function Checkbox() {
	let [checked, setChecked] = React.useState(false);
	let [, setState] = React.useState(false);
	ReactTracer.log("render", checked);

	return (
		<label>
			<input
				type="checkbox"
				checked={checked}
				onChange={(e) => {
					ReactTracer.log({
						event: "change",
						nativeType: e.nativeEvent?.type ?? e.type,
						checked: e.target.checked,
					});
					setChecked(e.target.checked);
				}}
				onClick={(e) => {
					const target = /** @type {HTMLInputElement} */ (e.target);
					ReactTracer.log({
						event: "click",
						nativeType: e.nativeEvent?.type ?? e.type,
						checked: target.checked,
					});
					// In Preact with microtask batching, this rerender resets the input
					// value to false, invalidating the user's desired change of checkbox
					// state
					setState((s) => !s);
				}}
			/>{" "}
			Checked? {String(checked)}
		</label>
	);
}

function App() {
	return (
		<>
			<h2>Checkbox example</h2>
			<div>
				<Checkbox />
			</div>
		</>
	);
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
