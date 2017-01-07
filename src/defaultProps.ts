/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import mapProps from "./mapProps";

export function defaultProps<T>(defaults: T) {
  return mapProps((props) => ({
    ...Object.keys(defaults).reduce(
      (nextProps, key) => {
        if (nextProps[key] === undefined) {
          nextProps[key] = (defaults as any)[key];
        }
        return nextProps;
      },
      { ...props },
    ),
  }));
}

export default defaultProps;
