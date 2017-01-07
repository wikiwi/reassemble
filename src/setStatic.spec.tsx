/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

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
