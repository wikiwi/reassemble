import * as React from "react";
import { assert } from "chai";
import { shallow } from "enzyme";

import assemble from "./assemble";
import renderNothing from "./renderNothing";
import Component from "../test/component";

describe("renderNothing", () => {
  it("should render null", () => {
    const composable = renderNothing;
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly />);
    assert.strictEqual(wrapper.children().length, 0);
  });
});
