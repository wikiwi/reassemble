import * as React from "react";
import { assert } from "chai";
import { shallow } from "enzyme";

import assemble from "./assemble";
import renderNull from "./renderNull";
import Component from "../test/component";

describe("renderNull", () => {
  it("should render null", () => {
    const composable = renderNull;
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly />);
    assert.strictEqual(wrapper.children().length, 0);
  });
});
