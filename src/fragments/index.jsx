import * as React from "react";
import { Component, Fragment } from "react"
import * as ReactDOM from "react-dom";

const ops = [];

class Stateful extends Component {
  componentDidUpdate() {
    ops.push("Update Stateful");
  }
  render() {
    return <div>Hello</div>;
  }
}

function Foo({ condition }) {
  return condition ? (
    <Stateful key="a" />
  ) : (
    <Fragment>
      <Stateful key="a" />
      <div key="b">World</div>
    </Fragment>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.unstable_createRoot(container);

root.render(<Foo condition={true} />);
root.render(<Foo condition={false} />);

console.log(ops);

root.render(<Foo condition={true} />);

console.log(ops);
