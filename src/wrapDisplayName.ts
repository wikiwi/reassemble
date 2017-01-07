/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Composable } from "./blueprint";
import getDisplayName from "./utils/getDisplayName";

export function wrapDisplayName(name: string): Composable {
  return {
    classCallback: (componentClass, target) => {
      componentClass["displayName"] = `${name}(${getDisplayName(target)})`;
    },
  };
}

export default wrapDisplayName;
