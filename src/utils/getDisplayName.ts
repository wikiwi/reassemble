/**
 * @license
 * Taken from https://github.com/acdlite/recompose
 * The MIT License (MIT)
 * Copyright (c) 2015-2016 Andrew Clark
 */

export const getDisplayName = (Component: any) => {
  if (typeof Component === "string") {
    return Component;
  }
  if (!Component) {
    return undefined;
  }
  return Component.displayName || Component.name || "Component";
};

export default getDisplayName;
