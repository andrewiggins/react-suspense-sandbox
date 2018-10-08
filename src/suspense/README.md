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
  paritally applying updates to the DOM).

- `expirationTime` is the core concept React uses to model priorities (I think).
  An update with a sooner expiration time has a higher priority than one with a
  later expiration time.

## To explore

- TODO: Add example of two sibling trees that suspend together and complete at
  different times (e.g. `<div><AsyncText ms={1000}/><AsyncText
  ms={2000}/></div>`).

  Understand how React handles these different suspension times

- TODO: Add section on min requirements for suspense:
    - Core suspense requirements
      - Fragments (Placeholder is one)
      - Error boundaries (to catch promises)
      - Define Placeholder component
      - Algorithm to find nearest Placeholder component
      - Ability to continue rendering siblings of suspended subtrees in the same
        diff (so multiple siblings can trigger their async operations in the
        same suspend)
      - Separate render and commit phases in order to not apply effects to the
        DOM until we know some subtree won't suspend. (So that Placeholders can
        render a loading over the entire tree, and avoid tearing when rendering
        loading)
    - Sync suspense requirements
      - Immediately render Placeholder's fallack prop when suspended
    - Async-like suspense requirements
      - Delay rendering Placholder's fallback prop by delayMs prop
      - An update queue to track calls to `setState` (or other rerender
        triggers) while a subtree is asnyc suspended... Is this really required?

- TODO: How does React handle multiple updates queued to the same subtree (e.g.
  quickly clicking different links in a nav that is code-split). Might be
  related to the `updateQueue` defined in `ReactUpdateQueue.js`.

  Also, what happens to the previous suspended update and timeout? Does it get
  canceled?

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
  `renderRoot`. May cancel any timeouts scheduled in `onSuspend`.

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
  method is invoked by `ReactRoot.render` and `setState`.

- deferredUpdates

  ```ts
  function deferredUpdates<A>(fn: () => A): A;
  ```

  The implementation of `ReactDOM.unstable_deferredUpdates`. Schedules async
  work. May call `requestWork` depending on what happens in the
  `deferredUpdates`.

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

  Schedules a timeout for the suspension as defined by the `Placeholder`. The
  timeout can be cancelled in `performWorkOnRoot`.

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

  Schedules a re-render on the root Fiber and calls `requestWork` to schedule
  when the update will happen.

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

  If the error is a `thenable` and no Placeholder is found, it converts the
  thrown error to a new error that states that "an update was suspended but no
  Placeholder UI was found".
