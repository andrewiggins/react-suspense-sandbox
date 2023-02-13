import * as React from "react";
import * as ReactDOM from "react-dom";
import {
	clearLog,
	getLog,
	logCall,
	startCapture,
	stopCapture,
} from "./logCall";

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
 * @property {string[]} idealDom
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
		idealDom: [],
	},
	{
		id: "append",
		label: "Append new item",
		init: <List values={["a", "b", "c"]} />,
		runs: <List values={["a", "b", "c", "d"]} />,
		idealDom: ["<ol>ab.insertBefore(<li>c, Null)"],
	},
	{
		id: "remove-last",
		label: "Remove last item",
		init: <List values={["a", "b", "c", "d"]} />,
		runs: <List values={["a", "b", "c"]} />,
		idealDom: ["<li>d.remove()"],
	},
	{
		id: "prepend",
		label: "Prepend new item",
		init: <List values={["b", "c"]} />,
		runs: <List values={["a", "b", "c"]} />,
		idealDom: ["<ol>bc.insertBefore(<li>a, <li>b)"],
	},
	{
		id: "remove-first",
		label: "Remove first item",
		init: <List values={["z", "a", "b", "c"]} />,
		runs: <List values={["a", "b", "c"]} />,
		idealDom: ["<li>z.remove()"],
	},
	{
		id: "insert-middle",
		label: "Insert new item in middle",
		init: <List values={["a", "c"]} />,
		runs: <List values={["a", "b", "c"]} />,
		idealDom: ["<ol>ac.insertBefore(<li>b, <li>c)"],
	},
	{
		id: "remove-middle",
		label: "Remove items from middle",
		init: <List values={["a", "b", "x", "y", "z", "c", "d"]} />,
		runs: <List values={["a", "b", "c", "d"]} />,
		idealDom: ["<li>z.remove()", "<li>y.remove()", "<li>x.remove()"],
	},
	{
		// React worst case
		id: "move-one-to-begin",
		label: "Move one to beginning",
		init: <List values={["b", "c", "d", "a"]} />,
		runs: <List values={["a", "b", "c", "d"]} />,
		idealDom: ["<ol>bcda.insertBefore(<li>a, <li>b)"],
	},
	{
		// React & Preact v10 worst case
		id: "move-one-to-begin-longer",
		label: "Move one to beginning (longer list)",
		init: <List values={["a", "b", "c", "d", "e", "f"]} />,
		runs: <List values={["a", "e", "b", "c", "d", "f"]} />,
		idealDom: ["<ol>abcdef.insertBefore(<li>e, <li>b)"],
	},
	{
		id: "move-mult-from-end-to-begin",
		label: "Move multiple to beginning",
		init: <List values={["c", "d", "e", "a", "b"]} />,
		runs: <List values={["a", "b", "c", "d", "e"]} />,
		idealDom: [
			"<ol>cdeab.insertBefore(<li>a, <li>c)",
			"<ol>acdeb.insertBefore(<li>b, <li>c)",
		],
	},
	{
		id: "move-one-to-end",
		label: "Move one to end",
		init: <List values={["d", "a", "b", "c"]} />,
		runs: <List values={["a", "b", "c", "d"]} />,
		idealDom: ["<ol>dabc.insertBefore(<li>d, Null)"],
	},
	{
		id: "move-one-to-end-longer",
		label: "Move one to end (longer list)",
		init: <List values={["a", "b", "c", "d", "e", "f"]} />,
		runs: <List values={["a", "c", "d", "e", "b", "f"]} />,
		idealDom: ["<ol>abcdef.insertBefore(<li>b, <li>f)"],
	},
	{
		id: "move-mult-to-end",
		label: "Move multiple to end",
		init: <List values={["d", "e", "a", "b", "c"]} />,
		runs: <List values={["a", "b", "c", "d", "e"]} />,
		idealDom: [
			"<ol>deabc.insertBefore(<li>d, Null)",
			"<ol>eabcd.insertBefore(<li>e, Null)",
		],
	},
	{
		id: "simple-swap",
		label: "Simple swap",
		init: <List values={["b", "a"]} />,
		runs: <List values={["a", "b"]} />,
		idealDom: ["<ol>ba.insertBefore(<li>b, Null)"],
	},
	{
		id: "swap-middle",
		label: "Swap middle children",
		init: <List values={["a", "c", "b", "d"]} />,
		runs: <List values={["a", "b", "c", "d"]} />,
		idealDom: ["<ol>acbd.insertBefore(<li>c, <li>d)"],
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
		idealDom: [
			"<ol>abcdefghij.insertBefore(<li>j, <li>a)",
			"<ol>jabcdefghi.insertBefore(<li>i, <li>a)",
			"<ol>jiabcdefgh.insertBefore(<li>h, <li>a)",
			"<ol>jihabcdefg.insertBefore(<li>g, <li>a)",
			"<ol>jihgabcdef.insertBefore(<li>f, <li>a)",
			"<ol>jihgfabcde.insertBefore(<li>e, <li>a)",
			"<ol>jihgfeabcd.insertBefore(<li>d, <li>a)",
			"<ol>jihgfedabc.insertBefore(<li>c, <li>a)",
			"<ol>jihgfedcab.insertBefore(<li>a, Null)",
		],
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
const mutationList = document.getElementById("mutations");
const idealMutationList = document.getElementById("ideal-mutations");

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
	const selectedOp = getSelectedOperation();

	idealMutationList.textContent = "";
	for (let domOp of selectedOp.idealDom) {
		const li = document.createElement("li");
		li.textContent = domOp;
		idealMutationList.appendChild(li);
	}

	if (recreateInput.checked) {
		container = createContainer();
		ReactDOM.render(selectedOp.init, container);
	} else {
		ReactDOM.render(selectedOp.init, container);
	}
}

function createContainer() {
	// Create a new container to trigger mount on setup
	const newContainer = document.createElement("div");
	newContainer.className = "root";
	container.after(newContainer);
	container.remove();

	clearLog();
	mutationList.textContent = "";

	return newContainer;
}

logCall(Element.prototype, "appendChild");
logCall(Element.prototype, "insertBefore");
logCall(Element.prototype, "removeChild");
logCall(Element.prototype, "remove");

setupSelect();

opSelect.addEventListener("change", () => {
	setupOperation();

	runBtn.hidden = false;
	resetBtn.hidden = true;
});

runBtn.addEventListener("click", () => {
	startCapture();
	ReactDOM.render(getSelectedOperation().runs, container);
	stopCapture();

	mutationList.textContent = "";
	for (let log of getLog()) {
		const li = document.createElement("li");
		li.textContent = log;
		mutationList.appendChild(li);
	}

	clearLog();

	runBtn.hidden = true;
	resetBtn.hidden = false;
});

resetBtn.addEventListener("click", () => {
	setupOperation();

	runBtn.hidden = false;
	resetBtn.hidden = true;
});
