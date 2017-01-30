import * as React from "react";
import { assert } from "chai";
import { shallow } from "enzyme";

import assemble from "./assemble";
import combine from "./combine";
import withReducer from "./withReducer";
import withProps from "./withProps";
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

  it("should work with Symbol", () => {
    const sym = Symbol();
    const composable = combine(
      withReducer(sym, "dispatch", counterReducer, 5),
      withProps((props) => ({ counter: props[sym] })),
    );
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly />);
    assert.strictEqual(wrapper.props().counter, 5);
  });
});
