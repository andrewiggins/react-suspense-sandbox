import * as React from "react";

declare module "react" {
  interface PlaceholderProps {
    delayMs?: number;
    fallback?: JSX.Element;
  }

  export class Placeholder extends React.Component<PlaceholderProps> {}
}