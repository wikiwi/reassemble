/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { assert } from "chai";

import assemble from "./assemble";
import wrapDisplayName from "./wrapDisplayName";
import Component from "../test/component";

describe("wrapDisplayName", () => {
  it("should render with default props", () => {
    const composable = wrapDisplayName("Foo");
    const Assembly = assemble(composable)(Component);
    assert.strictEqual(Assembly.displayName, "Foo(Component)");
  });
});
