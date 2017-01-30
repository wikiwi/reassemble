import setStatic from "./setStatic";

export function setPropTypes<T>(propTypes: T) {
  return setStatic("propTypes", propTypes);
}

export default setPropTypes;
