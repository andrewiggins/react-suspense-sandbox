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
/******/ 		"suspense": 0
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
/******/ 	deferredModules.push(["./src/suspense/index.jsx","react-dom","react"]);
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

/***/ "./node_modules/react-cache/cjs/react-cache.development.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react-cache/cjs/react-cache.development.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.6.0
 * react-cache.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = __webpack_require__(/*! react */ "./lib/react.5faf377df.development.js");
var scheduler = __webpack_require__(/*! scheduler */ "./lib/scheduler.5faf377df.development.js");

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warningWithoutStack = function () {};

{
  warningWithoutStack = function (condition, format) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (format === undefined) {
      throw new Error('`warningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (args.length > 8) {
      // Check before the condition to catch violations early.
      throw new Error('warningWithoutStack() currently supports at most 8 arguments.');
    }
    if (condition) {
      return;
    }
    if (typeof console !== 'undefined') {
      var _args$map = args.map(function (item) {
        return '' + item;
      }),
          a = _args$map[0],
          b = _args$map[1],
          c = _args$map[2],
          d = _args$map[3],
          e = _args$map[4],
          f = _args$map[5],
          g = _args$map[6],
          h = _args$map[7];

      var message = 'Warning: ' + format;

      // We intentionally don't use spread (or .apply) because it breaks IE9:
      // https://github.com/facebook/react/issues/13610
      switch (args.length) {
        case 0:
          console.error(message);
          break;
        case 1:
          console.error(message, a);
          break;
        case 2:
          console.error(message, a, b);
          break;
        case 3:
          console.error(message, a, b, c);
          break;
        case 4:
          console.error(message, a, b, c, d);
          break;
        case 5:
          console.error(message, a, b, c, d, e);
          break;
        case 6:
          console.error(message, a, b, c, d, e, f);
          break;
        case 7:
          console.error(message, a, b, c, d, e, f, g);
          break;
        case 8:
          console.error(message, a, b, c, d, e, f, g, h);
          break;
        default:
          throw new Error('warningWithoutStack() currently supports at most 8 arguments.');
      }
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      var argIndex = 0;
      var _message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      throw new Error(_message);
    } catch (x) {}
  };
}

var warningWithoutStack$1 = warningWithoutStack;

function createLRU(limit) {
  var LIMIT = limit;

  // Circular, doubly-linked list
  var first = null;
  var size = 0;

  var cleanUpIsScheduled = false;

  function scheduleCleanUp() {
    if (cleanUpIsScheduled === false && size > LIMIT) {
      // The cache size exceeds the limit. Schedule a callback to delete the
      // least recently used entries.
      cleanUpIsScheduled = true;
      scheduler.unstable_scheduleCallback(cleanUp);
    }
  }

  function cleanUp() {
    cleanUpIsScheduled = false;
    deleteLeastRecentlyUsedEntries(LIMIT);
  }

  function deleteLeastRecentlyUsedEntries(targetSize) {
    // Delete entries from the cache, starting from the end of the list.
    if (first !== null) {
      var resolvedFirst = first;
      var last = resolvedFirst.previous;
      while (size > targetSize && last !== null) {
        var _onDelete = last.onDelete;
        var _previous = last.previous;
        last.onDelete = null;

        // Remove from the list
        last.previous = last.next = null;
        if (last === first) {
          // Reached the head of the list.
          first = last = null;
        } else {
          first.previous = _previous;
          _previous.next = first;
          last = _previous;
        }

        size -= 1;

        // Call the destroy method after removing the entry from the list. If it
        // throws, the rest of cache will not be deleted, but it will be in a
        // valid state.
        _onDelete();
      }
    }
  }

  function add(value, onDelete) {
    var entry = {
      value: value,
      onDelete: onDelete,
      next: null,
      previous: null
    };
    if (first === null) {
      entry.previous = entry.next = entry;
      first = entry;
    } else {
      // Append to head
      var last = first.previous;
      last.next = entry;
      entry.previous = last;

      first.previous = entry;
      entry.next = first;

      first = entry;
    }
    size += 1;
    return entry;
  }

  function update(entry, newValue) {
    entry.value = newValue;
  }

  function access(entry) {
    var next = entry.next;
    if (next !== null) {
      // Entry already cached
      var resolvedFirst = first;
      if (first !== entry) {
        // Remove from current position
        var _previous2 = entry.previous;
        _previous2.next = next;
        next.previous = _previous2;

        // Append to head
        var last = resolvedFirst.previous;
        last.next = entry;
        entry.previous = last;

        resolvedFirst.previous = entry;
        entry.next = resolvedFirst;

        first = entry;
      }
    } else {
      // Cannot access a deleted entry
      // TODO: Error? Warning?
    }
    scheduleCleanUp();
    return entry.value;
  }

  function setLimit(newLimit) {
    LIMIT = newLimit;
    scheduleCleanUp();
  }

  return {
    add: add,
    update: update,
    access: access,
    setLimit: setLimit
  };
}

