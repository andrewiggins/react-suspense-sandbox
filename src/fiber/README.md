# React Fiber sandbox

This project contains code used to understand how React Fiber works. Below is a
list of things I've learned and interesting methods I've come across while
exploring it's implementation.

This document is based on React as of commit 095dd5049 (2018-07-07).

## Prior work

* [A carton introduction to Fiber - React Conf
  2017](https://www.youtube.com/watch?v=ZCuYPiUIONs) by Lin Clark ([My
  Notes](./fiber-cartoon-notes.md))
* [Fiber Principles: Contributing to
  Fiber](https://github.com/facebook/react/issues/7942) by Sebastian Markbåge
* [React Fiber
  Architecture](https://github.com/acdlite/react-fiber-architecture) by Andrew
  Clark

TODO: Finish reading these

## Learnings

There are two main types of components: HostComponent (e.g. div) and
Functional/ClassComponent (e.g. React Components).

Fibers generally map to components and other elements in the React virtual dom.
So "performing work on a Fiber" is can also be read as "performing work on a
component", which usually invovles calling lifecycle methods and diffing
properties.

### The general flow

When React is ready to proces the update the general, simplified call stack of
methods is below. I've combined methods on to one line if they are usually
called together and are closely related.

```text
1. performWorkOnRoot
  2. renderRoot (render phase)
    3. workLoop
      4. performUnitOfWork
        5. beginWork
        6. completeUnitOfWork
          7. completeWork -> 8. prepareUpdate
  9. completeRoot -> 10. commitRoot (commit phase)
    11. commitAllHostEffects
      12. commitWork/commitPlacement/commitDeletion -> 13. commitUpdate
```

Each of the methods above are described in more detail further below. For now,
we'll summarize the work loop here.

NOTE: React has a mechanism of using "deadlines" to pause work momentairly so
the browser can run a "style-layout-paint-composite" cycle. This manifest itself
in multiple calls to `performWorkOnRoot` that resume where the previous
`performWorkOnRoot` left off. There are also other more complicated mechanisms
React has around abandoning a `workInProgress` Fiber for a higher priority
update. This process of pausing a work in progress is called `yielding` in the
React codebase (I think). I don't describe yielding below for simplicity, though
I believe it happens in the `workLoop` if you are curious.

#### Render phase

When React is ready to do work, it calls `performUnitOfWork` on the Fiber to be
worked on (the `workInProgress`). `performUnitOfWork` calls `beginWork` on the
Fiber.

`beginWork` runs the render phase for that Fiber (calls lifecycle methods,
render, etc.). If that Fiber has children, `beginWork` returns the first child
of the Fiber, which the `workLoop` calls `performUnitOfWork` on.

Once a Fiber with no children is reached, `performUnitOfWork` calls
`completeUnitOfWork` on that Fiber. `completeUnitOfWork` computes any
updates/effects that need to happen (by calling `completeWork`), and adds them
to the return Fiber's (`Fiber.return`) effect list (the Fiber's `firstEffect`
and `lastEffect` properties) (note: `return` could be a parent Fiber or it could
be the previous sibling). It then computes the next Fiber to complete or work
on. If there is a sibling Fiber, `completeUnitOfWork` returns it to work on. If
there is no sibling, then `completeUnitOfWork` completes the parent Fiber. If
the parent Fiber has a sibling Fiber to work on, it returns it, else it works on
its parent Fiber. This loop (`this` -> `child` -> `sibling` -> `return`)
continues until all Fibers/Components are worked on and completed. (see the 6th
bullet from the [Fiber Principles
issue](https://github.com/facebook/react/issues/7942) to see a better
description of how this traversal happens)

At the end of this work loop, the root Fiber has a linked list to all the Fibers
that have updates to apply: this is the effect list. It is linked to on the
`Fiber.firstEffect` and `Fiber.lastEffect` properties.

#### Commit phase

TODO: Expand

### Types of side effects

**ReactTypeOfSideEffect.js** stores the list of side effects. Some interesting
ones:

- Placement
- Update
- Deletion
- Callback
- DidCapture
- Ref
- Snapshot

### Commiting work

The type of an `updatePayload` is a list of pairs where the first item in the
pair is property, and the second item is the new value. Such as the below:

```ts
["className", "blue", "children", "16"];
```

### To expand

* How does React manage multiple pending updates? What is the
  `Fiber.updateQueue` and how is it managed? Are all updates added to it? What
  updates are enqueued?

  It appears calls to `setState` find their way to
  `ReactFiberClassComponent.enqueueSetState`, which calls
  `ReactUpdateQueue.enqueueUpdate`, which adds to the
  `workInProgress.updateQueue`. Then when running
  `ReactFiberClassComponent.updateClassInstance` (see below),
  `processUpdateQueue` is used to get the next state.

  `processUpdateQueue` applies all pending state updates with high enough
  priority and returns them. There is some logic in there around skipping over
  lower priority updates, but keeping them in their place in the queue. When the
  lower priority update is applied any high pri update previously applied may be
  applied again to guarantee the correct original order of updates is
  maintained.

  Stack frame for `updateClassInstance`:
    1. `ReactFiberBeginWork.beginWork`
    2. `ReactFiberBeginWork.updateClassComponent`
    3. `ReactFiberClassComponent.updatedClassInstance`
    4. `ReactUpdateQueue.processUpdateQueue`

* TODO: Add description of `ReactUpdateQueue.commitUpdateQueue`. I think it is
  in charge of calling callbacks and updating the updateQueue after updates have
  been applied

* TODO: Add tracing for all mechanisms that requestWork and if they modify any
  `updateQueue`s

* TODO: Write paragraphs describing
    * How work is commited

    * How effects are tracked using `firstEffect` and `lastEffect`.

      I think `firstEffect` and `lastEffect` make up the linked list of Fibers
      that have an `updatePayload` to commit to the DOM.

    * How the updateQueue is managed.

## Method descriptions

### ReactFiberScheduler

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

  Calls `beginWork` and `completeUnitWork`, returning the next Fiber to work on.
  It is called in the `workLoop`.

- completeUnitOfWork

  ```ts
  function completeUnitOfWork(workInProgress: Fiber): Fiber | null;
  ```

  Calls completeWork. Then appends the current Fiber's children effects to the
  returnFiber (if no siblings) and then appends itself if the current Fiber has
  an effect.

  TODO: Document who calls this method & when they call the method, and expand
  what it does. I think it is only called after all children are completed (It
  appears `beginWork` ends up returning `workInProgress.child` so if
  `workInProgress.child` is `null` this method gets invoked.)? Then this method
  determines if the next workInProgress is either the `workInProgress.sibling`,
  or the `workInProgress.return`. If it is a sibling, this method returns the
  sibling to `performUnitOfWork` and the `workLoop` continues with the sibling.
  If the next workInProgress is the return Fiber, then this method loops and
  completes the return Fiber as well. That loop continues completing return
  Fibers until an exit condition is met (such as reaching the root, or finding a
  sibling Fiber to work on, etc.)

  TODO: Investigate comment `// Do not append effects to parents if a sibling
  failed to complete`

  TODO: Investigate what this method does when a component throws

- completeRoot

  ```ts
  function completeRoot(
    root: FiberRoot,
    finishedWork: Fiber,
    expirationTime: ExpirationTime,
  ): void
  ```

  Commits completed work on this root by either scheduling the finished work to
  be committed with an already scheduled batched update or by calling
  `commitRoot` which synchronously commits the work.

- commitRoot

  ```ts
  function commitRoot(root: FiberRoot, finishedWork: Fiber): void;
  ```

  Runs the commit phase of React by calling `commitBeforeMutationLifecycles`
  (i.e. `getSnapshotBeforeUpdate`), `commitAllHostEffects` (i.e. applies
  updates), and `commitAllLifeCycles` (i.e. TODO: figure out what this method
  does)

- commitAllHostEffects

  ```ts
  function commitAllHostEffects(): void;
  ```

  Loops through the effects (fibers) to apply and commits them, calling the
  appropriate method per effect type

### ReactFiberBeginWork

- beginWork

  ```ts
  function beginWork(
    current: Fiber | null,
    workInProgress: Fiber,
    renderExpirationTime: ExpirationTime,
  ): Fiber | null
  ```

  Updates a `workInProgress` fiber (e.g. a class component or functional
  component) and returns the next Fiber to work on, typically the
  `workInProgress.child`.

### ReactFiberCompleteWork

- completeWork

  ```ts
  function completeWork(
    current: Fiber | null,
    workInProgress: Fiber,
    renderExpirationTime: ExpirationTime,
  ): Fiber | null;
  ```

  For HostComponents (i.e. DOM elements) calls `prepareUpdate` to generate an
  update payload and `updateHostComponent` to set the update payload on the
  component and mark its effect tag as having an `Update` effect.

### ReactFiberCommitWork

- commitPlacement

  ```ts
  function commitPlcement(finishedWork: Fiber): void;
  ```

  Commits a Placement effect by calling the host's configured insert or append
  methods

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

### ReactDOMHostConfig

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

  Calls `ReactDOMFiberComponent.updateProperties ->
  ReactDOMFiberComponent.updateDOMProperties` to apply a diff.

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

  Prepares the `updatePayload` for a domElement by calling
  `ReactDOMFiberComponent.diffProperties` to calculate the diff between two
  objects

### ReactDOMFiberComponent

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
