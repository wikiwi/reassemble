import { Composable } from "./blueprint";
import { createComparingLifecycle } from "./lifecycle";

export function onWillReceiveProps(callback: (prevProps: any, nextProps: any) => void): Composable;
export function onWillReceiveProps<T>(callback: (prevProps: T, nextProps: T) => void): Composable;

export function onWillReceiveProps<T>(callback: (prevProps: T, nextProps: T) => void): Composable {
  return createComparingLifecycle("componentWillReceivePropsCallback", callback);
}

export default onWillReceiveProps;
