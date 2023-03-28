// File to provide createRoot and hydrateRoot adapters for React 16 and 17

export * from 'react-dom';

import * as ReactDOM from 'react-dom';
/** @type {typeof import('react-dom/client').createRoot} */
// @ts-expect-error - createRoot is not in the 'react-dom' types
let createRoot = ReactDOM.createRoot;
if (!createRoot) {
	createRoot = function (container) {
		return {
			render(element) {
				ReactDOM.render(element, container);
			},
			unmount() {
				ReactDOM.unmountComponentAtNode(container);
			},
		};
	};
}

/** @type {typeof import('react-dom/client').hydrateRoot} */
// @ts-expect-error - hydrateRoot is not in the 'react-dom' types
let hydrateRoot = ReactDOM.hydrateRoot;
if (!hydrateRoot) {
	hydrateRoot = function (container) {
		return {
			render(element) {
				ReactDOM.hydrate(element, container);
			},
			unmount() {
				ReactDOM.unmountComponentAtNode(container);
			},
		};
	};
}

export { createRoot, hydrateRoot };
