export function spin(name = "", ms = 0.1) {
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
