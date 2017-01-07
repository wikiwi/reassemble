/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Composable, propsCallback } from "./blueprint";

export function debug(
  info?: string,
): Composable {
  return {
    instanceCallbacks: [
      propsCallback((props) => {
        info ? console.log(info, props) : console.log(props); /* tslint:disable-line: no-console */
        return props;
      }),
    ],
  };
}

export default debug;
