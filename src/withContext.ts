import { Composable, childContextCallback } from "./blueprint";

export function withContext<TOut>(
  childContextTypes: {[key in keyof TOut]: any },
  getChildContext: (props: any) => TOut,
): Composable;

export function withContext<TIn, TOut>(
  childContextTypes: {[key in keyof TOut]: any },
  getChildContext: (props: TIn) => TOut,
): Composable;

export function withContext<TIn, TOut>(
  childContextTypes: {[key in keyof TOut]: any },
  getChildContext: (props: TIn) => TOut,
): Composable {
  return {
    staticCallback: (componentClass) => {
      componentClass.childContextTypes = {
        ...componentClass.childContextTypes,
        ...(childContextTypes as any),
      };
    },
    instanceCallbacks: [
      childContextCallback((childContext, props) => ({
        ...childContext,
        ...getChildContext(props) as any,
      })),
    ],
  };
}

export default withContext;
