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

const create = (lib: any) => {
  const { withPropsOnChange } = lib;
  return lib.compose(
    ...Array(10).fill(withPropsOnChange(["foo"], () => ({ foo: "bar" }))),
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
  .add("reassemble", () => {
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
