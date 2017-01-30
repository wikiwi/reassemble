import * as React from "react";
import { assert } from "chai";

import assemble from "./assemble";
import setPropTypes from "./setPropTypes";
import Component from "../test/component";

describe("setPropTypes", () => {
  it("should render with default props", () => {
    const propTypes = {
      a: React.PropTypes.number,
      b: React.PropTypes.number,
    };

    const composable = setPropTypes(propTypes);
    const Assembly = assemble(composable)(Component);
    assert.strictEqual(Assembly.propTypes, propTypes);
  });
});
