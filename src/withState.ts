/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Composable, stateCallback, propsCallback } from "./blueprint";
import { Mapper } from "./types";
import resolveValue from "./utils/resolveValue";

export function withState(
  stateName: string | symbol,
  updaterName: string | symbol,
  initialValue: Object | Mapper<any, any>,
): Composable;

export function withState<TPropsIn, TPropNames extends string | symbol, TPropValue>(
  stateName: TPropNames,
  updaterName: TPropNames,
  initialValue: TPropValue | Mapper<TPropsIn, TPropValue>,
): Composable;

export function withState<TPropsIn, TPropNames extends string | symbol, TPropValue>(
  stateName: TPropNames,
  updaterName: TPropNames,
  initialValue: TPropValue | Mapper<TPropsIn, TPropValue>,
): Composable {
  return {
    instanceCallbacks: () => {
      let update: any;
      let name: any;
      return [
        stateCallback((initState, props) => {
          const newState = initState(String(stateName), resolveValue(initialValue, props));
          update = newState.updater;
          name = newState.name;
        }),
        propsCallback((props, state) => ({
          ...props,
          [stateName as string]: state[name],
          [updaterName as string]: update,
        })),
      ];
    },
  };
}

export default withState;
