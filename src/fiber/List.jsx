import * as React from "react";
import * as scheduler from "scheduler";
import { spin } from "../common/spin.js";

const classes = ["", "red", "blue"];
const getCurrentClass = (index) => classes[index];
const getNextIndex = (currentIndex) => (currentIndex + 1) % classes.length;

/** @type {React.FC<{ num: number, className: string }>} */
const MemoedListItem = React.memo(function ListItem({ num, className }) {
  return <div className={className}>{num}</div>;
});
MemoedListItem.displayName = "MemoedListItem";

export function List() {
  spin("List.render");

  const [classIndex, setClassIndex] = React.useState(0);
  const [values, setValues] = React.useState([1, 2, 3]);

  React.useEffect(() => {
    spin("List.useEffect mount");
    return () => {
      spin("List.useEffect unmount");
    };
  }, []);

  React.useEffect(() => {
    spin("List.useEffect render");
    return () => {
      spin("List.useEffect render cleanup");
    };
  });

  React.useLayoutEffect(() => {
    spin("List.useLayoutEffect mount");
    return () => {
      spin("List.useLayoutEffect unmount");
    };
  }, []);

  React.useLayoutEffect(() => {
    spin("List.useLayoutEffect render");
    return () => {
      spin("List.useLayoutEffect render cleanup");
    };
  });

  const square = React.useCallback(() => {
    // facebook/react#13488 seems to imply deferredUpdates is no longer necessary
    // Also see note in changelog: facebook/react#13571
    scheduler.unstable_scheduleCallback(scheduler.unstable_IdlePriority, () => {
      setValues((values) => values.map((value) => value * value));
    });
  }, []);

  const addChild = React.useCallback(() => {
    scheduler.unstable_scheduleCallback(scheduler.unstable_IdlePriority, () => {
      setValues((values) => [...values, values.length + 1]);
    });
  }, []);

  const removeChild = React.useCallback(() => {
    scheduler.unstable_scheduleCallback(scheduler.unstable_IdlePriority, () => {
      setValues((values) => values.slice(0, -1));
    });
  }, []);

  // This callback changes whenever classIndex changes to demonstrate how event
  // listeners update
  const nextClass = React.useCallback(() => {
    setClassIndex(getNextIndex(classIndex));
  }, [classIndex]);

  const nextClassAndSquare = React.useCallback(() => {
    scheduler.unstable_scheduleCallback(scheduler.unstable_IdlePriority, () => {
      setValues((values) => values.map((value) => value * value));
      setClassIndex((classIndex) => getNextIndex(classIndex));
    });
  }, []);

  const itemClass = getCurrentClass(classIndex);

  return (
    <React.Fragment>
      <h2>Fiber List operations</h2>
      <button className="action" onClick={square}>
        ^2
      </button>
      <button className="action" onClick={addChild}>
        Add child
      </button>
      <button className="action" onClick={removeChild}>
        Remove child
      </button>
      <button className="action" onClick={nextClass}>
        Next class (sync)
      </button>
      <button className="action" onClick={nextClassAndSquare}>
        Next class and square
      </button>
      {values.map((value, index) => (
        <MemoedListItem className={itemClass} key={index} num={value} />
      ))}
    </React.Fragment>
  );
}
