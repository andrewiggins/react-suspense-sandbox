import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ReactTracer } from "../../lib/ReactTracer.js";

function SimpleInput() {
	const [value, setValue] = React.useState("");

	return (
		<label>
			Simple:{" "}
			<input
				type="text"
				value={value}
				onChange={(e) => {
					ReactTracer.log({
						event: "change",
						nativeType: e.nativeEvent?.type ?? e.type,
						checked: e.target.checked,
					});
					setValue(e.target.value);
				}}
			/>
		</label>
	);
}

function MaxLengthInput() {
	const [value, setValue] = React.useState("");

	return (
		<label>
			Max length 5:{" "}
			<input
				type="text"
				value={value}
				onChange={(e) => {
					ReactTracer.log({
						event: "change",
						nativeType: e.nativeEvent?.type ?? e.type,
						checked: e.target.checked,
					});
					setValue(e.target.value?.slice(0, 5));
				}}
			/>
		</label>
	);
}

function App() {
	return (
		<>
			<h2>Input example</h2>
			<SimpleInput />
			<MaxLengthInput />
		</>
	);
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