var Pending = 0;
var Resolved = 1;
var Rejected = 2;

var currentOwner = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;

function readContext(Context, observedBits) {
  var dispatcher = currentOwner.currentDispatcher;
  if (dispatcher === null) {
    throw new Error('react-cache: read and preload may only be called from within a ' + "component's render. They are not supported in event handlers or " + 'lifecycle methods.');
  }
  return dispatcher.readContext(Context, observedBits);
}

function identityHashFn(input) {
  {
    !(typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean' || input === undefined || input === null) ? warningWithoutStack$1(false, 'Invalid key type. Expected a string, number, symbol, or boolean, ' + 'but instead received: %s' + '\n\nTo use non-primitive values as keys, you must pass a hash ' + 'function as the second argument to createResource().', input) : void 0;
  }
  return input;
}

var CACHE_LIMIT = 500;
var lru = createLRU(CACHE_LIMIT);

var entries = new Map();

var CacheContext = React.createContext(null);

function accessResult(resource, fetch, input, key) {
  var entriesForResource = entries.get(resource);
  if (entriesForResource === undefined) {
    entriesForResource = new Map();
    entries.set(resource, entriesForResource);
  }
  var entry = entriesForResource.get(key);
  if (entry === undefined) {
    var thenable = fetch(input);
    thenable.then(function (value) {
      if (newResult.status === Pending) {
        var resolvedResult = newResult;
        resolvedResult.status = Resolved;
        resolvedResult.value = value;
      }
    }, function (error) {
      if (newResult.status === Pending) {
        var rejectedResult = newResult;
        rejectedResult.status = Rejected;
        rejectedResult.value = error;
      }
    });
    var newResult = {
      status: Pending,
      value: thenable
    };
    var newEntry = lru.add(newResult, deleteEntry.bind(null, resource, key));
    entriesForResource.set(key, newEntry);
    return newResult;
  } else {
    return lru.access(entry);
  }
}

function deleteEntry(resource, key) {
  var entriesForResource = entries.get(resource);
  if (entriesForResource !== undefined) {
    entriesForResource.delete(key);
    if (entriesForResource.size === 0) {
      entries.delete(resource);
    }
  }
}

function unstable_createResource(fetch, maybeHashInput) {
  var hashInput = maybeHashInput !== undefined ? maybeHashInput : identityHashFn;

  var resource = {
    read: function (input) {
      // react-cache currently doesn't rely on context, but it may in the
      // future, so we read anyway to prevent access outside of render.
      readContext(CacheContext);
      var key = hashInput(input);
      var result = accessResult(resource, fetch, input, key);
      switch (result.status) {
        case Pending:
          {
            var suspender = result.value;
            throw suspender;
          }
        case Resolved:
          {
            var _value = result.value;
            return _value;
          }
        case Rejected:
          {
            var error = result.value;
            throw error;
          }
        default:
          // Should be unreachable
          return undefined;
      }
    },
    preload: function (input) {
      // react-cache currently doesn't rely on context, but it may in the
      // future, so we read anyway to prevent access outside of render.
      readContext(CacheContext);
      var key = hashInput(input);
      accessResult(resource, fetch, input, key);
    }
  };
  return resource;
}

function unstable_setGlobalCacheLimit(limit) {
  lru.setLimit(limit);
}

exports.unstable_createResource = unstable_createResource;
exports.unstable_setGlobalCacheLimit = unstable_setGlobalCacheLimit;
  })();
}


