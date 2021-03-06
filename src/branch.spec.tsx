import * as React from "react";
import { assert } from "chai";
import { shallow } from "enzyme";

import { Composable } from "./blueprint";
import assemble from "./assemble";
import combine from "./combine";
import branch from "./branch";
import withProps from "./withProps";
import Component from "../test/component";

describe("branch", () => {
  it("should branch left", () => {
    const composables: Composable[] = [
      withProps({ test: true }),
      branch(
        (props) => props.test,
        withProps({ left: true }),
        withProps({ right: true }),
      ),
      withProps({ next: true }),
    ];
    const Assembly = assemble(...composables)(Component);
    const wrapper = shallow(<Assembly />);
    assert.deepEqual(wrapper.props(), { left: true, test: true, next: true });
  });

  it("should branch right", () => {
    const composables: Composable[] = [
      withProps({ test: false }),
      branch(
        (props) => props.test,
        withProps({ left: true }),
        withProps({ right: true }),
      ),
      withProps({ next: true }),
    ];
    const Assembly = assemble(...composables)(Component);
    const wrapper = shallow(<Assembly />);
    assert.deepEqual(wrapper.props(), { right: true, test: false, next: true });
  });

  it("should branch first left then right", () => {
    const composables: Composable[] = [
      branch(
        (props) => props.test,
        withProps({ left: true }),
        withProps({ right: true }),
      ),
      withProps({ next: true }),
    ];
    const Assembly = assemble(...composables)(Component);
    const wrapper = shallow(<Assembly />);
    assert.deepEqual(wrapper.props(), { right: true, next: true });
    wrapper.setProps({ test: true });
    assert.deepEqual(wrapper.props(), { left: true, test: true, next: true });
  });

  it("should branch first right then left", () => {
    const composables: Composable[] = [
      branch(
        (props) => !props.test,
        withProps({ left: true }),
        withProps({ right: true }),
      ),
      withProps({ next: true }),
    ];
    const Assembly = assemble(...composables)(Component);
    const wrapper = shallow(<Assembly />);
    assert.deepEqual(wrapper.props(), { left: true, next: true });
    wrapper.setProps({ test: true });
    assert.deepEqual(wrapper.props(), { right: true, test: true, next: true });
  });

  it("should nest", () => {
    const composables: Composable[] = [
      branch(
        () => true,
        combine(
          withProps({ left: true }),
          branch(
            () => false,
            withProps({ deepleft: true }),
            withProps({ deepRight: true }),
          ),
        ),
      ),
    ];
    const Assembly = assemble(...composables)(Component);
    const wrapper = shallow(<Assembly />);
    assert.deepEqual(wrapper.props(), { left: true, deepRight: true });
  });
});
