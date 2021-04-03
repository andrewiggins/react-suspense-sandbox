import React from "react";
import ReactDOM from "react-dom";
import { unstable_createResource as createResource } from "react-cache";
import { unstable_scheduleCallback } from "scheduler";
import { getText } from "./getText.js";

const readText = createResource(getText);

function Text({ value }) {
  return <span>{value}</span>;
}

function AsyncText({ value }) {
  value = readText.read(value);
  return <Text value={value} />;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      valueAsync: 0,
    };

    readText.preload(0);
  }

  addOne = () => {
    // High-priority update to `state.value`
    this.setState({ value: this.state.value + 1 });

    // Low priority update to `state.valueAsync`. Could be suspended.
    unstable_scheduleCallback(() =>
      this.setState({ valueAsync: this.state.valueAsync + 1 })
    );
  };

  substractOne = () => {
    // High-priority update to `state.value`
    this.setState({ value: this.state.value - 1 });

    // Low priority update to `state.valueAsync`. Could be suspended.
    unstable_scheduleCallback(() =>
      this.setState({ valueAsync: this.state.valueAsync - 1 })
    );
  };

  render() {
    const { value, valueAsync } = this.state;

    return (
      <React.Fragment>
        <h1>Async Text Suspense Demo</h1>

        <div className="button-bar">
          <button onClick={this.addOne}>+1</button>
          <button onClick={this.substractOne}>-1</button>
        </div>

        <div>
          <span>Expected: </span>
          <Text value={value} />
        </div>

        <div>
          <span>AsyncText: </span>
          <React.Suspense maxDuration={2500} fallback={<span>Loading...</span>}>
            <AsyncText value={valueAsync} />
          </React.Suspense>
        </div>
      </React.Fragment>
    );
  }
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
