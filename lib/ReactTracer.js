const defer = (cb) => Promise.resolve().then(cb);

const debugTracing = false;
function logParentMethod() {
  if (debugTracing) {
    console.log(new Error().stack.split('\n')[3].trim());
  }
}

// Buffer writes to the console so as not to slow down the React
// render cycle and artifically fragment it. Writing all this to
// the console takes about 10x as long as running the React render

/**
 * @extends {Console}
 */
class ConsoleBuffer {
  constructor() {
    /** @type {Array<[string, any[]]>} */
    this.buffer = [];

    for (let methodName of Object.keys(console)) {
      this[methodName] = this.proxy(methodName);
    }
  }

  proxy(methodName) {
    return (...args) => {
      this.buffer.push([methodName, args]);
    };
  }

  flush() {
    let method;
    while ((method = this.buffer.shift())) {
      let [name, args] = method;
      console[name](...args);
    }
  }
}

class MethodTracer {
  /**
   * @typedef {{ collapsed: boolean; }} MethodConfig Set certain methods to
   * default to collapsed in the console window
   * @param {Record<string, MethodConfig>} config
   */
  constructor(config) {
    /** @type {string[]} */
    this.stack = [];
    this.console = new ConsoleBuffer();
    this.divider = '-';
    this.config = config;
  }

  /**
   * @param {string} name The name of the method
   * @param {any} [idParam] An optional parameter to uniquely identify this method call
   */
  enter(name, idParam) {
    logParentMethod();

    const consoleArgs = [name];
    if (typeof idParam !== 'undefined') {
      consoleArgs.push(this.divider, idParam);
    }

    const methodConfig = this.config[name];
    if (methodConfig && methodConfig.collapsed) {
      this.console.groupCollapsed(...consoleArgs);
    } else {
      this.console.group(...consoleArgs);
    }

    return this.stack.push(this.getId(name, idParam));
  }

  exit() {
    logParentMethod();

    this.console.groupEnd();
    const exitedId = this.stack.pop();

    if (this.stack.length === 0) {
      defer(() => this.console.flush());
    }

    return exitedId;
  }

  log(...args) {
    this.console.log(...args);
  }

  /**
   * @param {any} error The error thrown
   * @param {string} name The name of the method
   * @param {any} [idParam] An optional parameter identifying this method call
   */
  unwindOnError(error, name, idParam) {
    const id = this.getId(name, idParam);
    this.console.log(
      'Error caught in "' + this.lastId() + '". Rewinding to "' + id + '"'
    );
    this.console.log('Error:', error);
    while (this.lastId() !== id && this.lastId() != null) {
      this.exit();
    }
  }

  /**
   * @private
   * @param {string} name The name of the method
   * @param {any} [idParam] An optional parameter identifying this method call
   */
  getId(name, idParam) {
    return typeof idParam === 'undefined'
      ? name
      : [name, this.divider, idParam].join(' ');
  }

  /**
   * @private
   */
  lastId() {
    return this.stack[this.stack.length - 1];
  }
}

/** @type {import('../methodTracer').MethodTracer} */
export const ReactTracer = new MethodTracer({
  renderRoot: {
    collapsed: true,
  },
});

// @ts-ignore
window.ReactTracer = ReactTracer;
