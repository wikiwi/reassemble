import { Composable } from "./blueprint";
import mapProps from "./mapProps";
import omit from "./utils/omit";

export function renameProp<TOld extends string | symbol, TNew extends string | symbol>(
  oldName: TOld,
  newName: TNew,
): Composable {
  return mapProps((props) => ({
    ...omit(props, oldName),
    [newName as any]: props[oldName],
  }));
}

export default renameProp;
