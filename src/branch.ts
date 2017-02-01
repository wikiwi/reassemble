/* tslint:disable: no-bitwise */

import { Composable, ComponentCallbacks, InstanceCallbackList, lazyLoadCallback, skipCallback } from "./blueprint";
import { Predicate } from "./types";
import resolveValue from "./utils/resolveValue";
import toArray from "./utils/toArray";

const resolveCallbacks = (list: ComponentCallbacks[]) => list.reduce<InstanceCallbackList>(
  (result, c) => {
    result.push(...resolveValue(c.instanceCallbacks));
    return result;
  }, []);

export function branch(
  test: Predicate<any>,
  left: Composable,
  right?: Composable,
): Composable;

export function branch<T>(
  test: Predicate<T>,
  left: Composable,
  right?: Composable,
): Composable;

export function branch<T>(
  test: Predicate<T>,
  left: Composable,
  right: Composable = [],
): Composable {
  const leftList = toArray(left);
  const rightList = toArray(right);
  return {
    instanceCallbacks: () => {
      const loaded = { left: false, right: false };
      let isTrue: boolean;
      return [
        lazyLoadCallback((props) => {
          isTrue = test(props);
          if (!loaded.left && isTrue) {
            loaded.left = true;
            const newCallbacks = resolveCallbacks(leftList);
            newCallbacks.unshift(
              skipCallback(() => isTrue ? 0 : newCallbacks.length),
            );
            return newCallbacks;
          }
          if (!loaded.right && !isTrue) {
            loaded.right = true;
            const newCallbacks = resolveCallbacks(rightList);
            newCallbacks.unshift(
              skipCallback(() => isTrue ? newCallbacks.length : 0),
            );
            return newCallbacks;
          }
          return null;
        }),
      ];
    },
  };
}

export default branch;
