/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Composable, propsCallback } from "./blueprint";
import { Mapper } from "./types";
import resolveValue from "./utils/resolveValue";
import getKeysAndSymbols from "./utils/getKeysAndSymbols";

export type EventHandler = Function;
export type AnyHandleCreators = {
  [key: string]: Mapper<any, any>;
};
export type HandleCreators<TPropsIn, TPropsOut> = {
[P in keyof TPropsOut]: Mapper<TPropsIn, TPropsOut[P]>;
};

export function withHandlers(
  handlerCreators: AnyHandleCreators | ((props: any) => AnyHandleCreators),
): Composable;

export function withHandlers<TPropsIn, TPropsOut>(
  handlerCreators: HandleCreators<TPropsIn, TPropsOut> | ((props: TPropsIn) => HandleCreators<TPropsIn, TPropsOut>),
): Composable;

export function withHandlers<TPropsIn, TPropsOut>(
  handlerCreators: HandleCreators<TPropsIn, TPropsOut> | ((props: TPropsIn) => HandleCreators<TPropsIn, TPropsOut>),
): Composable {
  return {
    instanceCallbacks: () => {
      let handlers: any;
      let handlerProps: any;
      return [
        propsCallback((props) => {
          if (!handlers) {
            handlers = {};
            const resolvedHandlers: any = resolveValue(handlerCreators, props);
            getKeysAndSymbols(resolvedHandlers).forEach(
              (name) => handlers[name] = (...args: any[]) => resolvedHandlers[name](handlerProps)(...args),
            );
          }
          handlerProps = props;
          return {
            ...props,
            ...handlers,
          };
        }),
      ];
    },
  };
}

export default withHandlers;
