import {
  R as ReactSharedInternals$1,
  m as memo,
  c as createElement$1,
  u as useState,
  a as useEffect,
  b as useLayoutEffect,
  d as useCallback,
  e as REACT_FRAGMENT_TYPE,
  C as Component,
  f as createContext,
  g as React,
  h as useMemo,
  i as createRoot,
} from "./chunks/react-dom.b4f119cdf.development.6444d606.js";
/**
 * @license React
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function unstable_scheduleCallback() {
  return ReactSharedInternals$1.Scheduler.unstable_scheduleCallback.apply(
    this,
    arguments
  );
}

const unstable_IdlePriority =
  ReactSharedInternals$1.Scheduler.unstable_IdlePriority;

ReactSharedInternals$1.Scheduler.unstable_ImmediatePriority;

ReactSharedInternals$1.Scheduler.unstable_LowPriority;

ReactSharedInternals$1.Scheduler.unstable_NormalPriority;

ReactSharedInternals$1.Scheduler.unstable_UserBlockingPriority;

ReactSharedInternals$1.Scheduler.unstable_Profiling;
function spin(name = "", ms = 0.1) {
  start(name);

  let begin = performance.now();
  let elapsed = 0;
  while (elapsed < ms) {
    elapsed = performance.now() - begin;
  }

  stop(name);
}

const getStartName = (name) => `${name}-Start`;
const getStopName = (name) => `${name}-Stop`;

function start(name) {
  if (name) {
    performance.mark(getStartName(name));
  }
}

function stop(name) {
  if (name) {
    performance.mark(getStopName(name));
    performance.measure(name, getStartName(name), getStopName(name));
  }
}
const classes$1 = ["", "red", "blue"];
const getCurrentClass$1 = (index) => classes$1[index];
const getNextIndex$1 = (currentIndex) => (currentIndex + 1) % classes$1.length;

/** @type {React.FC<{ num: number, className: string }>} */
const MemoedListItem = memo(function ListItem({ num, className }) {
  return createElement$1("div", { className: className }, num);
});
MemoedListItem.displayName = "MemoedListItem";

function List$1() {
  spin("List.render");

  const [classIndex, setClassIndex] = useState(0);
  const [values, setValues] = useState([1, 2, 3]);

  useEffect(() => {
    spin("List.useEffect mount");
    return () => {
      spin("List.useEffect unmount");
    };
  }, []);

  useEffect(() => {
    spin("List.useEffect render");
    return () => {
      spin("List.useEffect render cleanup");
    };
  });

  useLayoutEffect(() => {
    spin("List.useLayoutEffect mount");
    return () => {
      spin("List.useLayoutEffect unmount");
    };
  }, []);

  useLayoutEffect(() => {
    spin("List.useLayoutEffect render");
    return () => {
      spin("List.useLayoutEffect render cleanup");
    };
  });

  const square = useCallback(() => {
    // facebook/react#13488 seems to imply deferredUpdates is no longer necessary
    // Also see note in changelog: facebook/react#13571
    unstable_scheduleCallback(unstable_IdlePriority, () => {
      setValues((values) => values.map((value) => value * value));
    });
  }, []);

  const addChild = useCallback(() => {
    unstable_scheduleCallback(unstable_IdlePriority, () => {
      setValues((values) => [...values, values.length + 1]);
    });
  }, []);

  const removeChild = useCallback(() => {
    unstable_scheduleCallback(unstable_IdlePriority, () => {
      setValues((values) => values.slice(0, -1));
    });
  }, []);

  // This callback changes whenever classIndex changes to demonstrate how event
  // listeners update
  const nextClass = useCallback(() => {
    setClassIndex(getNextIndex$1(classIndex));
  }, [classIndex]);

  const nextClassAndSquare = useCallback(() => {
    unstable_scheduleCallback(unstable_IdlePriority, () => {
      setValues((values) => values.map((value) => value * value));
      setClassIndex((classIndex) => getNextIndex$1(classIndex));
    });
  }, []);

  const itemClass = getCurrentClass$1(classIndex);

  return createElement$1(
    REACT_FRAGMENT_TYPE,
    null,
    createElement$1("h2", null, "Fiber List operations"),
    createElement$1("button", { className: "action", onClick: square }, "^2"),
    createElement$1(
      "button",
      { className: "action", onClick: addChild },
      "Add child"
    ),
    createElement$1(
      "button",
      { className: "action", onClick: removeChild },
      "Remove child"
    ),
    createElement$1(
      "button",
      { className: "action", onClick: nextClass },
      "Next class (sync)"
    ),
    createElement$1(
      "button",
      { className: "action", onClick: nextClassAndSquare },
      "Next class and square"
    ),
    values.map((value, index) =>
      createElement$1(MemoedListItem, {
        className: itemClass,
        key: index,
        num: value,
      })
    )
  );
}
const classes = ["", "red", "blue"];
const getCurrentClass = (index) => classes[index];
const getNextIndex = (currentIndex) => (currentIndex + 1) % classes.length;

