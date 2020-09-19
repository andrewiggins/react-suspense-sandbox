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
/******/ 		"movie-app": 0
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
/******/ 	deferredModules.push(["./src/movie-app/index.jsx","react-dom","react"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js!./src/movie-app/styles.scss":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-1!./node_modules/sass-loader/dist/cjs.js!./src/movie-app/styles.scss ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "body {\n  font-family: \"Segoe UI\", Tahoma, Geneva, Verdana, sans-serif; }\n\n.MovieDetails {\n  display: grid;\n  grid-gap: 12px;\n  grid-template-areas: \"poster title title\"\r \"poster meter audience\"\r \"poster consensus consensus\";\n  margin-top: 1em; }\n  .MovieDetails .MoviePoster {\n    grid-area: poster; }\n  .MovieDetails h1 {\n    grid-area: title; }\n  .MovieDetails .MovieMetrics-tomato {\n    grid-area: meter; }\n  .MovieDetails .MovieMetrics-audience {\n    grid-area: audience; }\n  .MovieDetails .MovieMetrics-consensus {\n    grid-area: consensus; }\n\n.MovieReviews {\n  margin-top: 2em; }\n\n.spinner {\n  margin: 0 auto;\n  width: 70px;\n  text-align: center; }\n  .spinner > div {\n    width: 18px;\n    height: 18px;\n    background-color: #333;\n    border-radius: 100%;\n    display: inline-block;\n    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n    animation: sk-bouncedelay 1.4s infinite ease-in-out both; }\n  .spinner .bounce1 {\n    -webkit-animation-delay: -0.32s;\n    animation-delay: -0.32s; }\n  .spinner .bounce2 {\n    -webkit-animation-delay: -0.16s;\n    animation-delay: -0.16s; }\n\n@-webkit-keyframes sk-bouncedelay {\n  0%,\n  80%,\n  100% {\n    -webkit-transform: scale(0); }\n  40% {\n    -webkit-transform: scale(1); } }\n\n@keyframes sk-bouncedelay {\n  0%,\n  80%,\n  100% {\n    -webkit-transform: scale(0);\n    transform: scale(0); }\n  40% {\n    -webkit-transform: scale(1);\n    transform: scale(1); } }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stylesInDom = {};

var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

function listToStyles(list, options) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}

function addStylesToDom(styles, options) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    var j = 0;

    if (domStyle) {
      domStyle.refs++;

      for (; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }

      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j], options));
      }
    } else {
      var parts = [];

      for (; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j], options));
      }

      stylesInDom[item.id] = {
        id: item.id,
        refs: 1,
        parts: parts
      };
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');

  if (typeof options.attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      options.attributes.nonce = nonce;
    }
  }

  Object.keys(options.attributes).forEach(function (key) {
    style.setAttribute(key, options.attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  var styles = listToStyles(list, options);
  addStylesToDom(styles, options);
  return function update(newList) {
    var mayRemove = [];

    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];

      if (domStyle) {
        domStyle.refs--;
        mayRemove.push(domStyle);
      }
    }

    if (newList) {
      var newStyles = listToStyles(newList, options);
      addStylesToDom(newStyles, options);
    }

    for (var _i = 0; _i < mayRemove.length; _i++) {
      var _domStyle = mayRemove[_i];

      if (_domStyle.refs === 0) {
        for (var j = 0; j < _domStyle.parts.length; j++) {
          _domStyle.parts[j]();
        }

        delete stylesInDom[_domStyle.id];
      }
    }
  };
};

/***/ }),

/***/ "./src/movie-app/api/data.js":
/*!***********************************!*\
  !*** ./src/movie-app/api/data.js ***!
  \***********************************/
