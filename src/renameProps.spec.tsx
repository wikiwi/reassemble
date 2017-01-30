import * as React from "react";
import { assert } from "chai";
import { shallow } from "enzyme";

import assemble from "./assemble";
import renameProps from "./renameProps";
import Component from "../test/component";

describe("renameProps", () => {
  it("should render with renamed props", () => {
    const input = {
      in1: 1,
      in2: 2,
    };
    const output = {
      in3: 1,
      in4: 2,
    };
    const composable = renameProps<keyof typeof input, keyof typeof output>({
      in1: "in3",
      in2: "in4",
    });
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly {...input} />);
    assert.deepEqual(wrapper.props(), output);
  });
});
