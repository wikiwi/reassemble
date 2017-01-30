import * as React from "react";
import { assert } from "chai";
import { shallow } from "enzyme";

import assemble from "./assemble";
import noOp from "./noOp";
import Component from "../test/component";

describe("noOp", () => {
  it("should not alter Component", () => {
    const inOut = {
      a: 1,
      b: 2,
      c: 3,
    };
    const composable = noOp;
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly {...inOut} />);
    assert.deepEqual(wrapper.props(), inOut);
  });
});
