import {
  i as createRoot,
  d as createElement$1,
  e as REACT_FRAGMENT_TYPE,
  C as Component,
} from "./chunks/react-dom.d1f51f345.profiling.min.e0b48e11.js";
const ops = [];

class Stateful extends Component {
  componentDidUpdate() {
    ops.push("Update Stateful");
  }
  render() {
    return createElement$1("div", null, "Hello");
  }
}

function Foo({ condition }) {
  return condition
    ? createElement$1(Stateful, { key: "a" })
    : createElement$1(
        REACT_FRAGMENT_TYPE,
        null,
        createElement$1(Stateful, { key: "a" }),
        createElement$1("div", { key: "b" }, "World")
      );
}

async function main() {
  const container = document.getElementById("root");
  const root = createRoot(container);

  await root.render(createElement$1(Foo, { condition: true }));
  await root.render(createElement$1(Foo, { condition: false }));

  // expect(ops).to.deep.equal(['Update Stateful']);
  console.log(ops);

  await root.render(createElement$1(Foo, { condition: true }));

  // expect(ops).to.deep.equal(['Update Stateful', 'Update Stateful']);
  console.log(ops);
}

main();
