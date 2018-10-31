export interface MethodTracer {
  /**
   * @param {string} name The name of the method
   * @param {any} [idParam] An optional parameter to uniquely identify this method call
   */
  enter(name: string, idParam?: any): number;
  exit(): string;
  log(...args: any[]): void;

  /**
   * @param {any} error The error thrown
   * @param {string} name The name of the method
   * @param {any} [idParam] An optional parameter identifying this method call
   */
  unwindOnError(error: any, name: string, idParam: any): void;
}
