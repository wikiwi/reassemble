export function resolveValue<T>(valueOrCallback: T | ((...args: any[]) => T), ...args: any[]): T {
  return typeof valueOrCallback === "function"
    ? (valueOrCallback as Function).call(null, ...args)
    : valueOrCallback;
}

export default resolveValue;
