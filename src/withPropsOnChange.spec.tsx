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
import withPropsOnChange from "./withPropsOnChange";
import Component from "../test/component";

describe("withPropsOnChange", () => {
  it("should render with dynamic props", () => {
    const props = ({in1, in2}: { in1: number, in2: number }) => ({
      test1: in1 + (in2 ? in2 : 0),
    });
    const composable = withPropsOnChange(["in1"], props);
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly in1={3} />);
    assert.deepEqual(wrapper.props(), { in1: 3, test1: 3 });
    wrapper.setProps({ in2: 3 });
    assert.deepEqual(wrapper.props(), { in1: 3, test1: 3, in2: 3 });
    wrapper.setProps({ in1: 2 });
    assert.deepEqual(wrapper.props(), { in1: 2, test1: 5, in2: 3 });
  });
});
