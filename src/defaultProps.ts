import mapProps from "./mapProps";
import getKeysAndSymbols from "./utils/getKeysAndSymbols";

export function defaultProps<T>(defaults: T) {
  return mapProps((props) => ({
    ...getKeysAndSymbols(defaults).reduce(
      (nextProps, key) => {
        if (nextProps[key] === undefined) {
          nextProps[key] = (defaults as any)[key];
        }
        return nextProps;
      },
      { ...props },
    ),
  }));
}

export default defaultProps;
