declare module "simple-cache-provider" {
  import * as React from "react";

  interface Resource<KeyType, ValueType> {
    read(cache: Cache, key: KeyType): ValueType;
    preload(cache: Cache, key: KeyType): void;
  }

  export interface Cache {}
  export const SimpleCache: React.Context<Cache>;
  export function createResource<KeyType, ValueType>(
    loadResource: (key: KeyType) => Promise<ValueType>,
    hash?: (key: KeyType) => string
  ): Resource<KeyType, ValueType>;
}
