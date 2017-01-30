import { Composable, propsCallback } from "./blueprint";
import pick from "./utils/pick";

export function getContext<T>(
  contextTypes: T,
): Composable {
  return {
    staticCallback: (componentClass) => {
      componentClass.contextTypes = {
        ...componentClass.contextTypes,
        ...(contextTypes as any),
      };
    },
    instanceCallbacks: [
      propsCallback((props, _, context) => ({
        ...props,
        ...pick(context, ...Object.keys(contextTypes)),
      })),
    ],
  };
}

export default getContext;
