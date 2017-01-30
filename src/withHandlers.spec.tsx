import * as React from "react";
import { MouseEventHandler } from "react";
import { assert } from "chai";
import { shallow } from "enzyme";
import { spy } from "sinon";

import assemble from "./assemble";
import combine from "./combine";
import withHandlers from "./withHandlers";
import withProps from "./withProps";
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

  it("should work with symbols", () => {
    const sym = Symbol();
    const handlers = (initialProps: any) => {
      return {
        [sym]: () => () => false,
      };
    };
    const composable = combine(
      withHandlers(handlers),
      withProps((props) => ({ onClick: props[sym] })),
    );
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly />);
    assert.isFunction(wrapper.props().onClick);
  });
});
