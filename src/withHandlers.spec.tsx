/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import * as React from "react";
import { MouseEventHandler } from "react";
import { assert } from "chai";
import { shallow } from "enzyme";
import { spy } from "sinon";

import assemble from "./assemble";
import withHandlers from "./withHandlers";
import Component from "../test/component";
import omit from "./utils/omit";

describe("withHandlers", () => {
  it("should render with handler object", () => {
    const handleOnClick = spy();
    const handlers = {
      onClick: (props: any) => (event: MouseEventHandler<any>) => handleOnClick(props, event),
    };
    const composable = withHandlers(handlers);
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly a={1} />);
    const ev = "event";
    wrapper.simulate("click", ev);
    assert.isTrue(handleOnClick.calledOnce);
    assert.isTrue(handleOnClick.calledWith(omit(wrapper.props(), "onClick"), ev));
  });

  it("should render with handler factory", () => {
    const handleOnClick = spy();
    const initialPropsSpy = spy();
    const handlers = (initialProps: any) => {
      initialPropsSpy(initialProps);
      const test = true;
      return {
        onClick: (props: any) => (event: MouseEventHandler<any>) => handleOnClick(props, event, test),
      };
    };
    const composable = withHandlers(handlers);
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly a={1} />);
    const ev = "event";
    wrapper.simulate("click", ev);
    assert.isTrue(handleOnClick.calledOnce);
    assert.isTrue(handleOnClick.calledWith(omit(wrapper.props(), "onClick"), ev, true));
    assert.isTrue(initialPropsSpy.calledWith({ a: 1 }));
  });
});
