/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

export function omit<T, U extends keyof T>(obj: T, ...keys: U[]): any;
export function omit<T>(obj: T, ...keys: Array<string | symbol>): any;

export function omit(obj: any, ...keys: Array<string | symbol>): any {
  const result: any = { ...(obj as any) };
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (obj.hasOwnProperty(key)) {
      delete result[key];
    }
  }
  return result;
};

export default omit;
