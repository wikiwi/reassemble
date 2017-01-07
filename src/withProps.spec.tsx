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
import withProps from "./withProps";
import Component from "../test/component";

describe("withProps", () => {
  it("should render with static props", () => {
    const props = {
      test1: true,
      test2: true,
    };
    const composable = withProps(props);
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly />);
    assert.deepEqual(wrapper.props(), props);
  });

  it("should render with dynamic props", () => {
    const props = ({in1, in2}: { in1: number, in2: number }) => ({
      test1: in1,
      test2: in2,
      test3: 3,
    });
    const input = {
      in1: 1,
      in2: 2,
    };
    const output = { ...input, ...props(input) };

    const composable = withProps(props);
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly {...input} />);
    assert.deepEqual(wrapper.props(), output);
  });
});
