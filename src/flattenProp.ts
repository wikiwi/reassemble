/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import mapProps from "./mapProps";

export function flattenProp<T extends string>(propName: T) {
  return mapProps((props) => ({
    ...props,
    ...props[propName],
  }));
}

export default flattenProp;
