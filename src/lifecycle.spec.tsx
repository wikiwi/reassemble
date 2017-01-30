import * as React from "react";
import { assert } from "chai";
import { spy } from "sinon";
import { mount } from "enzyme";

import {
  onWillMount, onDidMount, onWillUnmount,
  onWillReceiveProps, onWillUpdate, onDidUpdate, shouldUpdate,
} from "./lifecycle";
import assemble from "./assemble";
import combine from "./combine";
import withProps from "./withProps";
import withState from "./withState";
import Component from "../test/component";

describe("lifecycle", () => {
  it("should run in expected order with encapsulated props", () => {
    const called: string[] = [];
    const expectedOrder = [
      "willMount", "didMount",
      "willReceiveProps", "shouldUpdate", "willUpdate", "didUpdate",
      "willReceiveProps", "shouldUpdate", "willUpdate", "didUpdate",
      "willUnmount",
    ];
    const spies = {
      willMount: spy(() => called.push("willMount")),
      didMount: spy(() => called.push("didMount")),
      willUnmount: spy(() => called.push("willUnmount")),
      willReceiveProps: spy(() => called.push("willReceiveProps")),
      willUpdate: spy(() => called.push("willUpdate")),
      didUpdate: spy(() => called.push("didUpdate")),
      shouldUpdate: spy(() => { called.push("shouldUpdate"); return true; }),
    };
    const indexOf = (name: string) => Object.keys(spies).indexOf(name);
    const composable = combine(
      withProps({ index: 0 }),
      onWillMount(spies.willMount),
      withProps({ index: 1 }),
      onDidMount(spies.didMount),
      withProps({ index: 2 }),
      onWillUnmount(spies.willUnmount),
      withProps({ index: 3 }),
      onWillReceiveProps(spies.willReceiveProps),
      withProps({ index: 4 }),
      onWillUpdate(spies.willUpdate),
      withProps({ index: 5 }),
      onDidUpdate(spies.didUpdate),
      withProps({ index: 6 }),
      shouldUpdate(spies.shouldUpdate),
      withProps({ index: 7 }),
    );
    const Assembly = assemble(composable)(Component);
    const wrapper = mount(<Assembly />);
    ["willMount", "didMount"].forEach(
      (name) => assert.isTrue((spies as any)[name].calledWith(
        { index: indexOf(name) },
      )),
    );
    wrapper.setProps({ change: 1 });
    ["willReceiveProps", "shouldUpdate", "willUpdate", "didUpdate"].forEach(
      (name) => assert.isTrue((spies as any)[name].calledWith(
        { index: indexOf(name) },
        { index: indexOf(name), change: 1 },
      )),
    );
    wrapper.setProps({ change: 2 });
    ["willReceiveProps", "shouldUpdate", "willUpdate", "didUpdate"].forEach(
      (name) => assert.isTrue((spies as any)[name].calledWith(
        { index: indexOf(name), change: 1 },
        { index: indexOf(name), change: 2 },
      )),
    );
    wrapper.unmount();
    ["willUnmount"].forEach(
      (name) => assert.isTrue((spies as any)[name].calledWith(
        { index: indexOf(name), change: 2 },
      )),
    );

    assert.deepEqual(called, expectedOrder);
  });

  describe("shouldUpdate", () => {
    it("should not prevent rerender", () => {
      const didUpdate = spy();
      const composable = combine(
        shouldUpdate(() => true),
        onDidUpdate(didUpdate),
      );
      const Assembly = assemble(composable)(Component);
      const wrapper = mount(<Assembly />);
      wrapper.setProps({ next: true });
      assert.isTrue(didUpdate.called);
    });

    it("should prevent rerender", () => {
      const didUpdate = spy();
      const composable = combine(
        shouldUpdate(() => false),
        onDidUpdate(didUpdate),
      );
      const Assembly = assemble(composable)(Component);
      const wrapper = mount(<Assembly />);
      wrapper.setProps({ next: true });
      assert.isTrue(didUpdate.notCalled);
    });

    it("should prevent rerender with multiple callbacks", () => {
      const didUpdate = spy();
      const composable = combine(
        shouldUpdate(() => true),
        shouldUpdate(() => false),
        onDidUpdate(didUpdate),
      );
      const Assembly = assemble(composable)(Component);
      const wrapper = mount(<Assembly />);
      wrapper.setProps({ next: true });
      assert.isTrue(didUpdate.notCalled);
    });
  });

  describe("onWillReceiveProps", () => {
    it("should call when props derived from state changes", () => {
      const willReceiveProps = spy();
      const composable = combine(
        withState("value", "setValue", 0),
        onWillReceiveProps(willReceiveProps),
      );
      const Assembly = assemble(composable)(Component);
      const wrapper = mount(<Assembly foo={"bar"} />);
      const setValue = wrapper.find(Component).props().setValue;
      wrapper.setProps({ change: 1 });
      assert.isTrue(willReceiveProps.calledOnce);
      assert.isTrue(willReceiveProps.calledWith(
        { foo: "bar", value: 0, setValue },
        { foo: "bar", value: 0, change: 1, setValue },
      ));
      setValue(1);
      assert.isTrue(willReceiveProps.calledTwice);
      assert.isTrue(willReceiveProps.calledWith(
        { foo: "bar", value: 0, change: 1, setValue },
        { foo: "bar", value: 1, change: 1, setValue },
      ));
    });

    it("should handle deep state changes", () => {
      const willReceiveProps = spy();
      const composable = combine(
        withState("foo", "setFoo", 0),
        withProps({ value: 3 }),
        withState("bar", "setBar", 0),
        onWillReceiveProps(willReceiveProps),
      );
      const Assembly = assemble(composable)(Component);
      const wrapper = mount(<Assembly foo={"bar"} />);
      const setFoo = wrapper.find(Component).props().setFoo;
      const setBar = wrapper.find(Component).props().setBar;
      setBar(1);
      assert.isTrue(willReceiveProps.calledOnce);
      assert.isTrue(willReceiveProps.calledWith(
        { value: 3, foo: 0, bar: 0, setFoo, setBar },
        { value: 3, foo: 0, bar: 1, setFoo, setBar },
      ));
      willReceiveProps.reset();
      setFoo(1);
      assert.isTrue(willReceiveProps.calledOnce);
      assert.isTrue(willReceiveProps.calledWith(
        { value: 3, foo: 0, bar: 1, setFoo, setBar },
        { value: 3, foo: 1, bar: 1, setFoo, setBar },
      ));
    });
  });
});
