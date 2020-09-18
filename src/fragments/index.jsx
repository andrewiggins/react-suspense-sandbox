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

async function main() {
  const container = document.getElementById("root");
  const root = ReactDOM.createRoot(container);

  await root.render(<Foo condition={true} />);
  await root.render(<Foo condition={false} />);

  // expect(ops).to.deep.equal(['Update Stateful']);
  console.log(ops);

  await root.render(<Foo condition={true} />);

  // expect(ops).to.deep.equal(['Update Stateful', 'Update Stateful']);
  console.log(ops);
}

main();
