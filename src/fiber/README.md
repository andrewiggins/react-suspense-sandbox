# React Fiber sandbox

This project contains code used to understand how React Fiber works. Below is a list of things I've learned and interesting
methods I've come across while exploring it's implementation.

This document is based on React as of commit 095dd5049.

## Learnings

There are two main types of components: HostComponent (e.g. div) and Functional/ClassComponent (e.g. React Components).

### To expand

* How does React manage multiple pending updates? What is the `Fiber.updateQueue` and how is it managed? Are
  all updates added to it? What updates are enqueued?

  It appears calls to `setState` find their way to `ReactFiberClassComponent.enqueueSetState`, which calls
  `ReactUpdateQueue.enqueueUpdate`, which adds to the `workInProgress.updateQueue`. Then when running
  `ReactFiberClassComponent.updateClassInstance` (see below), `processUpdateQueue` is used to get
  the next state.

  `processUpdateQueue` applies all pending state updates with high enough priority and returns them.
  There is some logic in there around skipping over lower priority updates, but keeping them in their
  place in the queue. When the lower priority update is applied all the high pri updates before it are
  applied as well so they can be reapplied in the same order.

  Stack frame for `updateClassInstance`:
    1. `ReactFiberBeginWork.beginWork`
    2. `ReactFiberBeginWork.updateClassComponent`
    3. `ReactFiberClassComponent.updatedClassInstance`
    4. `ReactUpdateQueue.processUpdateQueue`

* TODO: Add tracing for all mechanisms that requestWork and if they modify any `updateQueue`s

* TODO: Add tracing for all methods in `ReactFiberClassComponent.classComponentUpdater`

* TODO: Write paragraphs describing
    * How the updateQueue is managed
    * How the tree is climbed and work happens (in what methods, etc.)
    * How effects are tracked
    * How work is commited

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

### Method descriptions

#### ReactFiberScheduler

- renderRoot

  ```ts
  function renderRoot(
    root: FiberRoot,
    isYieldy: boolean,
    isExpired: boolean,
  ): void
  ```

  Runs the `workLoop`. Also handles errors thrown while performing work

- workLoop

  ```ts
  function workLoop(isYieldy): void;
  ```

  Calls `performUnitOfWork` in a loop until it needs to yield

- performUnitOfWork

  ```ts
  function performUnitOfWork(workInProgress: Fiber): Fiber | null;
  ```

  Calls `beginWork` and `completeUnitWork`, returning the next Fiber to work on. It is
  called in the `workLoop`.

- completeUnitOfWork

  ```ts
  function completeUnitOfWork(workInProgress: Fiber): Fiber | null;
  ```

  Calls completeWork. Then appends the current Fiber's children effects
  to the returnFiber (if no siblings) and then appends itself if the current Fiber has an effect.

  TODO: Document who calls this method & when they call the method, and expand what it does. I think
  it is only called after all children are completed (It appears `beginWork` ends up returning
  `workInProgress.child` so if `workInProgress.child` is `null` this method gets invoked.)? Then
  this method determines if the next workInProgress is either the `workInProgress.sibling`,
  or the `workInProgress.return`. If it is a sibling, this method returns the sibling to
  `performUnitOfWork` and the `workLoop` continues with the sibling. If the next workInProgress
  is the return Fiber, then this method loops and completes the return Fiber as well. That loop
  continues completing return Fibers until an exit condition is met (such as reaching the root,
  or finding a sibling Fiber to work on, etc.)

  TODO: Investigate comment `// Do not append effects to parents if a sibling failed to complete`

  TODO: Investigate what this method does when a component throws

- completeRoot

  ```ts
  function completeRoot(
    root: FiberRoot,
    finishedWork: Fiber,
    expirationTime: ExpirationTime,
  ): void
  ```

  Commits completed work on this root by either scheduling the finished work to be committed with
  an already scheduled batched update or by calling `commitRoot` which synchronously commits the
  work.

- commitRoot

  ```ts
  function commitRoot(root: FiberRoot, finishedWork: Fiber): void;
  ```

  Runs the commit phase of React by calling `commitBeforeMutationLifecycles` (i.e. `getSnapshotBeforeUpdate`),
  `commitAllHostEffects` (i.e. applies updates), and `commitAllLifeCycles` (i.e. TODO: figure out what this
  method does)

- commitAllHostEffects

  ```ts
  function commitAllHostEffects(): void;
  ```

  Loops through the effects (fibers) to apply and commits them, calling the appropriate method per effect type

#### ReactFiberBeginWork

- beginWork

  ```ts
  function beginWork(
    current: Fiber | null,
    workInProgress: Fiber,
    renderExpirationTime: ExpirationTime,
  ): Fiber | null
  ```

  Updates a `workInProgress` fiber (e.g. a class component or functional component) and returns the next
  Fiber to work on, typically the `workInProgress.child`.

#### ReactFiberCompleteWork

- completeWork

  ```ts
  function completeWork(
    current: Fiber | null,
    workInProgress: Fiber,
    renderExpirationTime: ExpirationTime,
  ): Fiber | null;
  ```

  For HostComponents (i.e. DOM elements) calls `prepareUpdate` to generate an update payload and
  `updateHostComponent` to set the update payload on the component and mark its effect tag as having
  an `Update` effect.

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
