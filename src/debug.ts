import { Composable, propsCallback } from "./blueprint";

export function debug<T>(
  callback: (props: T) => void = console.log,
): Composable {
  return {
    instanceCallbacks: [
      propsCallback((props) => {
        callback(props);
        return props;
      }),
    ],
  };
}

export default debug;
