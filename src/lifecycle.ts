import { Composable, LifeCycleCallbackTypes, propsCallback } from "./blueprint";
import { PredicateDiff } from "./types";

export type PropsCallback<T> = (props: T) => void;
export type NextPropsCallback<T> = (prevProps: T, nextProps: T) => void;

const createSimple = (kind: keyof LifeCycleCallbackTypes, callback: PropsCallback<any>) =>
  ({ instanceCallbacks: [{ kind, callback: (props: any) => () => callback(props) }] }) as Composable;

const createComparing = (kind: keyof LifeCycleCallbackTypes, callback: (prev: any, next: any) => any) =>
  ({
    instanceCallbacks: () => {
      let prevProps: any;
      return [
        propsCallback((props: any) => {
          if (prevProps === undefined) {
            prevProps = props;
          }
          return props;
        }),
        {
          kind, callback: (props: any) => () => {
            const prevPropsTmp = prevProps;
            prevProps = props;
            const result = callback(prevPropsTmp, props);
            return result;
          },
        },
      ];
    },
  }) as Composable;

export function onWillMount<T>(callback: PropsCallback<T>): Composable {
  return createSimple("componentWillMountCallback", callback);
}

export function onDidMount<T>(callback: PropsCallback<T>): Composable {
  return createSimple("componentDidMountCallback", callback);
}

export function onWillUnmount<T>(callback: PropsCallback<T>): Composable {
  return createSimple("componentWillUnmountCallback", callback);
}

export function onWillReceiveProps<T>(callback: NextPropsCallback<T>): Composable {
  return createComparing("componentWillReceivePropsCallback", callback);
}

export function onWillUpdate<T>(callback: NextPropsCallback<T>): Composable {
  return createComparing("componentWillUpdateCallback", callback);
}

export function onDidUpdate<T>(callback: NextPropsCallback<T>): Composable {
  return createComparing("componentDidUpdateCallback", callback);
}

export function shouldUpdate<T>(callback: PredicateDiff<T>): Composable {
  return createComparing("shouldComponentUpdateCallback", callback);
}
