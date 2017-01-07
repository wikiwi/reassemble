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
import combine from "./combine";
import withState from "./withState";
import withProps from "./withProps";
import Component from "../test/component";

describe("withState", () => {
  it("should render with props from state", () => {
    const composable = withState("counter", "setCounter", 0);
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly />);
    assert.strictEqual(Object.keys(wrapper.props()).length, 2);
    assert.strictEqual(wrapper.props().counter, 0);
    assert.isFunction(wrapper.props().setCounter);
    wrapper.props().setCounter(10);
    assert.strictEqual(wrapper.props().counter, 10);
  });

  describe("with initial value from component props", () => {
    it("should render with props from state", () => {
      const composable = withState("counter", "setCounter", ({initValue}: any) => initValue);
      const Assembly = assemble(composable)(Component);
      const wrapper = shallow(<Assembly initValue={5} />);
      assert.strictEqual(wrapper.props().counter, 5);
    });
  });

  describe("with initial value from intermediate props", () => {
    it("should render with props from state", () => {
      const composable = combine(
        withProps({ initValue: 5 }),
        withState("counter", "setCounter", ({initValue}) => initValue),
      );
      const Assembly = assemble(composable)(Component);
      const wrapper = shallow(<Assembly />);
      assert.strictEqual(wrapper.props().counter, 5);
    });
  });

  describe("with conflicting state name", () => {
    it("should resolve conflict", () => {
      const composable = combine(
        withState("counter", "setCounter", 5),
        withProps(({counter}) => ({ counter1: counter })),
        withState("counter", "setCounter", 10),
        withProps(({counter}) => ({ counter2: counter })),
      );
      const Assembly = assemble(composable)(Component);
      const wrapper = shallow(<Assembly />);
      assert.strictEqual(wrapper.props().counter1, 5);
      assert.strictEqual(wrapper.props().counter2, 10);
    });
  });
});
