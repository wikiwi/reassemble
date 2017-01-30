export function toArray<T>(x: T | T[]): T[] { return Array.isArray(x) ? x : [x]; }

export default toArray;
