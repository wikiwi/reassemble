/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import setStatic from "./setStatic";

export const setDisplayName = (name: string) => setStatic("displayName", name);

export default setDisplayName;
