export function getUniqueKey(name: string, obj: Object) {
  let unique = name;
  let no = 1;
  while (unique in obj) {
    unique = `${name}_${no}`;
    no++;
  }
  return unique;
}

export default getUniqueKey;
