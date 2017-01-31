import { Composable, renderCallback } from "./blueprint";
import { ReactAnyComponent } from "./types";

export function renderComponent(component: ReactAnyComponent): Composable {
  return {
    instanceCallbacks: [
      renderCallback(() => component),
    ],
  };
}

export default renderComponent;
