import mapProps from "./mapProps";

export function flattenProp<T extends string | symbol>(propName: T) {
  return mapProps((props) => ({
    ...props,
    ...props[propName],
  }));
}

export default flattenProp;
