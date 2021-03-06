import * as ReactDOM from "react-dom";

// Taken from ReactDOM flow types in ReactDOM's source files

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

  export function createRoot(
    container: DOMContainer,
    options?: RootOptions
  ): ReactRoot;
}
