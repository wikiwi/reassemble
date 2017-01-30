import { Composable } from "./blueprint";
import { createSimpleLifecycle } from "./lifecycle";

export function onWillUnmount(callback: (props: any) => void): Composable;
export function onWillUnmount<T>(callback: (props: T) => void): Composable;

export function onWillUnmount<T>(callback: (props: T) => void): Composable {
  return createSimpleLifecycle("componentWillUnmountCallback", callback);
}

export default onWillUnmount;
