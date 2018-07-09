import * as ReactDOM from "react-dom";

declare module "react-dom" {
  interface CreateRootOptions {
    hydrate: boolean;
  }

  interface ReactRoot {
    render(element: JSX.Element): void;
  }

  export function unstable_createRoot(container: Element, options?: CreateRootOptions): ReactRoot;
}
