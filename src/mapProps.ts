import { Composable, propsCallback } from "./blueprint";
import { Mapper } from "./types";

export function mapProps(propsMapper: Mapper<any, any>): Composable;
export function mapProps<TPropsIn, TPropsOut>(propsMapper: Mapper<TPropsIn, TPropsOut>): Composable;
export function mapProps<TPropsIn, TPropsOut>(propsMapper: Mapper<TPropsIn, TPropsOut>): Composable {
  return {
    instanceCallbacks: [
      propsCallback((props) => (propsMapper(props))),
    ],
  };
}

export default mapProps;
