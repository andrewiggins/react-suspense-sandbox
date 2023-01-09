import * as React from "react";
import { useState, useMemo } from "react";

/* ==========================

  Demo to show how Hoisting JSX elements and wrapping JSX in useMemo is effective
  in preventing renders, similarly to using React.memo.

  The Value component will log to the console every time it renders. Notice how
  while all instances of Value rerender on "increment count" click, only the
  Normal and MemoedProps Value rerender when the "rerender" button is clicked.

  React recognizes that the JSX element and its props haven't changed and so it
  doesn't rerender the Hoisted or Memoed component.

  Likely this line in `beginWork` (and subsequent if statements) combine to enable
  this bailout:
  https://github.com/facebook/react/blob/e4e8226c625220944819c9237346569f09ad90a9/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L3623

  It appears React checks for props to have changed (and types in Dev mode),
  context, or a "scheduled update"? to trigger a render

  `attemptEarlyBailoutIfNoScheduledUpdate` does some bookkeeping and
  `bailoutOnAlreadyFinishedWork` verifies children don't have any scheduled work
  on a lane before returning `null` and skipping the entire subtree.

 ========================== */

function Value({ label, value }) {
	console.log("rerendering", label);
	return (
		<div>
			{label}: {value}
		</div>
	);
}

const HoistedValue = <Value label="Hoisted value" value="constant" />;

export function MemoedExample() {
	const [_, rerender] = useState(0);
	const [count, setCount] = useState(0);

	const MemoedValue = useMemo(
		() => <Value label="Memoed" value={count} />,
		[count]
	);

	const memoedProps = useMemo(
		() => ({
			label: "MemoedProps",
			value: count,
		}),
		[count]
	);

	return (
		<div>
			<h2>Memo'ed component example</h2>
			<Value label="Normal" value={count} />
			{MemoedValue}
			{/* Note: This doesn't work because createElement copies the props onto a new object each time it is called */}
			<Value {...memoedProps} />
			{HoistedValue}
			<div>
				<button onClick={() => setCount((c) => c + 1)}>Increment count</button>
				<button onClick={() => rerender((v) => v + 1)}>Rerender</button>
			</div>
		</div>
	);
}
