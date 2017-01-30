import { Composable, propsCallback } from "./blueprint";
import pick from "./utils/pick";

export function integrate<T extends string | symbol>(...propNames: T[]): Composable {
  return {
    instanceCallbacks: [
      propsCallback((props) => {
        return {
          ...props,
          __isolation: [
            ...props.__isolation.slice(0, props.__isolation.length - 2),
            {
              ...props.__isolation[props.__isolation.length - 1],
              ...pick(props, ...propNames as any),
            },
          ],
        };
      }),
    ],
  };
}

export default integrate;
