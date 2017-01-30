import { Composable } from "./blueprint";
import { createSimpleLifecycle } from "./lifecycle";

export function onDidMount(callback: (props: any) => void): Composable;
export function onDidMount<T>(callback: (props: T) => void): Composable;

export function onDidMount<T>(callback: (props: T) => void): Composable {
  return createSimpleLifecycle("componentDidMountCallback", callback);
}

export default onDidMount;
