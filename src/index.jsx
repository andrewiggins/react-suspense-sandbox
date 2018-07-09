import * as React from "react";
import * as ReactDOM from "react-dom";
import { SimpleCache, createResource } from "simple-cache-provider";
import { getText } from "./getText";
// import "./styles.css";

const readText = createResource(getText);

function SyncText({ value }) {
  return <span>{value || "null"}</span>;
}

function AsyncText({ cache, value }) {
  // Mysterious error when using this without an error boundary:
  // Unable to get property 'read' of undefined or null reference
  // On the console was this: Warning: read(): The first argument must be a cache. Instead received: null

  if (value != null) {
    value = readText.read(cache, value);
  }

  return <SyncText value={value} />;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }
  render() {
    return (
      <React.Fragment>
        <h1>Async Text Suspense Demo</h1>

        <div className="button-bar">
          <button onClick={() => this.setState({ value: 1 })}>Show 1</button>
          <button onClick={() => this.setState({ value: 2 })}>Show 2</button>
        </div>

        <div>
          <span>Expected: </span>
          <SyncText value={this.state.value} />
        </div>

        <div>
          <span>AsyncText: </span>
          <React.Placeholder delayMs={2500} fallback={<span>Loading...</span>}>
            <AsyncText cache={this.props.cache} value={this.state.value} />
          </React.Placeholder>
        </div>
      </React.Fragment>
    );
  }
}

const container = document.getElementById("root");
const root = ReactDOM.unstable_createRoot(container);
root.render(
  <SimpleCache.Consumer>{cache => <App cache={cache} />}</SimpleCache.Consumer>
);
