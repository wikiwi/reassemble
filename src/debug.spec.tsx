import * as React from "react";
import { assert } from "chai";
import { shallow } from "enzyme";

import assemble from "./assemble";
import debug from "./debug";
import Component from "../test/component";

describe("debug", () => {
  it("should not alter Component", () => {
    const inOut = {
      debug: "pass",
    };
    const composable = debug();
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly {...inOut} />);
    assert.deepEqual(wrapper.props(), inOut);
  });
});
