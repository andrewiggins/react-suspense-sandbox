/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"fiber": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/fiber/index.jsx","react-dom","react"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/scheduler.5faf377df.development.js":
/*!************************************************!*\
  !*** ./lib/scheduler.5faf377df.development.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license React
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable max-len */



(function(global, factory) {
  // eslint-disable-next-line no-unused-expressions
   true
    ? (module.exports = factory(__webpack_require__(/*! react */ "./lib/react.5faf377df.development.js")))
    : undefined;
})(this, function(React) {
  function unstable_now() {
    return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_now.apply(
      this,
      arguments
    );
  }

  function unstable_scheduleCallback() {
    return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_scheduleCallback.apply(
      this,
      arguments
    );
  }

  function unstable_cancelCallback() {
    return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_cancelCallback.apply(
      this,
      arguments
    );
  }

  function unstable_shouldYield() {
    return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_shouldYield.apply(
      this,
      arguments
    );
  }

  function unstable_requestPaint() {
    return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_requestPaint.apply(
      this,
      arguments
    );
  }

  function unstable_runWithPriority() {
    return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_runWithPriority.apply(
      this,
      arguments
    );
  }

  function unstable_next() {
    return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_next.apply(
      this,
      arguments
    );
  }

  function unstable_wrapCallback() {
    return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_wrapCallback.apply(
      this,
      arguments
    );
  }

  function unstable_getCurrentPriorityLevel() {
    return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_getCurrentPriorityLevel.apply(
      this,
      arguments
    );
  }

  function unstable_getFirstCallbackNode() {
    return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_getFirstCallbackNode.apply(
      this,
      arguments
    );
  }

  function unstable_pauseExecution() {
    return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_pauseExecution.apply(
      this,
      arguments
    );
  }

  function unstable_continueExecution() {
    return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_continueExecution.apply(
      this,
      arguments
    );
  }

  function unstable_forceFrameRate() {
    return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_forceFrameRate.apply(
      this,
      arguments
    );
  }

  return Object.freeze({
    unstable_now: unstable_now,
    unstable_scheduleCallback: unstable_scheduleCallback,
    unstable_cancelCallback: unstable_cancelCallback,
    unstable_shouldYield: unstable_shouldYield,
    unstable_requestPaint: unstable_requestPaint,
    unstable_runWithPriority: unstable_runWithPriority,
    unstable_next: unstable_next,
    unstable_wrapCallback: unstable_wrapCallback,
    unstable_getCurrentPriorityLevel: unstable_getCurrentPriorityLevel,
    unstable_continueExecution: unstable_continueExecution,
    unstable_pauseExecution: unstable_pauseExecution,
    unstable_getFirstCallbackNode: unstable_getFirstCallbackNode,
    unstable_forceFrameRate: unstable_forceFrameRate,
    get unstable_IdlePriority() {
      return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        .Scheduler.unstable_IdlePriority;
    },
    get unstable_ImmediatePriority() {
      return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        .Scheduler.unstable_ImmediatePriority;
    },
    get unstable_LowPriority() {
      return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        .Scheduler.unstable_LowPriority;
    },
    get unstable_NormalPriority() {
      return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        .Scheduler.unstable_NormalPriority;
    },
    get unstable_UserBlockingPriority() {
      return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        .Scheduler.unstable_UserBlockingPriority;
    },
    get unstable_Profiling() {
      return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        .Scheduler.unstable_Profiling;
    },
  });
});


/***/ }),

/***/ "./src/common/spin.js":
/*!****************************!*\
  !*** ./src/common/spin.js ***!
  \****************************/
/*! exports provided: spin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spin", function() { return spin; });
function spin(name = '', ms = 0.1) {
    start(name);
    let begin = performance.now();
    let elapsed = 0;
    while (elapsed < ms) {
        elapsed = performance.now() - begin;
    }
    stop(name);
}
const getStartName = name => `${name}-Start`;
const getStopName = name => `${name}-Stop`;
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


/***/ }),

/***/ "./src/fiber/ContextExample.jsx":
/*!**************************************!*\
  !*** ./src/fiber/ContextExample.jsx ***!
  \**************************************/
/*! exports provided: ContextExample */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextExample", function() { return ContextExample; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./lib/react.5faf377df.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const { Fragment } = react__WEBPACK_IMPORTED_MODULE_0__;
const ctx = react__WEBPACK_IMPORTED_MODULE_0__["createContext"](null);
class MyProvider extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(props) {
        super(props);
        this.state = { value: 0 };
    }
    toggle() {
        this.setState(({ value }) => ({ value: (value + 1) % 2 }));
    }
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { onClick: () => this.toggle() }, "Toggle")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](ctx.Provider, { value: this.state.value }, this.props.children)));
    }
}
const Time = () => react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, Date.now());
const MyChild = () => {
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
        Date.now(),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Time, null),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](ctx.Consumer, null, (value) => {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, value);
        }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Time, null)));
};
function ContextExample() {
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", null, "Context Example"),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](MyProvider, null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](MyChild, null))));
}


