function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getText(value, ms = 5000) {
  if (value == null) {
    throw new Error("`getText` requires a value.");
  }

  if (value === 0) {
    return Promise.resolve(0);
  }

  return delay(ms).then(() => value);
}
