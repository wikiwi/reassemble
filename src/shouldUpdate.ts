import { Composable } from "./blueprint";
import { createComparingLifecycle } from "./lifecycle";
import { PredicateDiff } from "./types";

export function shouldUpdate(callback: PredicateDiff<any>): Composable;
export function shouldUpdate<T>(callback: PredicateDiff<T>): Composable;

export function shouldUpdate<T>(callback: PredicateDiff<T>): Composable {
  return createComparingLifecycle("shouldComponentUpdateCallback", callback);
}

export default shouldUpdate;
