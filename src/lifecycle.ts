import { Composable, LifeCycleCallbackTypes, propsCallback } from "./blueprint";

export const createSimpleLifecycle = (kind: keyof LifeCycleCallbackTypes, callback: (props: any) => void) =>
  ({ instanceCallbacks: [{ kind, callback: (props: any) => () => callback(props) }] }) as Composable;

export const createComparingLifecycle = (kind: keyof LifeCycleCallbackTypes, callback: (prev: any, next: any) => any) =>
  ({
    instanceCallbacks: () => {
      let prevProps: any;
      return [
        propsCallback((props: any) => {
          if (prevProps === undefined) {
            prevProps = props;
          }
          return props;
        }),
        {
          kind, callback: (props: any) => () => {
            const prevPropsTmp = prevProps;
            prevProps = props;
            const result = callback(prevPropsTmp, props);
            return result;
          },
        },
      ];
    },
  }) as Composable;
