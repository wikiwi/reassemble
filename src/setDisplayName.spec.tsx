import { assert } from "chai";

import assemble from "./assemble";
import setDisplayName from "./setDisplayName";
import Component from "../test/component";

describe("setDisplayName", () => {
  it("should render with default props", () => {
    const composable = setDisplayName("foo");
    const Assembly = assemble(composable)(Component);
    assert.strictEqual(Assembly.displayName, "foo");
  });
});
