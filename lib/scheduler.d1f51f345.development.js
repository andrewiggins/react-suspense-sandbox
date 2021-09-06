/**
 * @license React
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable max-len */

'use strict';

import * as React from 'react';

export function unstable_now() {
  return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_now.apply(
    this,
    arguments
  );
}

export function unstable_scheduleCallback() {
  return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_scheduleCallback.apply(
    this,
    arguments
  );
}

export function unstable_cancelCallback() {
  return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_cancelCallback.apply(
    this,
    arguments
  );
}

export function unstable_shouldYield() {
  return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_shouldYield.apply(
    this,
    arguments
  );
}

export function unstable_requestPaint() {
  return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_requestPaint.apply(
    this,
    arguments
  );
}

export function unstable_runWithPriority() {
  return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_runWithPriority.apply(
    this,
    arguments
  );
}

export function unstable_next() {
  return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_next.apply(
    this,
    arguments
  );
}

export function unstable_wrapCallback() {
  return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_wrapCallback.apply(
    this,
    arguments
  );
}

export function unstable_getCurrentPriorityLevel() {
  return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_getCurrentPriorityLevel.apply(
    this,
    arguments
  );
}

export function unstable_getFirstCallbackNode() {
  return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_getFirstCallbackNode.apply(
    this,
    arguments
  );
}

export function unstable_pauseExecution() {
  return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_pauseExecution.apply(
    this,
    arguments
  );
}

export function unstable_continueExecution() {
  return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_continueExecution.apply(
    this,
    arguments
  );
}

export function unstable_forceFrameRate() {
  return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler.unstable_forceFrameRate.apply(
    this,
    arguments
  );
}

export const unstable_IdlePriority =
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler
    .unstable_IdlePriority;

export const unstable_ImmediatePriority =
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler
    .unstable_ImmediatePriority;

export const unstable_LowPriority =
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler
    .unstable_LowPriority;

export const unstable_NormalPriority =
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler
    .unstable_NormalPriority;

export const unstable_UserBlockingPriority =
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler
    .unstable_UserBlockingPriority;

export const unstable_Profiling =
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler
    .unstable_Profiling;
