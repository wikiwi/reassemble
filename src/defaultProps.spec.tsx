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
import defaultProps from "./defaultProps";
import Component from "../test/component";

describe("defaultProps", () => {
  it("should render with default props", () => {
    const defaults = {
      test1: true,
      test2: false,
      test3: 5,
    };
    const input = {
      test1: false,
      test3: 7,
    };
    const output = {
      test1: false,
      test2: false,
      test3: 7,
    };
    const composable = defaultProps(defaults);
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly {...input} />);
    assert.deepEqual(wrapper.props(), output);
  });
});
