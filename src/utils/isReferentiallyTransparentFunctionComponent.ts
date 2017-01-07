/**
 * @license
 * Taken from https://github.com/acdlite/recompose
 * The MIT License (MIT)
 * Copyright (c) 2015-2016 Andrew Clark
 */

import isClassComponent from "./isClassComponent";

export const isReferentiallyTransparentFunctionComponent = (Component: any) => Boolean(
  typeof Component === "function" &&
  !isClassComponent(Component) &&
  !Component.defaultProps &&
  !Component.contextTypes &&
  (process.env.NODE_ENV === "production" || !Component.propTypes),
);

export default isReferentiallyTransparentFunctionComponent;
