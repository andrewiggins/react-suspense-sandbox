import * as React from "react";
import * as ReactDOM from "react-dom";

/**
 * @param {{ values: string[] }} props
 */
function List({ values }) {
	return (
		<ol>
			{values.map((v) => (
				<li key={v}>{v}</li>
			))}
		</ol>
	);
}

/**
 * @typedef Operation
 * @property {string} id
 * @property {string} label
 * @property {React.ReactElement} init
 * @property {React.ReactElement} runs
 */

/**
 * @type {Operation[]}
 */
const operations = [
	{
		id: "update",
		label: "Update in-place",
		init: (
			<ul>
				<li key="0">a</li>
				<li key="1">b</li>
				<li key="2">c</li>
			</ul>
		),
		runs: (
			<ul>
				<li key="0">x</li>
				<li key="1">y</li>
				<li key="2">z</li>
			</ul>
		),
	},
	{
		id: "append",
		label: "Append new item",
		init: <List values={["a", "b", "c"]} />,
		runs: <List values={["a", "b", "c", "d"]} />,
	},
	{
		id: "remove-last",
		label: "Remove last item",
		init: <List values={["a", "b", "c", "d"]} />,
		runs: <List values={["a", "b", "c"]} />,
	},
	{
		id: "prepend",
		label: "Prepend new item",
		init: <List values={["b", "c"]} />,
		runs: <List values={["a", "b", "c"]} />,
	},
	{
		id: "remove-first",
		label: "Remove first item",
		init: <List values={["z", "a", "b", "c"]} />,
		runs: <List values={["a", "b", "c"]} />,
	},
	{
		id: "insert-middle",
		label: "Insert new item in middle",
		init: <List values={["a", "c"]} />,
		runs: <List values={["a", "b", "c"]} />,
	},
	{
		id: "remove-middle",
		label: "Remove items from middle",
		init: <List values={["a", "b", "x", "y", "z", "c", "d"]} />,
		runs: <List values={["a", "b", "c", "d"]} />,
	},
	{
		id: "move-one-to-begin",
		label: "Move one to beginning",
		init: <List values={["b", "c", "d", "a"]} />,
		runs: <List values={["a", "b", "c", "d"]} />,
	},
	{
		id: "move-mult-from-end-to-begin",
		label: "Move multiple to beginning",
		init: <List values={["c", "d", "e", "a", "b"]} />,
		runs: <List values={["a", "b", "c", "d", "e"]} />,
	},
	{
		id: "move-one-to-end",
		label: "Move one to end",
		init: <List values={["b", "c", "d", "a"]} />,
		runs: <List values={["a", "b", "c", "d"]} />,
	},
	{
		id: "move-mult-to-end",
		label: "Move multiple to end",
		init: <List values={["d", "e", "a", "b", "c"]} />,
		runs: <List values={["a", "b", "c", "d", "e"]} />,
	},
	{
		id: "simple-swap",
		label: "Simple swap",
		init: <List values={["b", "a"]} />,
		runs: <List values={["a", "b"]} />,
	},
	{
		id: "swap-middle",
		label: "Swap middle children",
		init: <List values={["a", "c", "b", "d"]} />,
		runs: <List values={["a", "b", "c", "d"]} />,
	},
	{
		id: "reverse",
		label: "Reverse items",
		init: <List values={["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]} />,
		runs: (
			<List
				values={["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"].reverse()}
			/>
		),
	},
];

let container = document.getElementById("initial-root");
const opSelect = /** @type {HTMLSelectElement} */ (
	document.getElementById("operations")
);
const runBtn = document.getElementById("run");
const resetBtn = document.getElementById("reset");
const recreateInput = /** @type {HTMLInputElement} */ (
	document.getElementById("recreate")
);

function setupSelect() {
	for (let operation of operations) {
		const option = document.createElement("option");
		option.value = operation.id;
		option.text = operation.label;
		opSelect.appendChild(option);
	}

	setupOperation();
}

function getSelectedOperation() {
	const selectedId = opSelect.selectedOptions.item(0).value;
	const op = operations.find((o) => o.id == selectedId);
	if (!op) {
		throw new Error(`Could not find operation with id ${selectedId}`);
	}

	return op;
}

function setupOperation() {
	if (recreateInput.checked) {
		// Create a new container to trigger mount on setup
		const newContainer = document.createElement("div");
		newContainer.className = "root";
		container.after(newContainer);
		container.remove();

		ReactDOM.render(getSelectedOperation().init, newContainer);
		container = newContainer;
	} else {
		ReactDOM.render(getSelectedOperation().init, container);
	}
}

setupSelect();

opSelect.addEventListener("change", () => {
	setupOperation();

	runBtn.hidden = false;
	resetBtn.hidden = true;
});

runBtn.addEventListener("click", () => {
	ReactDOM.render(getSelectedOperation().runs, container);

	runBtn.hidden = true;
	resetBtn.hidden = false;
});

resetBtn.addEventListener("click", () => {
	setupOperation();

	runBtn.hidden = false;
	resetBtn.hidden = true;
});
