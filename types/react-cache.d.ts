declare module "react-cache" {
  import * as React from "react";

  interface Resource<KeyType, ValueType> {
    read(key: KeyType): ValueType;
    preload(key: KeyType): void;
  }

  export function unstable_createResource<KeyType, ValueType>(
    loadResource: (key: KeyType) => Promise<ValueType>,
    hash?: (key: KeyType) => string | number
  ): Resource<KeyType, ValueType>;
}
