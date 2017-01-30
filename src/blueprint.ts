/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { ComponentClass } from "react";

import { ReactComponent } from "./types";
import combine from "./combine";
import resolveValue from "./utils/resolveValue";

export type StateUpdater<T> = (newState: T, callback: () => void) => void;

export type StaticCallback = (componentClass: ComponentClass<any>, target: ReactComponent<any> | string) => void;

export type LifeCycleCallbackTypes = {
  componentWillMountCallback?: (props: any, state: any, context: any) => () => void;
  componentDidMountCallback?: (props: any, state: any, context: any) => () => void;
  componentWillUnmountCallback?: (props: any, state: any, context: any) => () => void;
  componentWillReceivePropsCallback?: (props: any, state: any, context: any) => () => void;
  shouldComponentUpdateCallback?: (props: any, state: any, context: any) => () => boolean;
  componentWillUpdateCallback?: (props: any, state: any, context: any) => () => void;
  componentDidUpdateCallback?: (props: any, state: any, context: any) => () => void;
};

export type InstanceCallbackTypes = LifeCycleCallbackTypes & {
  lazyLoadCallback?: (props: any, state: any, context: any) => InstanceCallbackList;
  propsCallback?: (props: any, state: any, context: any) => any;
  childContextCallback?: (childContext: any, props: any, state: any, context: any) => any;
  stateCallback?: (
    initState: (name: string, value: any) => { name: string, updater: StateUpdater<any> },
    props: any, state: any, context: any,
  ) => void;
  skipCallback?: (props: any, state: any, context: any) => number;
};

export type InstanceCallbackEntry<T extends keyof InstanceCallbackTypes> = {
  kind: T,
  callback: InstanceCallbackTypes[T],
};

/*
 * TODO(cvle): Bug: using the typesafe version does not work.
 * Log: Return type of exported function has or is using name 'InstanceCallbackEntry'
 * from external module "./src/blueprint" but cannot be named.
 */
export type InstanceCallbackList =
  Array<InstanceCallbackEntry<any>>;

export type InstanceCallbackListTypesafe =
  Array<InstanceCallbackEntry<"lazyLoadCallback">
  | InstanceCallbackEntry<"propsCallback">
  | InstanceCallbackEntry<"stateCallback">
  | InstanceCallbackEntry<"childContextCallback">
  | InstanceCallbackEntry<"skipCallback">
  | InstanceCallbackEntry<"componentWillMountCallback">
  | InstanceCallbackEntry<"componentDidMountCallback">
  | InstanceCallbackEntry<"componentWillUnmountCallback">
  | InstanceCallbackEntry<"componentWillReceivePropsCallback">
  | InstanceCallbackEntry<"shouldComponentUpdateCallback">
  | InstanceCallbackEntry<"componentWillUpdateCallback">
  | InstanceCallbackEntry<"componentDidUpdateCallback">>;

export type ComponentCallbacks = {
  staticCallback?: StaticCallback;
  instanceCallbacks?: (() => InstanceCallbackList) | InstanceCallbackList;
};

export type Composable = ComponentCallbacks | ComponentCallbacks[];

export type CallbackEntryHelper<T extends keyof InstanceCallbackTypes> =
  (callback: InstanceCallbackTypes[T]) => InstanceCallbackEntry<T>;

export const lazyLoadCallback: CallbackEntryHelper<"lazyLoadCallback"> =
  (callback) => ({ kind: "lazyLoadCallback", callback });

export const propsCallback: CallbackEntryHelper<"propsCallback"> =
  (callback) => ({ kind: "propsCallback", callback });

export const stateCallback: CallbackEntryHelper<"stateCallback"> =
  (callback) => ({ kind: "stateCallback", callback });

export const childContextCallback: CallbackEntryHelper<"childContextCallback"> =
  (callback) => ({ kind: "childContextCallback", callback });

export const skipCallback: CallbackEntryHelper<"skipCallback"> =
  (callback) => ({ kind: "skipCallback", callback });

export const componentWillMountCallback: CallbackEntryHelper<"componentWillMountCallback"> =
  (callback) => ({ kind: "componentWillMountCallback", callback });

export const componentDidMountCallback: CallbackEntryHelper<"componentDidMountCallback"> =
  (callback) => ({ kind: "componentDidMountCallback", callback });

export const componentWillUnmountCallback: CallbackEntryHelper<"componentWillUnmountCallback"> =
  (callback) => ({ kind: "componentWillUnmountCallback", callback });

export const componentWillReceivePropsCallback: CallbackEntryHelper<"componentWillReceivePropsCallback"> =
  (callback) => ({ kind: "componentWillReceivePropsCallback", callback });

export const shouldComponentUpdateCallback: CallbackEntryHelper<"shouldComponentUpdateCallback"> =
  (callback) => ({ kind: "shouldComponentUpdateCallback", callback });

export const componentWillUpdateCallback: CallbackEntryHelper<"componentWillUpdateCallback"> =
  (callback) => ({ kind: "componentWillUpdateCallback", callback });

export const componentDidUpdateCallback: CallbackEntryHelper<"componentDidUpdateCallback"> =
  (callback) => ({ kind: "componentDidUpdateCallback", callback });

export type Blueprint = {
  staticCallbacks?: StaticCallback[];
  instanceCallbacks?: () => InstanceCallbackListTypesafe;
};

export function createBlueprint(...composables: Composable[]): Blueprint {
  const componentCallbacks: ComponentCallbacks[] = combine(...composables) as ComponentCallbacks[];
  return {
    staticCallbacks: componentCallbacks.filter((c) => c.staticCallback).map((c) => c.staticCallback),
    instanceCallbacks: () => {
      const result: InstanceCallbackList = [];
      componentCallbacks.forEach((c) => {
        if (!c.instanceCallbacks) { return; }
        const instanceCallbacks: any = resolveValue(c.instanceCallbacks);
        if (!instanceCallbacks) { return; }
        result.push(...instanceCallbacks);
      });
      return result;
    },
  };
}
