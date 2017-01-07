/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Composable, ComponentCallbacks } from "./blueprint";

export function combine(...composables: Composable[]): Composable {
  const callbacks: ComponentCallbacks[] = [];
  composables.forEach((composable) => {
    if (Array.isArray(composable)) {
      callbacks.push(...composable);
    } else {
      callbacks.push(composable);
    }
  });
  return callbacks;
}

export default combine;
