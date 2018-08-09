# Suspense sandbox

This project contains code used to explore how React Suspense works using as
simple as possible examples. Learnings from exploring how it works are added
here.

## Initial thoughts

- Suspense **pauses** the rendering of a subtree. Meaning updates are queued but
  not applied to that subtree until some event has happened (e.g. a promise
  returns, a timeout is exceeded)

  This feature is intended to mimic the ability of other frameworks (e.g. native
  iOS, presumably Ember had something like this?) to wait to render the next
  screen until it is ready to avoid unnecessary loading states if the date will
  come back quickly from a fast network, or render quickly on a fast devices.

- The ability to pause an update in progress seems hinged on the ability to have
  separate render/commit stages in order to avoid "tearing" (i.e. to avoid
  paritally applying updates to the DOM) (e.g. only rendering part of the page
  to the DOM).

- `expirationTime` is the core concept React uses to model priorities (I think).
  An update with a sooner expiration time has a higher priority than one with a
  later expiration time.

## To explore

- Better understand how React tracks effects. There is an `updatePayload`
  concept in ReactDOM, but what are the `firstEffect` and `lastEffect` pointers
  on a Fiber used for?
- How does React handle multiple updates queued to the same subtree (e.g.
  quickly clicking different links in a nav that is code-split). Might be
  related to the `updateQueue` defined in `ReactUpdateQueue.js`.

## Learnings

### Capturing thrown Promise

#### ReactFiberScheduler

- performWorkOnRoot

  ```ts
  function performWorkOnRoot(
    root: FiberRoot,
    expirationTime: ExpirationTime,
    isExpired: boolean
  ): void;
  ```

  Invoked whenever React wants to start doing work on a root. Calls
  `renderRoot`.

- renderRoot

  ```ts
  function renderRoot(
    root: FiberRoot,
    isYieldy: boolean,
    isExpired: boolean
  ): void;
  ```

  Runs the `workLoop` for a given root. Also catches any unhandled errors thrown
  in the `workLoop` such as Promises. Calls `throwException` if error is thrown
  and not handled.

- requestWork

  ```ts
  function requestWork(root: FiberRoot, expirationTime: ExpirationTime): void;
  ```

  `requestWork` is called by the scheduler whenever a root receives an update.
  It's up to the renderer to call renderRoot at some point in the future. This
  method is invoked by `ReactRoot.render` or `setState`.

- deferredUpdates

  ```ts
  function deferredUpdates<A>(fn: () => A): A;
  ```

  The implementation of `ReactDOM.unstable_deferredUpdates`. May call
  `requestWork` depending on what happens in the `deferredUpdates`.

- onSuspend

  ```ts
  function onSuspend(
    root: FiberRoot,
    finishedWork: Fiber,
    suspendedExpirationTime: ExpirationTime,
    rootExpirationTime: ExpirationTime,
    msUntilTimeout: number
  ): void;
  ```

  Schedules a timeout for the suspension as defined by the `Placeholder`.

  TODO: Figure out how the timeout gets canceled

- onTimeout

  ```ts
  function onTimeout(root, finishedWork, suspendedExpirationTime): void;
  ```

  Flushes the root (i.e. eventually calls `performWorkOnRoot`) when the suspense
  timeouts.

- retrysuspendedRoot

  ```ts
  function retrySuspendedRoot(
    root: FiberRoot,
    fiber: Fiber,
    suspendedTime: ExpirationTime
  ): void;
  ```

  Schedules a re-render on the root Fiber and calls `requestWork` to schedule when
  the update will happen.

#### ReactFiberUnwindWork

- throwException

  ```ts
  function throwException(
    root: FiberRoot,
    returnFiber: Fiber,
    sourceFiber: Fiber,
    value: mixed,
    renderExpirationTime: ExpirationTime
  ): void;
  ```

  Handles a thrown error. If the error is a `thenable`, it handles it by:

  1. Finds the Placeholder ancestor with the shortest timeout defined (why?)
  2. (TODO - what does that second loop do?)

  If no Placeholder is found, it converts the thrown error to a new error that
  states that "an update was suspended but no Placeholder UI was found".