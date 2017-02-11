import * as React from "react";
import { assert } from "chai";
import { shallow } from "enzyme";

import {
  assemble,
  branch,
  combine,
  withState,
  noOp,
  onWillReceiveProps,
} from "../../src";

import Component from "../component";

describe("advanced use case test", () => {
  describe("change state directly after lazyloading new hooks", () => {
    it("should recalculate props correctly", () => {
      const composable =
        combine(
          withState("foo", "setFoo", false),
          branch(({test}) => !test,
            noOp,
            combine(
              onWillReceiveProps((_, {setFoo, foo}) => {
                if (!foo) {
                  setFoo(true);
                }
              }),
            ),
          ),
        );
      const Assembly = assemble(composable)(Component);
      const wrapper = shallow(<Assembly test={false} />);
      wrapper.setProps({ test: true });
      assert.isTrue(wrapper.prop("test"));
    });
  });
});
