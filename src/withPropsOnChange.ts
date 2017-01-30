import { Composable, propsCallback } from "./blueprint";
import { PredicateDiff, Mapper } from "./types";
import pick from "./utils/pick";
import shallowEqual from "./utils/shallowEqual";

export function withPropsOnChange(
  shouldMapOrKeys: string[] | PredicateDiff<any>,
  propsMapper: Mapper<any, any>,
): Composable;

export function withPropsOnChange<TPropsIn, TPropsOut>(
  shouldMapOrKeys: Array<keyof TPropsIn> | PredicateDiff<TPropsIn>,
  propsMapper: Mapper<TPropsIn, TPropsOut>,
): Composable;

export function withPropsOnChange<TPropsIn, TPropsOut>(
  shouldMapOrKeys: Array<keyof TPropsIn> | PredicateDiff<TPropsIn>,
  propsMapper: Mapper<TPropsIn, TPropsOut>,
): Composable {
  const shouldMap = typeof shouldMapOrKeys === "function"
    ? shouldMapOrKeys
    : (props: TPropsIn, nextProps: TPropsIn) => !shallowEqual(
      pick(props, ...shouldMapOrKeys),
      pick(nextProps, ...shouldMapOrKeys),
    );
  return {
    instanceCallbacks: () => {
      let previousProps: any;
      let computedProps: any;
      return [
        propsCallback((props) => {
          if (previousProps === undefined || shouldMap(previousProps, props)) {
            computedProps = propsMapper(props);
          }
          previousProps = props;
          return { ...props, ...computedProps };
        }),
      ];
    },
  };
}

export default withPropsOnChange;
