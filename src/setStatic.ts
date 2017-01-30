/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Composable } from "./blueprint";

export function setStatic<K, V>(key: K, value: V): Composable {
  return {
    staticCallback: (componentClass: any) => {
      componentClass[key] = value;
    },
  };
}

export default setStatic;
