import * as React from "react";
import * as ReactDOM from "react-dom";
import { List } from "./List.jsx";
import { List as ListClass } from "./List_class.jsx";
import { ContextExample } from "./ContextExample.jsx";
import { MemoedExample } from "./MemoedExample.jsx";
import { Counter } from "./Counter.jsx";

const examples = {
	List: List,
	"List (class)": ListClass,
	Counter: Counter,
	Context: ContextExample,
	Memo: MemoedExample,
};

function App() {
	const [selectedExampleId, setSelectedExampleId] = React.useState("List");
	const [renderedExampleId, setRenderedExampleId] = React.useState("List");

	const Example = renderedExampleId && examples[renderedExampleId];

	return (
		<React.Fragment>
			<div>
				<label htmlFor="example-chooser">Choose an example:</label>
				<select
					id="example-chooser"
					value={selectedExampleId}
					onChange={(e) => setSelectedExampleId(e.target.value)}
				>
					{Object.keys(examples).map((id) => (
						<option value={id} key={id}>
							{id}
						</option>
					))}
				</select>
				<div>
					{renderedExampleId != null && (
						<button onClick={() => setRenderedExampleId(null)}>
							Unmount current
						</button>
					)}
					{renderedExampleId == null && (
						<button onClick={() => setRenderedExampleId(selectedExampleId)}>
							Mount selected
						</button>
					)}
					{selectedExampleId !== renderedExampleId &&
						renderedExampleId != null && (
							<button onClick={() => setRenderedExampleId(selectedExampleId)}>
								Switch
							</button>
						)}
				</div>
			</div>
			<div>{Example && <Example />}</div>
		</React.Fragment>
	);
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
