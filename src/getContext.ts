/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Composable, propsCallback } from "./blueprint";
import pick from "./utils/pick";

export function getContext<T>(
  contextTypes: T,
): Composable {
  return {
    classCallback: (componentClass) => {
      componentClass.contextTypes = {
        ...componentClass.contextTypes,
        ...(contextTypes as any),
      };
    },
    instanceCallbacks: [
      propsCallback((props, _, context) => ({
        ...props,
        ...pick(context, ...Object.keys(contextTypes)),
      })),
    ],
  };
}

export default getContext;
