/**
 * @license
 * Copyright (C) 2017-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/* tslint:disable: no-console */
/* tslint:disable: no-var-requires */
/* tslint:disable: only-arrow-functions */

import * as Benchmark from "benchmark";
import * as recompose from "recompose";
import * as recompact from "recompact";
import * as React from "react";
import * as ReactDOM from "react-dom";

import * as reassemble from "../src";

require("../test/setupDOM");

const suite = new Benchmark.Suite();

const Component: React.StatelessComponent<any> = () => null;

const container = document.createElement("div");
document.body.appendChild(container);

function render(node: React.ReactElement<any>) {
  ReactDOM.render(node, container);
}

function cleanup() {
  ReactDOM.unmountComponentAtNode(container);
}

// This is a real life example that determines whether the user
// focused on a component using the keyboard instead of the mouse or touch.
const create = (lib: any) => {
  const {withState, withHandlers, compose} = lib;
  let lastMouseDownTime = 0;
  return compose(
    withState("keyboardFocus", "setKeyboardFocus", false),
    withHandlers({
      onFocus: ({onFocus, setKeyboardFocus}: any) => (event: any) => {
        if (onFocus) { onFocus(event); }
        let now = new Date().getTime();
        if (now - lastMouseDownTime > 750) {
          setKeyboardFocus(true);
        }
      },
      onBlur: ({onBlur, setKeyboardFocus}: any) => (event: any) => {
        if (onBlur) { onBlur(event); }
        setKeyboardFocus(false);
      },
      onMouseDown: ({onMouseDown}: any) => (event: any) => {
        if (onMouseDown) { onMouseDown(event); }
        lastMouseDownTime = new Date().getTime();
      },
    }),
  );
};

const Composed = create(recompose)(Component);
const Compacted = create(recompact)(Component);
const Assembled = create(reassemble)(Component);

// add tests
suite
  .add("recompose", () => {
    render(<Composed />);
    cleanup();
  })
  .add("recompact", () => {
    render(<Compacted />);
    cleanup();
  })
  .add("assemble", () => {
    render(<Assembled />);
    cleanup();
  })
  .add("react", () => {
    render(<Assembled />);
    cleanup();
  })
  // add listeners
  .on("cycle", (event: any) => {
    console.log(String(event.target));
  })
  .on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  // run async
  .run({ async: true });
