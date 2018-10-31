import { delay } from '../common/delay';

export function getText(value, ms = 5000) {
  if (value == null) {
    throw new Error("`getText` requires a value.");
  }

  if (value === 0) {
    return Promise.resolve(0);
  }

  return delay(ms).then(() => value);
}