/***/ }),

/***/ "./node_modules/react-cache/index.js":
/*!*******************************************!*\
  !*** ./node_modules/react-cache/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-cache.development.js */ "./node_modules/react-cache/cjs/react-cache.development.js");
}


/***/ }),

/***/ "./src/common/delay.js":
/*!*****************************!*\
  !*** ./src/common/delay.js ***!
  \*****************************/
/*! exports provided: delay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delay", function() { return delay; });
function delay(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/***/ }),

/***/ "./src/suspense/getText.js":
/*!*********************************!*\
  !*** ./src/suspense/getText.js ***!
  \*********************************/
/*! exports provided: getText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getText", function() { return getText; });
/* harmony import */ var _common_delay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/delay */ "./src/common/delay.js");

function getText(value, ms = 5000) {
    if (value == null) {
        throw new Error("`getText` requires a value.");
    }
    if (value === 0) {
        return Promise.resolve(0);
    }
    return Object(_common_delay__WEBPACK_IMPORTED_MODULE_0__["delay"])(ms).then(() => value);
}


/***/ }),

/***/ "./src/suspense/index.jsx":
/*!********************************!*\
  !*** ./src/suspense/index.jsx ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./lib/react.5faf377df.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./lib/react-dom.5faf377df.development.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-cache */ "./node_modules/react-cache/index.js");
/* harmony import */ var react_cache__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_cache__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var scheduler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scheduler */ "./lib/scheduler.5faf377df.development.js");
/* harmony import */ var scheduler__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(scheduler__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _getText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getText */ "./src/suspense/getText.js");





const readText = Object(react_cache__WEBPACK_IMPORTED_MODULE_2__["unstable_createResource"])(_getText__WEBPACK_IMPORTED_MODULE_4__["getText"]);
function Text({ value }) {
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, value);
}
function AsyncText({ value }) {
    value = readText.read(value);
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Text, { value: value });
}
class App extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(props) {
        super(props);
        this.addOne = () => {
            // High-priority update to `state.value`
            this.setState({ value: this.state.value + 1 });
            // Low priority update to `state.valueAsync`. Could be suspended.
            Object(scheduler__WEBPACK_IMPORTED_MODULE_3__["unstable_scheduleCallback"])(() => this.setState({ valueAsync: this.state.valueAsync + 1 }));
        };
        this.substractOne = () => {
            // High-priority update to `state.value`
            this.setState({ value: this.state.value - 1 });
            // Low priority update to `state.valueAsync`. Could be suspended.
            Object(scheduler__WEBPACK_IMPORTED_MODULE_3__["unstable_scheduleCallback"])(() => this.setState({ valueAsync: this.state.valueAsync - 1 }));
        };
        this.state = {
            value: 0,
            valueAsync: 0
        };
        readText.preload(0);
    }
    render() {
        const { value, valueAsync } = this.state;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", null, "Async Text Suspense Demo"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "button-bar" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { onClick: this.addOne }, "+1"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { onClick: this.substractOne }, "-1")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, "Expected: "),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Text, { value: value })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, "AsyncText: "),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Suspense"], { maxDuration: 2500, fallback: react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, "Loading...") },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](AsyncText, { value: valueAsync })))));
    }
}
const container = document.getElementById("root");
const root = react_dom__WEBPACK_IMPORTED_MODULE_1__["createRoot"](container);
root.render(react__WEBPACK_IMPORTED_MODULE_0__["createElement"](App, null));


/***/ })

/******/ });
//# sourceMappingURL=suspense.bundle.js.map