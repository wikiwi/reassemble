/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import mapProps from "./mapProps";
import omit from "./utils/omit";

export function omitProps<T extends string | symbol>(...propNames: T[]) {
  return mapProps((props) => omit(props, ...propNames));
}

export default omitProps;
