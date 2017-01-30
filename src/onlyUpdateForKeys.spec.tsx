import * as React from "react";
import { assert } from "chai";
import { shallow } from "enzyme";

import assemble from "./assemble";
import combine from "./combine";
import onlyUpdateForKeys from "./onlyUpdateForKeys";
import mapProps from "./mapProps";
import Component from "../test/component";

describe("onlyUpdateForKeys", () => {
  it("should only render when not shallow equal for specified keys", () => {
    const obj = { foo: "bar" };
    const input = {
      a: obj,
      b: 3,
    };
    const composable = combine(
      onlyUpdateForKeys(["a"]),
      mapProps(({a}) => ({ a: a.foo })),
    );
    const Assembly = assemble(composable)(Component);
    const wrapper = shallow(<Assembly {...input} />);
    assert.deepEqual(wrapper.find(Component).props(), { a: "bar" });
    obj.foo = "xxx";
    wrapper.setProps({ a: obj });
    assert.deepEqual(wrapper.find(Component).props(), { a: "bar" });
    wrapper.setProps({ b: 3 });
    assert.deepEqual(wrapper.find(Component).props(), { a: "bar" });
    wrapper.setProps({ a: { foo: "xxx" } });
    assert.deepEqual(wrapper.find(Component).props(), { a: "xxx" });
  });
});
