import { Composable } from "./blueprint";
import getDisplayName from "./utils/getDisplayName";

export function wrapDisplayName(name: string): Composable {
  return {
    staticCallback: (componentClass, target) => {
      componentClass["displayName"] = `${name}(${getDisplayName(target)})`;
    },
  };
}

export default wrapDisplayName;