/***/ }),

/***/ "./src/fiber/index.jsx":
/*!*****************************!*\
  !*** ./src/fiber/index.jsx ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./lib/react.5faf377df.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./lib/react-dom.5faf377df.development.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var scheduler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scheduler */ "./lib/scheduler.5faf377df.development.js");
/* harmony import */ var scheduler__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(scheduler__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_spin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/spin */ "./src/common/spin.js");
/* harmony import */ var _ContextExample__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ContextExample */ "./src/fiber/ContextExample.jsx");





const classes = ["", "red", "blue"];
const getCurrentClass = index => classes[index];
const getNextIndex = currentIndex => (currentIndex + 1) % classes.length;
class Item extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    shouldComponentUpdate(nextProps) {
        return (nextProps.num !== this.props.num ||
            nextProps.className !== this.props.className);
    }
    render() {
        const { num, className } = this.props;
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: className }, num);
    }
}
class List extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(props) {
        super(props);
        this.square = () => {
            // facebook/react#13488 seems to imply deferredUpdates is no longer necessary
            // Also see note in changelog: facebook/react#13571
            scheduler__WEBPACK_IMPORTED_MODULE_2__["unstable_scheduleCallback"](scheduler__WEBPACK_IMPORTED_MODULE_2__["unstable_IdlePriority"], () => this.setState(prevState => ({
                values: prevState.values.map(value => value * value)
            })));
        };
        this.addChild = () => {
            scheduler__WEBPACK_IMPORTED_MODULE_2__["unstable_scheduleCallback"](scheduler__WEBPACK_IMPORTED_MODULE_2__["unstable_IdlePriority"], () => this.setState(prevState => ({
                values: [...prevState.values, prevState.values.length + 1]
            })));
        };
        this.removeChild = () => {
            scheduler__WEBPACK_IMPORTED_MODULE_2__["unstable_scheduleCallback"](scheduler__WEBPACK_IMPORTED_MODULE_2__["unstable_IdlePriority"], () => this.setState(prevState => ({
                values: prevState.values.slice(0, -1)
            })));
        };
        this.nextClass = () => {
            this.setState({
                classIndex: getNextIndex(this.state.classIndex)
            });
        };
        this.nextClassAndSquare = () => {
            scheduler__WEBPACK_IMPORTED_MODULE_2__["unstable_scheduleCallback"](scheduler__WEBPACK_IMPORTED_MODULE_2__["unstable_IdlePriority"], () => this.setState(prevState => ({
                classIndex: getNextIndex(this.state.classIndex),
                values: prevState.values.map(value => value * value)
            })));
        };
        Object(_common_spin__WEBPACK_IMPORTED_MODULE_3__["spin"])("List.constructor");
        this.state = {
            classIndex: 0,
            values: [1, 2, 3]
        };
    }
    static getDerivedStateFromProps(props, state) {
        Object(_common_spin__WEBPACK_IMPORTED_MODULE_3__["spin"])("List.getDerivedStateFromProps");
        return {};
    }
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    render() {
        Object(_common_spin__WEBPACK_IMPORTED_MODULE_3__["spin"])("List.render");
        const itemClass = getCurrentClass(this.state.classIndex);
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", null, "Fiber List operations"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "action", onClick: this.square }, "^2"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "action", onClick: this.addChild }, "Add child"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "action", onClick: this.removeChild }, "Remove child"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "action", onClick: this.nextClass }, "Next class"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "action", onClick: this.nextClassAndSquare }, "Next class and square"),
            this.state.values.map((value, index) => (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Item, { className: itemClass, key: index, num: value })))));
    }
    componentDidMount() {
        Object(_common_spin__WEBPACK_IMPORTED_MODULE_3__["spin"])("List.componentDidMount");
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        Object(_common_spin__WEBPACK_IMPORTED_MODULE_3__["spin"])("List.getSnapshotBeforeUpdate");
        return {};
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        Object(_common_spin__WEBPACK_IMPORTED_MODULE_3__["spin"])("List.componentDidUpdate");
    }
}
const container = document.getElementById("root");
const root = react_dom__WEBPACK_IMPORTED_MODULE_1__["createRoot"](container);
root.render(react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](List, null),
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_ContextExample__WEBPACK_IMPORTED_MODULE_4__["ContextExample"], null)));


/***/ })

/******/ });
//# sourceMappingURL=fiber.bundle.js.map