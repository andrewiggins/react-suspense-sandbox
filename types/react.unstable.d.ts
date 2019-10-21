import * as React from "react";

declare module "react" {
  interface PlaceholderProps {
    maxDuration?: number;
    fallback?: JSX.Element;
  }

  export class Suspense extends React.Component<PlaceholderProps> {}

  export class unstable_ConcurrentMode extends React.Component<{}> {}
}
