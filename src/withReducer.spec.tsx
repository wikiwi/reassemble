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
import withReducer from "./withReducer";
import Component from "../test/component";

const counterReducer = (count: number, action: any) => {
  switch (action.type) {
    case "INCREMENT":
      return count + 1;
    case "DECREMENT":
      return count - 1;
    default:
      return count;
  }
};

describe("withReducer", () => {
  it("should render with props from state", () => {
    const composable = withReducer("counter", "dispatch", counterReducer, 0);
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly />);
    assert.strictEqual(Object.keys(wrapper.props()).length, 2);
    assert.strictEqual(wrapper.props().counter, 0);
    assert.isFunction(wrapper.props().dispatch);
    wrapper.props().dispatch({ type: "INCREMENT" });
    assert.strictEqual(wrapper.props().counter, 1);
    wrapper.props().dispatch({ type: "DECREMENT" });
    assert.strictEqual(wrapper.props().counter, 0);
  });
});
