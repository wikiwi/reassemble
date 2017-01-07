/**
 * @license
 * Taken from https://github.com/acdlite/recompose
 * The MIT License (MIT)
 * Copyright (c) 2015-2016 Andrew Clark
 */

export const isClassComponent = (Component: any) => Boolean(
  Component &&
  Component.prototype &&
  typeof Component.prototype.isReactComponent === "object",
);

export default isClassComponent;
