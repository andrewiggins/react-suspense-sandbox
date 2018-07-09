import * as React from "react";
import * as ReactDOM from "react-dom";
import { SimpleCache, createResource } from "simple-cache-provider";
import { getText } from "./getText";
// import "./styles.css";

const readText = createResource(getText);

function SyncText({ value }) {
  return <span>{value}</span>;
}

function AsyncText({ cache, value }) {
  value = readText.read(cache, value);

  return <SyncText value={value} />;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      valueAsync: 0
    };

    readText.preload(props.cache, 0);
  }

  addOne = () => {
    this.addOneSync();
    this.addOneAsync();
  };

  substractOne = () => {
    this.substractOneSync();
    this.substractOneAsync();
  }

  addOneSync = () => this.setState({ value: this.state.value + 1 });
  substractOneSync = () => this.setState({ value: this.state.value - 1 });

  addOneAsync = () =>
    ReactDOM.unstable_deferredUpdates(() =>
      this.setState({ valueAsync: this.state.valueAsync + 1 })
    );
  substractOneAsync = () =>
    ReactDOM.unstable_deferredUpdates(() =>
      this.setState({ valueAsync: this.state.valueAsync - 1 })
    );

  render() {
    const { value, valueAsync } = this.state;
    const { cache } = this.props;

    return (
      <React.Fragment>
        <h1>Async Text Suspense Demo</h1>

        <div className="button-bar">
          <button onClick={this.addOne}>+1</button>
          <button onClick={this.substractOne}>-1</button>
        </div>

        <div>
          <span>Expected: </span>
          <SyncText value={value} />
        </div>

        <div>
          <span>AsyncText: </span>
          <React.Placeholder delayMs={2500} fallback={<span>Loading...</span>}>
            <AsyncText cache={cache} value={valueAsync} />
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
