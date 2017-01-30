import * as React from "react";
import { assert } from "chai";
import { shallow } from "enzyme";

import assemble from "./assemble";
import withContext from "./withContext";
import getContext from "./getContext";
import Component from "../test/component";

describe("withContext", () => {
  it("should render with a child context", () => {
    const contextTypes = {
      a: React.PropTypes.number,
      b: React.PropTypes.number,
    };
    const composable = withContext(contextTypes, (props) => ({ a: props.a, b: props.b }));
    const ChildAssembly = assemble(getContext(contextTypes))(Component);
    const Assembly = assemble(composable)(ChildAssembly);

    const wrapper = shallow(<Assembly a={1} b={2} />);
    assert.deepEqual(wrapper.find(ChildAssembly).props(), {
      a: 1,
      b: 2,
    });
  });
});
