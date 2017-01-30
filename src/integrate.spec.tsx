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

import { Composable } from "./blueprint";
import assemble from "./assemble";
import isolate from "./isolate";
import integrate from "./integrate";
import withProps from "./withProps";
import Component from "../test/component";

describe("integrate", () => {
  it("should integrate props", () => {
    const composables: Composable[] = [
      withProps({ a: 1, b: 2 }),
      isolate(
        withProps({ b: 3, c: 4 }),
        integrate<any>("b", "c"),
      ),
    ];
    const Assembly = assemble(...composables)(Component);
    const wrapper = shallow(<Assembly />);
    assert.deepEqual(wrapper.props(), { a: 1, b: 3, c: 4 });
  });

  it("should nest", () => {
    const composables: Composable[] = [
      withProps({ a: 1, b: 2 }),
      isolate(
        withProps({ b: 3 }),
        isolate(
          withProps({ a: 2, c: 3 }),
          integrate("a", "c"),
        ),
        integrate("a", "b"),
      ),
    ];
    const Assembly = assemble(...composables)(Component);
    const wrapper = shallow(<Assembly />);
    assert.deepEqual(wrapper.props(), { a: 2, b: 3 });
  });
});
