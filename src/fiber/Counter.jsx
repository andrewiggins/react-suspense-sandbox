import * as React from "react";

export function Counter() {
	const [count, setCount] = React.useState(0);

	return (
		<button
			className="btn badge"
			data-badge={count}
			style={{ marginTop: ".5rem" }}
			onClick={() => setCount(count + 1)}
		>
			count: {count}
		</button>
	);
}

let style = document.createElement("style");
style.textContent = `
.badge {
  position: relative;
  white-space: nowrap;
  box-sizing: border-box;
}

.badge.btn {
  padding: 0.25rem 0.4rem;
}

.badge:not([data-badge]):after, .badge[data-badge]:after {
  background: #5755d9;
  background-clip: padding-box;
  border-radius: .5rem;
  box-shadow: 0 0 0 0.1rem #fff;
  color: #fff;
  content: attr(data-badge);
  display: inline-block;
  transform: translate(-.05rem,-.5rem);
}

.badge[data-badge]:after {
  font-size: .7rem;
  height: .9rem;
  line-height: 1;
  min-width: .9rem;
  padding: .1rem .2rem;
  text-align: center;
  white-space: nowrap;
  box-sizing: border-box;
}

.badge.btn:after {
  top: 0;
  right: 0;
}

.badge.btn:after {
  position: absolute;
  transform: translate(50%,-50%);
}
`;
document.head.appendChild(style);
