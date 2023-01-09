import * as React from "react";

const { Fragment } = React;

/*
  This example demonstrates how React will not call render on components between
  a Context.Provider and Context.Consumer but still traverses down the tree
  performing work.

  Examining the logs of pressing Toggle show that "rendering MyChild" and
  "rendering Time" are never logged when the only update is a Provider change,
  but the ReactTracer still calls "performUnitOfWork" on fibers between the
  Provider and Consumer. Most of these intermediate fibers bailout since props
  haven't changed (1). Fibers that aren't between the Provider and Consumer
  return null in beginWork so their subtree is skipped (no child update is
  scheduled) (2) while Fibers between the Provider and Consumer do return their
  child since one of their children has an update scheduled (3).

  (1) https://github.com/facebook/react/blob/b4f119cdf1defe2437e00022f670c6ef818cd43f/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L3252
  (2) https://github.com/facebook/react/blob/b4f119cdf1defe2437e00022f670c6ef818cd43f/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L3140
  (3) https://github.com/facebook/react/blob/b4f119cdf1defe2437e00022f670c6ef818cd43f/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L3147
*/

/*
  # To investigate:

  ## How React propagates context value changes

  Relevant files and functions:
  - updateContextProvider
    Called when a Provider is rendered
    https://github.com/facebook/react/blob/46a0f050aacd8b2159b8db99b599a4b69e682189/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L3114

  - pushProvider
    Not sure what this does yet
    https://github.com/facebook/react/blob/46a0f050aacd8b2159b8db99b599a4b69e682189/packages/react-reconciler/src/ReactFiberNewContext.new.js#L87

  - propagateContextChange
    Actually marks dirty context consumers, though not when LazyContextPropagation is on
    https://github.com/facebook/react/blob/46a0f050aacd8b2159b8db99b599a4b69e682189/packages/react-reconciler/src/ReactFiberNewContext.new.js#L169

  Current experiment to change the behavior:
  PR: https://github.com/facebook/react/pull/20890
  RFC: https://github.com/reactjs/rfcs/pull/118

*/

const ctx = React.createContext(null);

class MyProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: 0 };
	}

	toggle() {
		this.setState(({ value }) => ({ value: (value + 1) % 2 }));
	}

	render() {
		console.log("rendering MyProvider");
		return (
			<Fragment>
				<div>
					<button onClick={() => this.toggle()}>Toggle</button>
				</div>
				<ctx.Provider value={this.state.value}>
					{this.props.children}
				</ctx.Provider>
			</Fragment>
		);
	}
}

const Time = () => {
	console.log("Rendering Time");
	return <div>{Date.now()}</div>;
};

const MyChild = () => {
	console.log("rendering MyChild");
	return (
		<Fragment>
			{Date.now()}
			<Time />
			<ctx.Consumer>
				{(value) => {
					return <p>{value}</p>;
				}}
			</ctx.Consumer>
			<Time />
		</Fragment>
	);
};

export function ContextExample() {
	console.log("rendering ContentExample");
	return (
		<Fragment>
			<h2>Context Example</h2>
			<MyProvider>
				<MyChild />
			</MyProvider>
		</Fragment>
	);
}
