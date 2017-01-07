/**
 * @license
 * Copyright (C) 2017-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/* tslint:disable: no-console */
/* tslint:disable: only-arrow-functions */

import * as Benchmark from "benchmark";
import * as recompose from "recompose";
import { StatelessComponent } from "react";

import * as reassemble from "../src";

const suite = new Benchmark.Suite();

const Component: StatelessComponent<any> = () => null;

// add tests
suite
  .add("recompose", () => {
    recompose.compose(
      recompose.withProps({ a: 1 }),
      recompose.withProps({ a: 1 }),
      recompose.withProps({ a: 1 }),
    )(Component);
  })
  .add("reassemble", () => {
    reassemble.assemble(
      reassemble.withProps({ a: 1 }),
      reassemble.withProps({ a: 1 }),
      reassemble.withProps({ a: 1 }),
    )(Component);
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
