/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

export function resolveValue<T>(valueOrCallback: T | ((...args: any[]) => T), ...args: any[]): T {
  return typeof valueOrCallback === "function"
    ? (valueOrCallback as Function).call(null, ...args)
    : valueOrCallback;
}

export default resolveValue;
