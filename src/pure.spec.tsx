import * as React from "react";
import { assert } from "chai";
import { shallow } from "enzyme";

import assemble from "./assemble";
import combine from "./combine";
import pure from "./pure";
import withProps from "./withProps";
import Component from "../test/component";

describe("pure", () => {
  it("should only render when not shallow equal", () => {
    const obj = { foo: "bar" };
    const input = {
      a: obj,
    };
    const composable = combine(
      pure,
      withProps(({a}) => ({ a: a.foo })),
    );
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly {...input} />);
    assert.deepEqual(wrapper.find(Component).props(), { a: "bar" });
    obj.foo = "xxx";
    wrapper.setProps({ a: obj });
    assert.deepEqual(wrapper.find(Component).props(), { a: "bar" });
    wrapper.setProps({ a: { foo: "xxx" } });
    assert.deepEqual(wrapper.find(Component).props(), { a: "xxx" });
  });
});
