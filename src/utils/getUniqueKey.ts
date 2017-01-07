/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

export function getUniqueKey(name: string, obj: Object) {
  let unique = name;
  let no = 1;
  while (unique in obj) {
    unique = `${name}_${no}`;
  }
  return unique;
}

export default getUniqueKey;
