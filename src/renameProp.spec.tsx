import * as React from "react";
import { assert } from "chai";
import { shallow } from "enzyme";

import assemble from "./assemble";
import renameProp from "./renameProp";
import Component from "../test/component";

describe("renameProp", () => {
  it("should render with renamed prop", () => {
    const input = {
      in1: 1,
      in2: 2,
    };
    const output = {
      in2: 2,
      in3: 1,
    };
    const composable = renameProp<keyof typeof input, keyof typeof output>("in1", "in3");
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly {...input} />);
    assert.deepEqual(wrapper.props(), output);
  });
});
