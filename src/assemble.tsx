import * as React from "react";
import { ComponentClass, Component } from "react";

import { ReactComponent, ReactAnyComponent, ComponentEnhancer } from "./types";
import {
  createBlueprint, InstanceCallbackListTypesafe, StateUpdater, LifeCycleCallbackTypes,
  Blueprint, InstanceCallbackEntry, ComponentCallbacks,
} from "./blueprint";
import getDisplayName from "./utils/getDisplayName";
import getUniqueKey from "./utils/getUniqueKey";
import isReferentiallyTransparentFunctionComponent from "./utils/isReferentiallyTransparentFunctionComponent";

type ComponentData = {
  props: any,
  context: any,
  component: ReactAnyComponent,
  childContext?: any,
  lifeCycleCallbacks?: {[P in keyof LifeCycleCallbackTypes]: Function[]} & { [name: string]: Function[] },
};

type StateCallbackEntry = InstanceCallbackEntry<"stateCallback"> & {
  init?: ComponentData,
  called?: boolean,
  startAt?: number,
};

type ComponentWillReceivePropsCallbackkEntry = InstanceCallbackEntry<"componentWillReceivePropsCallback"> & {
  called?: boolean,
};

type PendingDataUpdate = {
  dirty?: boolean,
  init?: ComponentData,
  startAt?: number,
  callbacks?: SetStateCallback[],
};

type SetStateCallback = () => void;

class AssemblyBase<T> extends Component<T, any> {
  private target: ReactComponent<any> | string;
  private isReferentiallyTransparent: boolean;
  private callbackList: InstanceCallbackListTypesafe;
  private computed: ComponentData;
  private pendingDataUpdate: PendingDataUpdate = false;
  private newestProps: any;
  private newestContext: any;
  private newestState: any = {};
  private unmounted = false;

  constructor(
    blueprint: Blueprint,
    target: ReactComponent<any> | string,
    isReferentiallyTransparent: boolean,
    props: any,
    context: any,
  ) {
    super(props, context);
    this.newestProps = props;
    this.newestContext = context;
    this.isReferentiallyTransparent = isReferentiallyTransparent;
    this.target = target;
    this.callbackList = blueprint.instanceCallbacks();
    this.computed = this.runInstanceCallbacks({ props, context, component: this.target });
    this.state = this.newestState;
  }

  public getChildContext() { return this.computed.childContext; }
  public componentWillMount() { return this.runLifeCycleCallbacks("componentWillMountCallback"); }
  public componentDidMount() { return this.runLifeCycleCallbacks("componentDidMountCallback"); }
  public componentWillUnmount() {
    this.unmounted = true;
    return this.runLifeCycleCallbacks("componentWillUnmountCallback");
  }
  public componentWillUpdate() { return this.runLifeCycleCallbacks("componentWillUpdateCallback"); }
  public componentDidUpdate() { return this.runLifeCycleCallbacks("componentDidUpdateCallback"); }
  public componentWillReceiveProps(nextProps: any, nextContext: any) {
    this.newestProps = nextProps;
    this.newestContext = nextContext;
    this.handleDataUpdate({
      props: nextProps,
      context: nextContext,
      component: this.target,
    });
  }

  public shouldComponentUpdate(nextProps: any, nextState: any, nextContext: any) {
    const callbacks = this.computed.lifeCycleCallbacks.shouldComponentUpdateCallback;
    if (callbacks) {
      for (let i = 0; i < callbacks.length; i++) {
        if (!callbacks[i]()) {
          return false;
        }
      }
    }
    return true;
  }

  public render() {
    const {component: Component, props} = this.computed;
    if (!Component) {
      return null;
    }
    if (
      Component === this.target && this.isReferentiallyTransparent ||
      isReferentiallyTransparentFunctionComponent(Component)
    ) {
      return (Component as any)(props);
    }
    return <Component {...props} />;
  }

  private runLifeCycleCallbacks(name: keyof LifeCycleCallbackTypes) {
    const callbacks = this.computed.lifeCycleCallbacks[name];
    if (callbacks) { callbacks.forEach((cb) => cb()); }
  }

  private applyStateDiff(stateDiff: any) {
    this.newestState = { ...this.newestState, ...stateDiff };
  }

  private setStateWithLifeCycle(
    stateDiff: any,
    callback: SetStateCallback,
    init: ComponentData = this.defaultInit,
    startAt: number = 0,
  ) {
    if (this.pendingDataUpdate) {
      // we are in the middle of a data update.
      if (!this.pendingDataUpdate.dirty || startAt < this.pendingDataUpdate.startAt) {
        this.pendingDataUpdate.dirty = true;
        this.pendingDataUpdate.init = init;
        this.pendingDataUpdate.startAt = startAt;
      }
      if (callback) {
        this.pendingDataUpdate.callbacks.push(callback);
      }
      this.applyStateDiff(stateDiff);
    } else {
      // runs callbacks with the new state which will run the `componentWillReceiveProps` lifecycle
      this.handleDataUpdate(init, startAt, stateDiff, callback);
    }
  }

  private get defaultInit(): ComponentData {
    return {
      props: this.newestProps,
      context: this.newestContext,
      component: this.target,
    };
  }

