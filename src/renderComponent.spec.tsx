import * as React from "react";
import { assert } from "chai";
import { shallow } from "enzyme";

import assemble from "./assemble";
import renderComponent from "./renderComponent";
import Component from "../test/component";

describe("renderComponent", () => {
  it("should render component", () => {
    const input = {
      id: "myid",
      className: "className",
    };
    const composable = renderComponent("span");
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly {...input} />);
    const child = wrapper.find("span");
    assert.strictEqual(child.length, 1);
    assert.deepEqual(child.props(), input);
  });
});
