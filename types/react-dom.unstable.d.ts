import * as ReactDOM from "react-dom";

declare module "react-dom" {
  interface Work {
    then(onCommit: () => any): void;
  }

  interface Batch {
    render(children: JSX.Element): Work,
    then(onComplete: () => any): void,
    commit(): void,
  }

  interface ReactRoot {
    render(children: JSX.Element, callback?: () => any): Work,
    unmount(callback?: () => any): Work,
    createBatch(): Batch,
  }

  type DOMContainer = Element | Document;

  interface RootOptions {
    hydrate: boolean;
  }

  export function unstable_createRoot(
    container: DOMContainer,
    options?: RootOptions
  ): ReactRoot;

  export function unstable_deferredUpdates<ReturnType>(
    fn: () => ReturnType
  ): ReturnType;
}