  private handleDataUpdate(
    init: ComponentData = this.defaultInit,
    startAt: number = 0,
    stateDiff: any = {},
    callback: SetStateCallback = null,
  ) {
    const oldState = this.newestState;
    if (stateDiff) {
      this.applyStateDiff(stateDiff);
    }
    this.pendingDataUpdate = { callbacks: callback ? [callback] : [] };
    this.computed = this.runInstanceCallbacks(init, startAt);
    const callbacks = this.pendingDataUpdate.callbacks;
    this.pendingDataUpdate = null;

    if (this.newestState !== oldState) {
      // Component could be unmounted because something during the lifecycle call can
      // cause a parent component to unmount this before it completed its data update.
      if (!this.unmounted) {
        this.setState(this.newestState, () => callbacks.forEach((cb) => cb()));
      }
    }
  }

  private runInstanceCallbacks(init: ComponentData, startAt = 0): ComponentData {
    const interim = { ...init };
    if (!interim.lifeCycleCallbacks) { interim.lifeCycleCallbacks = {}; }
    for (let idx = startAt; idx < this.callbackList.length; idx++) {
      const entry = this.callbackList[idx];
      switch (entry.kind) {
        case "propsCallback":
          interim.props = entry.callback(interim.props, this.newestState, interim.context);
          break;
        case "stateCallback":
          {
            const sc = entry as StateCallbackEntry;
            sc.init = {
              ...interim,
              // Whenever state changes, the previous `shouldComponentUpdate` callbacks becomes irrelevant.
              lifeCycleCallbacks: { ...interim.lifeCycleCallbacks, shouldComponentUpdateCallback: [] },
            };
            sc.startAt = idx;
            if (!sc.called) {
              sc.called = true;
              const initState = (name: string, value: any) => {
                let unique = getUniqueKey(name, this.newestState);
                this.applyStateDiff({ [unique]: value });
                const updater: StateUpdater<any> = (val, callback) => {
                  this.setStateWithLifeCycle({ [unique]: val }, callback, sc.init, sc.startAt);
                };
                return { name: unique, updater };
              };
              entry.callback(initState, interim.props, this.newestState, interim.context);
            }
          }
          break;
        case "childContextCallback":
          interim.childContext = entry.callback(interim.childContext, interim.props, this.newestState, interim.context);
          break;
        case "skipCallback":
          idx += entry.callback(interim.props, this.newestState, interim.context);
          break;
        case "renderCallback":
          interim.component = entry.callback(interim.component, interim.props, this.newestState, interim.context);
          break;
        case "lazyLoadCallback":
          const list = entry.callback(interim.props, this.newestState, interim.context);
          if (list && list.length > 0) {
            this.callbackList = [...this.callbackList.slice(0, idx + 1), ...list, ...this.callbackList.slice(idx + 1)];
          }
          break;
        case "componentWillReceivePropsCallback":
          {
            const cc = entry as ComponentWillReceivePropsCallbackkEntry;
            const callback = entry.callback(interim.props, this.newestState, interim.context);
            if (cc.called && this.pendingDataUpdate) {
              // Props changed so we need to run this lifecycle.
              callback();
              if (this.pendingDataUpdate.dirty) {
                // State changed during lifecycle, so we need to recalculated from an earlier position.
                this.pendingDataUpdate.dirty = false;
                return this.runInstanceCallbacks(this.pendingDataUpdate.init, this.pendingDataUpdate.startAt);
              }
            } else {
              cc.called = true;
            }
          }
          break;
        case "componentWillMountCallback":
        case "componentDidMountCallback":
        case "componentWillUnmountCallback":
        case "shouldComponentUpdateCallback":
        case "componentWillUpdateCallback":
        case "componentDidUpdateCallback":
          {
            const hasCallbacks = interim.lifeCycleCallbacks[entry.kind] !== undefined;
            const callback = entry.callback(interim.props, this.newestState, interim.context);
            interim.lifeCycleCallbacks = {
              ...interim.lifeCycleCallbacks,
              [entry.kind]: hasCallbacks
                ? [...interim.lifeCycleCallbacks[entry.kind], callback]
                : [callback],
            };
          }
          break;
        default:
          throw new Error(`Unknown callback entry '${(entry as any).kind}'`);
      }
    }
    return interim;
  }
}

export function assemble(...callbacks: ComponentCallbacks[]): ComponentEnhancer<any, any>;
export function assemble<TInner, TOuter>(...callbacks: ComponentCallbacks[]): ComponentEnhancer<TInner, TOuter>;
export function assemble<TInner, TOuter>(...callbacks: ComponentCallbacks[]): ComponentEnhancer<TInner, TOuter> {
  const blueprint = createBlueprint(...callbacks);
  return (target: ReactComponent<TInner>) => {
    const isReferentiallyTransparent = isReferentiallyTransparentFunctionComponent(target);
    const targetName = getDisplayName(target);
    const assembled: ComponentClass<TOuter> = class extends AssemblyBase<TOuter> {
      public static displayName = isReferentiallyTransparent
        ? targetName
        : `Assembled(${targetName})`;

      constructor(props: any, context: any) {
        super(blueprint, target, isReferentiallyTransparent, props, context);
      }
    };
    blueprint.staticCallbacks.forEach((cb) => cb(assembled, target));
    return assembled;
  };
}

export default assemble;
