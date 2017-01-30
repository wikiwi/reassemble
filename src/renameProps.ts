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
import pick from "./utils/pick";
import mapKeys from "./utils/mapKeys";
import getKeysAndSymbols from "./utils/getKeysAndSymbols";

export function renameProps<TKeysIn extends string, TKeysOut extends string>(
  nameMap: {[P in TKeysIn]?: TKeysOut},
): Composable;

export function renameProps(
  nameMap: { [key: string]: string | symbol },
): Composable;

export function renameProps<TKeysIn extends string, TKeysOut extends string>(
  nameMap: {[P in TKeysIn]?: TKeysOut},
) {
  const keysAndSymbols = getKeysAndSymbols(nameMap);
  return mapProps((props) => ({
    ...omit(props, ...keysAndSymbols),
    ...mapKeys(
      pick(props, ...keysAndSymbols),
      (oldName) => nameMap[oldName],
    ),
  }));
}

export default renameProps;
