import * as React from "react";
import { assert } from "chai";
import { shallow } from "enzyme";

import assemble from "./assemble";
import mapProps from "./mapProps";
import Component from "../test/component";

describe("mapProps", () => {
  it("should render with mapped props", () => {
    const props = ({in2}: { in1: number, in2: number }) => ({
      test1: in2,
      test2: 3,
    });
    const input = {
      in1: 1,
      in2: 2,
    };
    const output = {
      test1: 2,
      test2: 3,
    };
    const composable = mapProps(props);
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly {...input} />);
    assert.deepEqual(wrapper.props(), output);
  });
});
