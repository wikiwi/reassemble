import { Composable } from "./blueprint";

export function setStatic<K, V>(key: K, value: V): Composable {
  return {
    staticCallback: (componentClass: any) => {
      componentClass[key] = value;
    },
  };
}

export default setStatic;