/*! exports provided: movieListJSON, movieDetailsJSON, movieReviewsJSON */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "movieListJSON", function() { return movieListJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "movieDetailsJSON", function() { return movieDetailsJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "movieReviewsJSON", function() { return movieReviewsJSON; });
/* harmony import */ var _img_bird_jpg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../img/bird.jpg */ "./src/movie-app/img/bird.jpg");
/* harmony import */ var _img_bird_jpg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_img_bird_jpg__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _img_downsizing_jpg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../img/downsizing.jpg */ "./src/movie-app/img/downsizing.jpg");
/* harmony import */ var _img_downsizing_jpg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_img_downsizing_jpg__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _img_panther_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../img/panther.jpg */ "./src/movie-app/img/panther.jpg");
/* harmony import */ var _img_panther_jpg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_img_panther_jpg__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _img_woman_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../img/woman.jpg */ "./src/movie-app/img/woman.jpg");
/* harmony import */ var _img_woman_jpg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_img_woman_jpg__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _img_figures_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../img/figures.jpg */ "./src/movie-app/img/figures.jpg");
/* harmony import */ var _img_figures_jpg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_img_figures_jpg__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _img_man_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../img/man.jpg */ "./src/movie-app/img/man.jpg");
/* harmony import */ var _img_man_jpg__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_img_man_jpg__WEBPACK_IMPORTED_MODULE_5__);






const movieListJSON = [
    { id: 1, title: "Lady Bird", rating: "99%", gross: "$52.9M", fresh: true },
    { id: 2, title: "Downsizing", rating: "51%", gross: "$24.5M", fresh: false },
    {
        id: 3,
        title: "Black Panther",
        rating: "98%",
        gross: "$403.6M",
        fresh: true
    },
    {
        id: 4,
        title: "A Fantastic Woman",
        rating: "93%",
        gross: "$0.6M",
        fresh: true
    },
    {
        id: 5,
        title: "Father Figures",
        rating: "22%",
        gross: "$17.5M",
        fresh: false
    },
    { id: 6, title: "Early Man", rating: "81%", gross: "$6.8M", fresh: true }
];
const movieDetailsJSON = {
    1: {
        title: "Lady Bird",
        rating: "99%",
        fresh: true,
        audience: "81%",
        consensus: "Lady Bird delivers fresh insights about the turmoil of adolescence -- and reveals writer-director Greta Gerwig as a fully formed filmmaking talent.",
        poster: _img_bird_jpg__WEBPACK_IMPORTED_MODULE_0___default.a
    },
    2: {
        title: "Downsizing",
        rating: "51%",
        fresh: false,
        audience: "23%",
        consensus: "Downsizing assembles a talented cast in pursuit of some truly interesting ideas -- which may be enough for some audiences to forgive the final product's frustrating shortcomings.",
        poster: _img_downsizing_jpg__WEBPACK_IMPORTED_MODULE_1___default.a
    },
    3: {
        title: "Black Panther",
        rating: "98%",
        fresh: true,
        audience: "77%",
        consensus: "Black Panther elevates superhero cinema to thrilling new heights while telling one of the MCU's most absorbing stories -- and introducing some of its most fully realized characters.",
        poster: _img_panther_jpg__WEBPACK_IMPORTED_MODULE_2___default.a
    },
    4: {
        title: "A Fantastic Woman",
        rating: "93%",
        fresh: true,
        audience: "82%",
        consensus: "Subtle and tender, A Fantastic Woman handles its timely, sensitive subject matter with care.",
        poster: _img_woman_jpg__WEBPACK_IMPORTED_MODULE_3___default.a
    },
    5: {
        title: "Father Figures",
        rating: "22%",
        fresh: false,
        audience: "36%",
        consensus: "No consensus yet.",
        poster: _img_figures_jpg__WEBPACK_IMPORTED_MODULE_4___default.a
    },
    6: {
        title: "Early Man",
        rating: "81%",
        fresh: true,
        audience: "57%",
        consensus: "Early Man isn't quite as evolved as Aardman's best work, but still retains the unique visuals and sweet humor that have made the studio a favorite among animation enthusiasts.",
        poster: _img_man_jpg__WEBPACK_IMPORTED_MODULE_5___default.a
    }
};
const movieReviewsJSON = {
    1: [{ id: 0, fresh: true, text: "The densely packed" }],
    2: [{ id: 0, fresh: true, text: "While Downsizing is" }],
    3: [{ id: 0, fresh: true, text: "Black Panther is not" }],
    4: [{ id: 0, fresh: true, text: "Given it could be" }],
    5: [{ id: 0, fresh: false, text: "Limp jokes, bad chemistry" }],
    6: [{ id: 0, fresh: false, text: "The story is thin, " }]
};


