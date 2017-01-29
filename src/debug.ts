/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Composable, propsCallback } from "./blueprint";

export function debug<T>(
  callback: (props: T) => void = console.log,
): Composable {
  return {
    instanceCallbacks: [
      propsCallback((props) => {
        callback(props);
        return props;
      }),
    ],
  };
}

export default debug;
