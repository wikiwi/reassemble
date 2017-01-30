import * as React from "react";
import { assert } from "chai";
import { shallow } from "enzyme";

import { Composable } from "./blueprint";
import assemble from "./assemble";
import isolate from "./isolate";
import withProps from "./withProps";
import Component from "../test/component";

describe("isolate", () => {
  it("should isolate props", () => {
    const composables: Composable[] = [
      withProps({ a: 1, b: 2 }),
      isolate(
        withProps({ b: 3 }),
      ),
    ];
    const Assembly = assemble(...composables)(Component);
    const wrapper = shallow(<Assembly />);
    assert.deepEqual(wrapper.props(), { a: 1, b: 2 });
  });
  it("should nest", () => {
    const composables: Composable[] = [
      withProps({ a: 1, b: 2 }),
      isolate(
        withProps({ b: 3 }),
        isolate(
          withProps({ a: 1 }),
        ),
      ),
    ];
    const Assembly = assemble(...composables)(Component);
    const wrapper = shallow(<Assembly />);
    assert.deepEqual(wrapper.props(), { a: 1, b: 2 });
  });
});