/***/ }),

/***/ "./src/movie-app/components/App.jsx":
/*!******************************************!*\
  !*** ./src/movie-app/components/App.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./lib/react.5faf377df.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Spinner */ "./src/movie-app/components/Spinner.jsx");
/* harmony import */ var _MovieListPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MovieListPage */ "./src/movie-app/components/MovieListPage.jsx");
/* harmony import */ var _MoviePage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MoviePage */ "./src/movie-app/components/MoviePage.jsx");

// import { CSSTransitionGroup } from 'react-transition-group';



// ------------------------------
// Main screen
// ------------------------------
class App extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
    constructor() {
        super(...arguments);
        this.state = {
            currentId: null,
            showDetail: false
        };
        this.handleMovieClick = id => {
            this.setState({
                currentId: id,
                showDetail: true
            });
        };
        this.handleBackClick = () => {
            this.setState({
                currentId: null,
                showDetail: false
            });
        };
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.showDetail !== this.state.showDetail ||
            prevState.currentId !== this.state.currentId) {
            window.scrollTo(0, 0);
        }
    }
    render() {
        const { currentId, showDetail } = this.state;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "App" }, showDetail ? this.renderDetail(currentId) : this.renderList()));
    }
    renderDetail(id) {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "App-back", onClick: this.handleBackClick }, "👈"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_MoviePage__WEBPACK_IMPORTED_MODULE_3__["default"], { id: id })));
    }
    renderList() {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_MovieListPage__WEBPACK_IMPORTED_MODULE_2__["default"], { onMovieClick: this.handleMovieClick });
    }
}
function NextButton(props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "next", onClick: props.onClick },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "next-inner" }, props.isLoading ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Spinner__WEBPACK_IMPORTED_MODULE_1__["default"], { size: "small" }) : "👉")));
}
// function CrossFade(props) {
//   return (
//     <CSSTransitionGroup
//       transitionName="fade"
//       transitionEnterTimeout={400}
//       transitionLeaveTimeout={200}
//     >
//       {props.children}
//     </CSSTransitionGroup>
//   );
// }


/***/ }),

/***/ "./src/movie-app/components/MovieListPage.jsx":
/*!****************************************************!*\
  !*** ./src/movie-app/components/MovieListPage.jsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MovieListPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./lib/react.5faf377df.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/data */ "./src/movie-app/api/data.js");


function MovieListPage(props) {
    const movies = _api_data__WEBPACK_IMPORTED_MODULE_1__["movieListJSON"];
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "MovieListPage" },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", null, "Top Box Office \uD83C\uDF7F"),
        movies.map(movie => (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](MovieListItem, Object.assign({ key: movie.id }, movie, { onMovieClick: props.onMovieClick }))))));
}
function MovieListItem(props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "MovieListItem" },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { onClick: () => props.onMovieClick(props.id) },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("figure", null, props.fresh ? "🍅" : "😖"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, props.title),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                props.rating,
                " \u00B7 ",
                props.gross))));
}


/***/ }),

/***/ "./src/movie-app/components/MoviePage.jsx":
/*!************************************************!*\
  !*** ./src/movie-app/components/MoviePage.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MoviePage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./lib/react.5faf377df.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/data */ "./src/movie-app/api/data.js");


