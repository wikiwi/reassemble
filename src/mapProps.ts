/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Composable, propsCallback } from "./blueprint";
import { Mapper } from "./types";

export function mapProps(propsMapper: Mapper<any, any>): Composable;
export function mapProps<TPropsIn, TPropsOut>(propsMapper: Mapper<TPropsIn, TPropsOut>): Composable;
export function mapProps<TPropsIn, TPropsOut>(propsMapper: Mapper<TPropsIn, TPropsOut>): Composable {
  return {
    instanceCallbacks: [
      propsCallback((props) => (propsMapper(props))),
    ],
  };
}

export default mapProps;
