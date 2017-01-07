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

import assemble from "./assemble";
import omitProps from "./omitProps";
import Component from "../test/component";

describe("omitProps", () => {
  it("should render without specified props", () => {
    const input = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    };
    const output = {
      a: 1,
      d: 4,
    };
    const composable = omitProps<keyof typeof input>("b", "c");
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly {...input} />);
    assert.deepEqual(wrapper.props(), output);
  });
});
