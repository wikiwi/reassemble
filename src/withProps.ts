import { Composable } from "./blueprint";
import { Mapper } from "./types";
import mapProps from "./mapProps";
import resolveValue from "./utils/resolveValue";

export function withProps(
  createProps: Object | Mapper<any, any>,
): Composable;

export function withProps<TPropsIn, TPropsOut>(
  createProps: TPropsOut | Mapper<TPropsIn, TPropsOut>,
): Composable;

export function withProps<TPropsIn, TPropsOut>(
  createProps: TPropsOut | Mapper<TPropsIn, TPropsOut>,
): Composable {
  return mapProps((props) => ({
    ...props,
    ...resolveValue<any>(createProps, props),
  }));
}

export default withProps;
