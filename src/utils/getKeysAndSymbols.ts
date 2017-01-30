/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

const {keys, getOwnPropertySymbols} = Object;

export const getKeysAndSymbols = (obj: any) => {
  let result: Array<string | symbol> = keys(obj);
  if (getOwnPropertySymbols !== undefined) {
    result = result.concat(getOwnPropertySymbols(obj));
  }
  return result;
};

export default getKeysAndSymbols;
