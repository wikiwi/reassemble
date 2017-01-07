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
import combine from "./combine";
import branch from "./branch";
import withProps from "./withProps";
import Component from "../test/component";

describe("branch", () => {
  it("should branch left", () => {
    const composables: Composable[] = [
      withProps({ test: true }),
      branch<any>(
        (props) => props.test,
        [withProps({ left: true })],
        [withProps({ right: true })],
      ),
    ];
    const Assembly = assemble(...composables)(Component);
    const wrapper = shallow(<Assembly />);
    assert.deepEqual(wrapper.props(), { left: true, test: true });
  });

  it("should branch right", () => {
    const composables: Composable[] = [
      withProps({ test: false }),
      branch<any>(
        (props) => props.test,
        withProps({ left: true }),
        withProps({ right: true }),
      ),
    ];
    const Assembly = assemble(...composables)(Component);
    const wrapper = shallow(<Assembly />);
    assert.deepEqual(wrapper.props(), { right: true, test: false });
  });

  it("should nest", () => {
    const composables: Composable[] = [
      branch<any>(
        () => true,
        combine(
          withProps({ left: true }),
          branch<any>(
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
