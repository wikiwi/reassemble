export function mapKeys(obj: any, func: (key: any, val: any) => any): any {
  return Object.keys(obj).reduce((result: any, key) => {
    const val = obj[key];
    result[func(key, val)] = val;
    return result;
  }, {});
}

export default mapKeys;
