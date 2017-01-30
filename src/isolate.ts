import { Composable, propsCallback } from "./blueprint";
import combine from "./combine";

export function isolate(...composables: Composable[]): Composable {
  const begin: Composable = {
    instanceCallbacks: [
      propsCallback((props) => {
        return {
          ...props,
          __isolation: props.__isolation
            ? [...props.__isolation, props]
            : [props],
        };
      }),
    ],
  };
  const end: Composable = {
    instanceCallbacks: [
      propsCallback((props) => props.__isolation[props.__isolation.length - 1]),
    ],
  };
  return combine(begin, ...composables, end);
}

export default isolate;
