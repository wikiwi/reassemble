import { Composable } from "./blueprint";
import { createComparingLifecycle } from "./lifecycle";

export function onDidUpdate(callback: (prevProps: any, nextProps: any) => void): Composable;
export function onDidUpdate<T>(callback: (prevProps: T, nextProps: T) => void): Composable;

export function onDidUpdate<T>(callback: (prevProps: T, nextProps: T) => void): Composable {
  return createComparingLifecycle("componentDidUpdateCallback", callback);
}

export default onDidUpdate;
