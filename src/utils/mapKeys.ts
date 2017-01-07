/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

export function mapKeys(obj: any, func: (key: any, val: any) => any): any {
  return Object.keys(obj).reduce((result: any, key) => {
    const val = obj[key];
    result[func(key, val)] = val;
    return result;
  }, {});
}

export default mapKeys;
