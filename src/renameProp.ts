/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Composable } from "./blueprint";
import mapProps from "./mapProps";
import omit from "./utils/omit";

export function renameProp<TOld extends string, TNew extends string>(
  oldName: TOld,
  newName: TNew,
): Composable {
  return mapProps((props) => ({
    ...omit(props, oldName),
    [newName as any]: props[oldName],
  }));
}

export default renameProp;