class Item extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.num !== this.props.num ||
      nextProps.className !== this.props.className
    );
  }

  render() {
    const { num, className } = this.props;
    return createElement$1("div", { className: className }, num);
  }
}

class List extends Component {
  constructor(props) {
    super(props);

    spin("List.constructor");

    this.state = {
      classIndex: 0,
      values: [1, 2, 3],
    };
  }

  square = () => {
    // facebook/react#13488 seems to imply deferredUpdates is no longer necessary
    // Also see note in changelog: facebook/react#13571
    unstable_scheduleCallback(unstable_IdlePriority, () =>
      this.setState((prevState) => ({
        values: prevState.values.map((value) => value * value),
      }))
    );
  };

  addChild = () => {
    unstable_scheduleCallback(unstable_IdlePriority, () =>
      this.setState((prevState) => ({
        values: [...prevState.values, prevState.values.length + 1],
      }))
    );
  };

  removeChild = () => {
    unstable_scheduleCallback(unstable_IdlePriority, () =>
      this.setState((prevState) => ({
        values: prevState.values.slice(0, -1),
      }))
    );
  };

  nextClass = () => {
    this.setState({
      classIndex: getNextIndex(this.state.classIndex),
    });
  };

  nextClassAndSquare = () => {
    unstable_scheduleCallback(unstable_IdlePriority, () =>
      this.setState((prevState) => ({
        classIndex: getNextIndex(this.state.classIndex),
        values: prevState.values.map((value) => value * value),
      }))
    );
  };

  static getDerivedStateFromProps(props, state) {
    spin("List.getDerivedStateFromProps");
    return {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    spin("List.render");

    const itemClass = getCurrentClass(this.state.classIndex);

    return createElement$1(
      REACT_FRAGMENT_TYPE,
      null,
      createElement$1("h2", null, "Fiber List operations"),
      createElement$1(
        "button",
        { className: "action", onClick: this.square },
        "^2"
      ),
      createElement$1(
        "button",
        { className: "action", onClick: this.addChild },
        "Add child"
      ),
      createElement$1(
        "button",
        { className: "action", onClick: this.removeChild },
        "Remove child"
      ),
      createElement$1(
        "button",
        { className: "action", onClick: this.nextClass },
        "Next class (sync)"
      ),
      createElement$1(
        "button",
        { className: "action", onClick: this.nextClassAndSquare },
        "Next class and square"
      ),
      this.state.values.map((value, index) =>
        createElement$1(Item, { className: itemClass, key: index, num: value })
      )
    );
  }

  componentDidMount() {
    spin("List.componentDidMount");
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    spin("List.getSnapshotBeforeUpdate");
    return {};
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    spin("List.componentDidUpdate");
  }
}
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

const ctx = createContext(null);

class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }

  toggle() {
    this.setState(({ value }) => ({ value: (value + 1) % 2 }));
  }

  render() {
    console.log("rendering MyProvider");
    return createElement$1(
      Fragment,
      null,
      createElement$1(
        "div",
        null,
        createElement$1("button", { onClick: () => this.toggle() }, "Toggle")
      ),
      createElement$1(
        ctx.Provider,
        { value: this.state.value },
        this.props.children
      )
    );
  }
}

