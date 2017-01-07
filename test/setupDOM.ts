/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { jsdom } from "jsdom";

declare var global: any;

global.document = jsdom("");
global.window = document.defaultView;
global.navigator = { userAgent: "node.js" };

const exposedProperties = ["document", "window", "navigator"];
Object.keys(window).forEach((property) => {
  if (typeof global[property] === "undefined") {
    exposedProperties.push(property);
    global[property] = (window as any)[property];
  }
});