// ------------------------------
// Individual movie page
// ------------------------------
function MoviePage(props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](MovieDetails, { id: props.id }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](MovieReviews, { id: props.id })));
}
// ------------------------------
// Individual movie details
// ------------------------------
// _______
// |     |  Moorise Kingdom
// |     |  🍅 93%
// |     |  86% liked it
// ------------------------------
function MovieDetails(props) {
    const movie = _api_data__WEBPACK_IMPORTED_MODULE_1__["movieDetailsJSON"][props.id];
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "MovieDetails" },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](MoviePoster, { src: movie.poster }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", null, movie.title),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](MovieMetrics, Object.assign({}, movie))));
}
function MoviePoster(props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "MoviePoster" },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("img", { src: props.src, alt: "poster" })));
}
function MovieMetrics(props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "MovieMetrics-tomato" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Tomatometer"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                props.fresh ? "🍅" : "😖",
                " ",
                props.rating)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "MovieMetrics-audience" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Audience"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                "\uD83C\uDF7F ",
                props.audience)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "MovieMetrics-consensus" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Critics consensus"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, props.consensus))));
}
function MovieReviews(props) {
    const reviews = _api_data__WEBPACK_IMPORTED_MODULE_1__["movieReviewsJSON"][props.id];
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "MovieReviews" }, reviews.map(review => react__WEBPACK_IMPORTED_MODULE_0__["createElement"](MovieReview, Object.assign({ key: review.id }, review)))));
}
function MovieReview(props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("blockquote", { className: "MovieReview" },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("figure", null, props.fresh ? "🍅" : "😖"),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, props.text),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, props.author)));
}


/***/ }),

/***/ "./src/movie-app/components/Spinner.jsx":
/*!**********************************************!*\
  !*** ./src/movie-app/components/Spinner.jsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Spinner; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./lib/react.5faf377df.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function Spinner(props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "spinner" },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "bounce1" }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "bounce2" }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "bounce3" })));
}


/***/ }),

/***/ "./src/movie-app/img/bird.jpg":
/*!************************************!*\
  !*** ./src/movie-app/img/bird.jpg ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/bird.341a06ff4470c49d0d2c653f3adec8cd.jpg";

/***/ }),

/***/ "./src/movie-app/img/downsizing.jpg":
/*!******************************************!*\
  !*** ./src/movie-app/img/downsizing.jpg ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/downsizing.1237a1a5725cdd98fd5e64959d049061.jpg";

/***/ }),

/***/ "./src/movie-app/img/figures.jpg":
/*!***************************************!*\
  !*** ./src/movie-app/img/figures.jpg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/figures.71910e04d74cb4549803447509bec282.jpg";

/***/ }),

/***/ "./src/movie-app/img/man.jpg":
/*!***********************************!*\
  !*** ./src/movie-app/img/man.jpg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/man.9097a6c8d19f8be177765b418749e71f.jpg";

/***/ }),

/***/ "./src/movie-app/img/panther.jpg":
/*!***************************************!*\
  !*** ./src/movie-app/img/panther.jpg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/panther.be18c92b0e09b3094a32f809c1c7b60a.jpg";

/***/ }),

/***/ "./src/movie-app/img/woman.jpg":
/*!*************************************!*\
  !*** ./src/movie-app/img/woman.jpg ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/woman.9c81eb13b0d702c354d1712ee60704f5.jpg";

/***/ }),

/***/ "./src/movie-app/index.jsx":
/*!*********************************!*\
  !*** ./src/movie-app/index.jsx ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./lib/react.5faf377df.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./lib/react-dom.5faf377df.development.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/App */ "./src/movie-app/components/App.jsx");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.scss */ "./src/movie-app/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_3__);




const container = document.getElementById("root");
const root = react_dom__WEBPACK_IMPORTED_MODULE_1__["createRoot"](container);
root.render(react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_App__WEBPACK_IMPORTED_MODULE_2__["default"], null));


/***/ }),

/***/ "./src/movie-app/styles.scss":
/*!***********************************!*\
  !*** ./src/movie-app/styles.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-1!../../node_modules/sass-loader/dist/cjs.js!./styles.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js!./src/movie-app/styles.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ })

/******/ });
//# sourceMappingURL=movie-app.bundle.js.map