/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import mapProps from "./mapProps";
import omit from "./utils/omit";
import pick from "./utils/pick";
import mapKeys from "./utils/mapKeys";

export function renameProps<TKeysIn extends string, TKeysOut extends string>(
  nameMap: {[P in TKeysIn]?: TKeysOut},
) {
  return mapProps((props) => ({
    ...omit(props, ...Object.keys(nameMap)),
    ...mapKeys(
      pick(props, ...Object.keys(nameMap)),
      (oldName) => nameMap[oldName],
    ),
  }));
}

export default renameProps;
