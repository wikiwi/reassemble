/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Composable, propsCallback } from "./blueprint";
import pick from "./utils/pick";

export function integrate<T extends string>(...propNames: T[]): Composable {
  return {
    instanceCallbacks: [
      propsCallback((props) => {
        return {
          ...props,
          __isolation: [
            ...props.__isolation.slice(0, props.__isolation.length - 2),
            {
              ...props.__isolation[props.__isolation.length - 1],
              ...pick(props, ...propNames as any),
            },
          ],
        };
      }),
    ],
  };
}

export default integrate;
