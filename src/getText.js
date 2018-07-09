function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  export function getText(value, ms = 5000) {
    if (value == null) {
      throw new Error('getText requires a value');
    }
  
    return delay(ms).then(() => value);
  }
  