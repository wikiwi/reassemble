import { Composable } from "./blueprint";
import { createSimpleLifecycle } from "./lifecycle";

export function onWillMount(callback: (props: any) => void): Composable;
export function onWillMount<T>(callback: (props: T) => void): Composable;

export function onWillMount<T>(callback: (props: T) => void): Composable {
  return createSimpleLifecycle("componentWillMountCallback", callback);
}

export default onWillMount;
