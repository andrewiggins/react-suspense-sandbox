import * as React from "react";
import * as ReactDOM from "react-dom";

const { Component, createContext, useState, useContext } = React;

const RouterContext = createContext({ location: "__default_value__" });

const route1 = "/page/1";
const route2 = "/page/2";

/** @type {() => void} */
let toggleLocalState;
/** @type {() => void} */
let toggleLocation;

function runUpdate() {
	toggleLocalState();
	toggleLocation();
}

/**
 * @extends {React.Component<{children: any}, {location: string}>}
 */
class Router extends Component {
	constructor(props) {
		super(props);
		this.state = { location: route1 };
		toggleLocation = () => {
			const newLocation = this.state.location === route1 ? route2 : route1;
			console.log("Toggle location", this.state.location, "->", newLocation);
			this.setState({ location: newLocation });
		};
	}

	render() {
		console.log("Router rendering", { location: this.state.location });
		return (
			<RouterContext.Provider value={{ location: this.state.location }}>
				{this.props.children}
			</RouterContext.Provider>
		);
	}
}

/**
 * @extends {React.Component<{children: any}>}
 */
class Route extends Component {
	render() {
		return (
			<RouterContext.Consumer>
				{(contextValue) => {
					console.log("Route rendering", { location: contextValue.location });
					// Pretend to do something with the context value
					const newContextValue = { ...contextValue };
					return (
						<RouterContext.Provider value={newContextValue}>
							{this.props.children}
						</RouterContext.Provider>
					);
				}}
			</RouterContext.Consumer>
		);
	}
}

function Page() {
	const [localState, setLocalState] = useState(true);
	const { location } = useContext(RouterContext);

	console.log("Page rendering", { location, localState });

	toggleLocalState = () => {
		let newValue = !localState;
		console.log("Toggle localState", localState, "->", newValue);
		setLocalState(newValue);
	};

	return (
		<>
			<div>localState: {localState.toString()}</div>
			<div>location: {location}</div>
			<div>
				<button type="button" onClick={runUpdate}>
					Trigger react update
				</button>
			</div>
		</>
	);
}

function App() {
	return (
		<Router>
			<Route>
				<Page />
			</Route>
		</Router>
	);
}

ReactDOM.render(<App />, document.getElementById("root"));

document.getElementById("update")?.addEventListener("click", runUpdate);
