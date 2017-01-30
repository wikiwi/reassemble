import * as React from "react";
import { assert } from "chai";
import { shallow } from "enzyme";

import assemble from "./assemble";
import flattenProp from "./flattenProp";
import Component from "../test/component";

describe("flattenProp", () => {
  it("should render with flattened prop", () => {
    const input = {
      object: { a: 1, b: 2, c: 3 },
      d: 4,
    };
    const output = {
      object: { a: 1, b: 2, c: 3 },
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    };
    const composable = flattenProp<keyof typeof input>("object");
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly {...input} />);
    assert.deepEqual(wrapper.props(), output);
  });
});
