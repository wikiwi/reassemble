/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

export function toArray<T>(x: T | T[]): T[] { return Array.isArray(x) ? x : [x]; }

export default toArray;
