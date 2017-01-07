/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Composable } from "./blueprint";
import { Mapper } from "./types";
import mapProps from "./mapProps";
import resolveValue from "./utils/resolveValue";

export function withProps(
  createProps: Object | Mapper<any, any>,
): Composable;

export function withProps<TPropsIn, TPropsOut>(
  createProps: TPropsOut | Mapper<TPropsIn, TPropsOut>,
): Composable;

export function withProps<TPropsIn, TPropsOut>(
  createProps: TPropsOut | Mapper<TPropsIn, TPropsOut>,
): Composable {
  return mapProps((props) => ({
    ...props,
    ...resolveValue<any>(createProps, props),
  }));
}

export default withProps;
