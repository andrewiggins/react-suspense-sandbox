# React Fiber sandbox

This project contains code used to understand how React Fiber works. Below is a list of things I've learned and interesting
methods I've come across while exploring it's implementation.

This document is based on React as of commit 095dd5049.

## Learnings

There are two main types of components: HostComponent (e.g. div) and Functional/ClassComponent (e.g. React Components).

### Types of side effects

**ReactTypeOfSideEffect.js** stores the list of side effects. Some interesting ones:

- Placement
- Update
- Deletion
- Callback
- DidCapture
- Ref
- Snapshot

### Commiting work

The type of an `updatePayload` is a list of pairs where the first item in the pair is property, and the second item is the new value.
Such as the below:

```ts
["className", "blue", "children", "16"];
```

#### ReactFiberScheduler

- commitAllHostEffects

  ```ts
  function commitAllHostEffects(): void;
  ```

  Loops through the effects (fibers) to apply and commits them, calling the appropriate method per effect type

#### ReactFiberCommitWork

- commitPlacement

  ```ts
  function commitPlcement(finishedWork: Fiber): void;
  ```

  Commits a Placement effect by calling the host's configured insert or append methods

- commitWork

  ```ts
  function commitWork(current: Fiber | null, finishedWork: Fiber): void;
  ```

  Commits an Update effect by calling the host's configured commitUpdate method

- commitDeletion

  ```ts
  function commitDeletion(currentFiber: Fiber): void;
  ```

  Commits a Deletion effect by calling the host's configured removeChild methods

#### ReactDOMHostConfig

- commitUpdate

  ```ts
  function commitUpdate(
    domElement: Instance,
    updatePayload: Array<mixed>,
    type: string,
    oldProps: Props,
    newProps: Props,
    internalInstanceHandle: Object
  ): void;
  ```

  Calls `ReactDOMFiberComponent.updateProperties -> ReactDOMFiberComponent.updateDOMProperties` to apply a diff.

- commitTextUpdate

  ```ts
  function commitTextUpdate(
    textInstance: TextInstance,
    oldText: string,
    newText: string
  ): void;
  ```

  Sets a DOM node text content

- appendChild, appendChildToContainer

  ```ts
  function appendChild(
    parentInstance: Instance,
    child: Instance | TextInstance
  ): void;
  ```

  Append a child to a container

- insertBefore, insertInContainerBefore

  ```ts
  function insertBefore(
    parentInstance: Instance,
    child: Instance | TextInstance,
    beforeChild: Instance | TextInstance
  ): void;
  ```

  Insert a child before another child

- removeChild, removeChildFromContainer

  ```ts
  function removeChild(
    parentInstance: Instance,
    child: Instance | TextInstance
  ): void;
  ```

  Delete a child

- prepareUpdate

  ```ts
  function prepareUpdate(
    domElement: Instance,
    type: string,
    oldProps: Props,
    newProps: Props,
    rootContainerInstance: Container,
    hostContext: HostContext
  ): null | Array<mixed>;
  ```

  Prepares the `updatePayload` for a domElement by calling `ReactDOMFiberComponent.diffProperties` to calculate the diff between two objects

#### ReactDOMFiberComponent

- diffProperties

  ```ts
  function diffProperties(
    domElement: Element,
    tag: string,
    lastRawProps: Object,
    nextRawProps: Object,
    rootContainerElement: Element | Document
  ): null | Array<mixed>;
  ```

  Calculate the diff between the two objects. Returns the `updatPayload` if any

- updateProperties

  ```ts
  function updateProperties(
    domElement: Element,
    updatePayload: Array<any>,
    tag: string,
    lastRawProps: Object,
    nextRawProps: Object
  ): void;
  ```

  Applies an `updatePayload` to the DOM. Calls `updateDOMProperties`.

- updateDOMProperties

  ```ts
  function updateDOMProperties(
    domElement: Element,
    updatePayload: Array<any>,
    wasCustomComponentTag: boolean,
    isCustomComponentTag: boolean
  ): void;
  ```

  Loops through the `updatePayload` and sets the corresponding properties
