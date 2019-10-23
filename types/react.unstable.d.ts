import * as React from "react";

declare module "react" {
  interface PlaceholderProps {
    maxDuration?: number;
    fallback?: JSX.Element;
  }
}
