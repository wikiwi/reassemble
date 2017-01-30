import { Composable, ComponentCallbacks } from "./blueprint";

export function combine(...composables: Composable[]): Composable {
  const callbacks: ComponentCallbacks[] = [];
  composables.forEach((composable) => {
    if (Array.isArray(composable)) {
      callbacks.push(...composable);
    } else {
      callbacks.push(composable);
    }
  });
  return callbacks;
}

export default combine;
