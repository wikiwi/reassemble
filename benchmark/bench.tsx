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

const Recomposed = recompose.compose(
  recompose.withProps({ a: 1 }),
  recompose.withState("bla", "setBla", 0),
  recompose.withState("bla", "setBla", 0),
  recompose.withState("bla", "setBla", 0),
  recompose.withState("bla", "setBla", 0),
)(Component);

const Recompact = recompact.compose(
  recompact.withProps({ a: 1 }),
  recompact.withState("bla", "setBla", 0),
  recompact.withState("bla", "setBla", 0),
  recompact.withState("bla", "setBla", 0),
  recompact.withState("bla", "setBla", 0),
  recompact.withState("bla", "setBla", 0),
  recompact.withState("bla", "setBla", 0),
  recompact.withState("bla", "setBla", 0),
  recompact.withState("bla", "setBla", 0),
  recompact.withState("bla", "setBla", 0),
  recompact.withState("bla", "setBla", 0),
  recompact.withState("bla", "setBla", 0),
  recompact.withState("bla", "setBla", 0),
  recompact.withState("bla", "setBla", 0),
  recompact.lifecycle({ onComponentDidMount: () => "a" }),
  recompact.lifecycle({ onComponentDidMount: () => "a" }),
  recompact.lifecycle({ onComponentDidMount: () => "a" }),
  recompact.lifecycle({ onComponentDidMount: () => "a" }),
  recompact.lifecycle({ onComponentDidMount: () => "a" }),
)(Component);

const Assembled = reassemble.assemble(
  reassemble.withProps({ a: 1 }),
  reassemble.withState("bla1", "setBla", 0),
  reassemble.withState("bla2", "setBla", 0),
  reassemble.withState("bla3", "setBla", 0),
  reassemble.withState("bla4", "setBla", 0),
  reassemble.withState("bla5", "setBla", 0),
  reassemble.withState("bla6", "setBla", 0),
  reassemble.withState("bla7", "setBla", 0),
  reassemble.withState("bla8", "setBla", 0),
  reassemble.withState("bla9", "setBla", 0),
  reassemble.withState("bla10", "setBla", 0),
  reassemble.withState("bla11", "setBla", 0),
  reassemble.withState("bla12", "setBla", 0),
  reassemble.withState("bla13", "setBla", 0),
  reassemble.onDidMount(() => "a"),
  reassemble.onDidMount(() => "a"),
  reassemble.onDidMount(() => "a"),
  reassemble.onDidMount(() => "a"),
  reassemble.onDidMount(() => "a"),
)(Component);

// add tests
suite
  .add("recompose", () => {
    render(<Recomposed />);
    cleanup();
  })
  .add("recompact", () => {
    render(<Recompact />);
    cleanup();
  })
  .add("assemble", () => {
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
