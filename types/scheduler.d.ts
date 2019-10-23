declare module "scheduler" {
  interface CallbackNode {}

  type ImmediatePriority = 1;
  type UserBlockingPriority = 2;
  type NormalPriority = 3;
  type IdlePriority = 4;

  // type Priority = ImmediatePriority | UserBlockingPriority | NormalPriority | IdlePriority;
  type Priority = number;

  export function unstable_now(): number;
  export function unstable_scheduleCallback(priority: Priority, callback: () => void): CallbackNode;
  export function unstable_cancelCallback(callbackNode: CallbackNode): void;
  export function unstable_shouldYield(): boolean;
  export function unstable_runWithPriority<R>(priority: Priority, eventHandler: () => R): R;
  export function unstable_wrapCallback<C extends (...args: any[]) => any>(callback: C): C;
  export function unstable_getCurrentPriorityLevel(): number;

  export const unstable_IdlePriority: number;
  export const unstable_ImmediatePriority: number;
  export const unstable_LowPriority: number;
  export const unstable_NormalPriority: number;
  export const unstable_UserBlockingPriority: number;
  export const unstable_Profiling: number;
}