const Time = () => {
  console.log("Rendering Time");
  return createElement$1("div", null, Date.now());
};

const MyChild = () => {
  console.log("rendering MyChild");
  return createElement$1(
    Fragment,
    null,
    Date.now(),
    createElement$1(Time, null),
    createElement$1(ctx.Consumer, null, (value) => {
      return createElement$1("p", null, value);
    }),
    createElement$1(Time, null)
  );
};

function ContextExample() {
  console.log("rendering ContentExample");
  return createElement$1(
    Fragment,
    null,
    createElement$1("h2", null, "Context Example"),
    createElement$1(MyProvider, null, createElement$1(MyChild, null))
  );
} /* ==========================

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
  return createElement$1("div", null, label, ": ", value);
}

const HoistedValue = createElement$1(Value, {
  label: "Hoisted value",
  value: "constant",
});

function MemoedExample() {
  const [_, rerender] = useState(0);
  const [count, setCount] = useState(0);

  const MemoedValue = useMemo(
    () => createElement$1(Value, { label: "Memoed", value: count }),
    [count]
  );

  const memoedProps = useMemo(
    () => ({
      label: "MemoedProps",
      value: count,
    }),
    [count]
  );

  return createElement$1(
    "div",
    null,
    createElement$1("h2", null, "Memo'ed component example"),
    createElement$1(Value, { label: "Normal", value: count }),
    MemoedValue,
    /* Note: This doesn't work because createElement copies the props onto a new object each time it is called */
    createElement$1(Value, { ...memoedProps }),
    HoistedValue,
    createElement$1(
      "div",
      null,
      createElement$1(
        "button",
        { onClick: () => setCount((c) => c + 1) },
        "Increment count"
      ),
      createElement$1(
        "button",
        { onClick: () => rerender((v) => v + 1) },
        "Rerender"
      )
    )
  );
}
const examples = {
  List: List$1,
  "List (class)": List,
  Context: ContextExample,
  Memo: MemoedExample,
};

function App() {
  const [selectedExampleId, setSelectedExampleId] = useState("List");
  const [renderedExampleId, setRenderedExampleId] = useState("List");

  const Example = renderedExampleId && examples[renderedExampleId];

  return createElement$1(
    REACT_FRAGMENT_TYPE,
    null,
    createElement$1(
      "div",
      null,
      createElement$1(
        "label",
        { htmlFor: "example-chooser" },
        "Choose an example:"
      ),
      createElement$1(
        "select",
        {
          id: "example-chooser",
          value: selectedExampleId,
          onChange: (e) => setSelectedExampleId(e.target.value),
        },

        Object.keys(examples).map((id) =>
          createElement$1("option", { value: id, key: id }, id)
        )
      ),
      createElement$1(
        "div",
        null,
        renderedExampleId != null &&
          createElement$1(
            "button",
            { onClick: () => setRenderedExampleId(null) },
            "Unmount current"
          ),
        renderedExampleId == null &&
          createElement$1(
            "button",
            { onClick: () => setRenderedExampleId(selectedExampleId) },
            "Mount selected"
          ),
        selectedExampleId !== renderedExampleId &&
          renderedExampleId != null &&
          createElement$1(
            "button",
            { onClick: () => setRenderedExampleId(selectedExampleId) },
            "Switch"
          )
      )
    ),
    createElement$1("div", null, Example && createElement$1(Example, null))
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(createElement$1(App, null));
