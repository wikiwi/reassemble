import { Composable, stateCallback, propsCallback } from "./blueprint";
import { Mapper } from "./types";
import resolveValue from "./utils/resolveValue";

export type Reducer<TState, TAction> = (s: TState, a: TAction) => TState;

export function withReducer(
  stateName: string | symbol,
  dispatcherName: string | symbol,
  reducer: Reducer<any, any>,
  initialValue: Object | Mapper<any, any>,
): Composable;

export function withReducer<TPropsIn, TPropNames extends string | symbol, TPropsValue, TAction>(
  stateName: TPropNames,
  dispatcherName: TPropNames,
  reducer: Reducer<TPropsValue, TAction>,
  initialValue: TPropsValue | Mapper<TPropsIn, TPropsValue>,
): Composable;

export function withReducer<TPropsIn, TPropNames extends string | symbol, TPropsValue, TAction>(
  stateName: TPropNames,
  dispatcherName: TPropNames,
  reducer: Reducer<TPropsValue, TAction>,
  initialValue: TPropsValue | Mapper<TPropsIn, TPropsValue>,
): Composable {
  return {
    instanceCallbacks: () => {
      let update: any;
      let name: any;
      let dispatcher: any;
      let curState: any;
      return [
        stateCallback((initState, props) => {
          const newState = initState(String(stateName), resolveValue(initialValue, props));
          update = newState.updater;
          name = newState.name;
          dispatcher = (action: any, callback: any) => update(reducer(curState, action), callback);
        }),
        propsCallback((props, state) => {
          curState = state[name];
          return {
            ...props,
            [stateName as string]: curState,
            [dispatcherName as string]: dispatcher,
          };
        }),
      ];
    },
  };
}

export default withReducer;
