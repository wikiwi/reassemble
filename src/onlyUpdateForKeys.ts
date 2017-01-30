import { Composable } from "./blueprint";
import shouldUpdate from "./shouldUpdate";
import shallowEqual from "./utils/shallowEqual";
import pick from "./utils/pick";

export function onlyUpdateForKeys<T extends string>(propKeys: Array<T | symbol>): Composable {
  return shouldUpdate((prev, next) => !shallowEqual(pick(prev, ...propKeys), pick(next, ...propKeys)));
}

export default onlyUpdateForKeys;
