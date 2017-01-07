/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

export function omit<T, U extends keyof T>(obj: T, ...keys: U[]): any {
  const result: any = {};
  for (let i = 0, list = Object.keys(obj); i < list.length; i++) {
    const key = list[i];
    if (keys.indexOf(key as any) < 0 && obj.hasOwnProperty(key)) {
      result[key] = (obj as any)[key];
    }
  }
  return result;
};

export default omit;
