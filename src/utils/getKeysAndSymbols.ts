const {keys, getOwnPropertySymbols} = Object;

export const getKeysAndSymbols = (obj: any) => {
  let result: Array<string | symbol> = keys(obj);
  if (getOwnPropertySymbols !== undefined) {
    result = result.concat(getOwnPropertySymbols(obj));
  }
  return result;
};

export default getKeysAndSymbols;
