/**
 * Serialize an object
 * @param {Object} obj
 * @return {string}
 */
function serialize(obj) {
	if (obj instanceof Text) return "#text";
	if (obj instanceof Element) return `<${obj.localName}>${obj.textContent}`;
	if (obj === document) return "document";
	if (typeof obj == "string") return obj;
	return Object.prototype.toString.call(obj).replace(/(^\[object |\]$)/g, "");
}

let capture = false;

/** @type {string[]} */
let log = [];

/**
 * Modify obj's original method to log calls and arguments on logger object
 * @template T
 * @param {T} obj
 * @param {keyof T} method
 */
export function logCall(obj, method) {
	let old = obj[method];
	if (typeof old !== "function") {
		throw new Error("Cannot call logCall on property that is not a method");
	}

	// @ts-expect-error
	obj[method] = function (...args) {
		if (capture) {
			let c = "";
			for (let i = 0; i < args.length; i++) {
				if (c) c += ", ";
				c += serialize(args[i]);
			}

			// Normalize removeChild -> remove to keep output clean and readable
			const operation =
				method != "removeChild"
					? `${serialize(this)}.${String(method)}(${c})`
					: `${serialize(c)}.remove()`;
			log.push(operation);
		}

		// @ts-expect-error
		return old.apply(this, args);
	};

	return () => (obj[method] = old);
}

export function startCapture() {
	capture = true;
}

export function stopCapture() {
	capture = false;
}

/**
 * Return log object
 * @return {string[]} log
 */
export function getLog() {
	return log;
}

/** Clear log object */
export function clearLog() {
	log = [];
}

export function getLogSummary() {
	/** @type {{ [key: string]: number }} */
	const summary = {};

	for (let entry of log) {
		summary[entry] = (summary[entry] || 0) + 1;
	}

	return summary;
}
