import { assert } from "chai";

import assemble from "./assemble";
import setStatic from "./setStatic";
import Component from "../test/component";

describe("setStatic", () => {
  it("should set static variable", () => {
    const composable = setStatic("displayName", "foo");
    const Assembly = assemble(composable)(Component);
    assert.strictEqual(Assembly.displayName, "foo");
  });
});
