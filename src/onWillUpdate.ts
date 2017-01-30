import { Composable } from "./blueprint";
import { createComparingLifecycle } from "./lifecycle";

export function onWillUpdate(callback: (prevProps: any, nextProps: any) => void): Composable;
export function onWillUpdate<T>(callback: (prevProps: T, nextProps: T) => void): Composable;

export function onWillUpdate<T>(callback: (prevProps: T, nextProps: T) => void): Composable {
  return createComparingLifecycle("componentWillUpdateCallback", callback);
}

export default onWillUpdate;
