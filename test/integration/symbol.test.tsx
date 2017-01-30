/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import * as React from "react";
import { assert } from "chai";
import { shallow } from "enzyme";

import {
  assemble,
  combine,
  debug,
  defaultProps,
  withProps,
  isolate,
  flattenProp,
  omitProps,
  mapProps,
  renameProp,
  renameProps,
  noOp,
  withHandlers,
  withPropsOnChange,
  withState,
  withReducer,
} from "../../src";

import Component from "../component";

const sym = Symbol();

describe("symbols test", () => {
  it("should keep symbols", () => {
    let value: string;
    const props = {
      [sym]: "foo",
      a: {
        b: 1,
        c: 2,
      },
    };
    const defaults = {
      test1: true,
    };
    const composable = combine(
      withProps(props),
      defaultProps(defaults),
      mapProps((p) => p),
      isolate(noOp),
      flattenProp("a"),
      omitProps("b"),
      renameProp("c", "d"),
      renameProps({ d: "e" }),
      withHandlers({ onFoo: () => () => "bar" }),
      withPropsOnChange(["a"], () => ({ z: "z" })),
      withState("state", "setState", {}),
      withReducer("value", "dispatch", () => ({}), {}),
      debug(({[sym]: val}) => value = val),
    );
    const Assembly = assemble(composable)(Component);
    shallow(<Assembly />);
    assert.strictEqual(value, "foo");
  });
});
