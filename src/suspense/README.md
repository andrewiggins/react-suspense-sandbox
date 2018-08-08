# Suspense sandbox

This project contains code used to explore how React Suspense works using as simple as possible
examples. Learnings from exploring how it works are added here.

## Initial thoughts

* Suspense **pauses** the rendering of a subtree. Meaning updates are queued but not applied to that
  subtree until some event has happened (e.g. a promise returns, a timeout is exceeded)

  This feature is intended to mimic the ability of other frameworks (e.g. native iOS, presumably Ember
  had something like this?) to wait to render the next screen until it is ready to avoid unnecessary
  loading states if the date will come back quickly from a fast network, or render quickly on a fast
  devices.

* The ability to pause an update in progress seems hinged on the ability to have separate render/commit
  stages in order to avoid "tearing" (i.e. to avoid paritally applying updates to the DOM) (e.g. only
  rendering part of the page to the DOM).

## To explore

* How does React handle multiple updates queued to the same subtree (e.g. quickly clicking different
  links in a nav that is code-split)
