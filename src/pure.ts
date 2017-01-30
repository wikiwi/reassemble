import shouldUpdate from "./shouldUpdate";
import shallowEqual from "./utils/shallowEqual";

export const pure = shouldUpdate((prev, next) => !shallowEqual(prev, next));

export default pure;
