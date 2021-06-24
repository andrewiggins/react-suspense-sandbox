import * as React from "react";
import { useState, useMemo } from "react";

function Value({ label, value }) {
  console.log("rerendering", label);
  return (
    <div>
      {label}: {value}
    </div>
  );
}

const HoistedValue = <Value label="Hoisted value" value="constant" />;

export function MemoedExample() {
  const [_, rerender] = useState(0);
  const [count, setCount] = useState(0);

  const MemoedValue = useMemo(
    () => <Value label="Memoed" value={count} />,
    [count]
  );

  const memoedProps = useMemo(
    () => ({
      label: "MemoedProps",
      value: count,
    }),
    [count]
  );

  return (
    <div>
      <Value label="Normal" value={count} />
      {MemoedValue}
      {/* Note: This doesn't work because createElement copies the props onto a new object each time it is called */}
      <Value {...memoedProps} />
      {HoistedValue}
      <div>
        <button onClick={() => setCount((c) => c + 1)}>Increment count</button>
        <button onClick={() => rerender((v) => v + 1)}>Rerender</button>
      </div>
    </div>
  );
}
