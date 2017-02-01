# reassemble

_reassemble_ is a library for the composition of React Higher-Order-Components optimized for performance.

[![NPM Version Widget]][npm version]
[![Build Status Widget]][build status]
[![Coverage Widget]][coverage]

## reassemble vs recompose

_reassemble_ is very similar to [_recompose_](https://github.com/acdlite/recompose). Conceptually both projects differ in such way that _recompose_ uses HOCs as their building blocks, whereas _reassemble_ uses _Composables_ which are just a collection of callbacks. Most noticeably using _reassemble_ only results in a single Higher-Order-Component and thus has a significant higher performance. It also solves the problem of [Dev Tools Ballooning](https://cloud.githubusercontent.com/assets/5077042/12974970/4c6b7d3a-d0c9-11e5-9b92-9cee3b015f8c.png) which is an issue in _recompose_.

## Using recompose together with reassemble

Both projects are not mutual exclusive but _reassemble_ can be used perfectly together with _recompose_. In the end _reassemble_ just produces a Higher-Order-Component that fits in nicely with the composition tools of _recompose_.

## Performance

At the moment _recompose_ is a bit faster in simple compositions (though we plan to close this gap) and _reassemble_ performs  better in complex composition.

[Check out current benchmarks](./benchmark)

## Installation

```sh
npm install reassemble --save
```

## Usage

```js
import { assemble, withState, mapProps } from "reassemble"

const enhance = assemble(
  withState(/*...args*/),
  mapProps(/*...args*/),
);
const EnhancedComponent = enhance(BaseComponent);
```

_Note: `assemble` is also exported with the alias `compose` to allow easy transition from recompose to reassemble_

### Size optimization

_reassemble_ exports also as ES6 modules and as such _tree shaking_ (e.g. with _webpack 2_) can be used to effectively reduce file size.

Without _tree shaking_ you can import the modules explicitly:

```js
import mapProps from "reassemble/lib/mapProps"
import withState from "reassemble/lib/withState"
```

And for ES5 projects:

```js
const mapProps = require("reassemble/cjs/mapProps").mapProps
const withState = require("reassemble/cjs/withState").withState
```

## Combining

Multiple _Composables_ can be combined into one using `combine()` which makes it easy to define your own:

```js
export const withClickCounter = combine(
  withState('counter', 'setCounter', 0),
  withHandlers({
    onClick: ({counter, setCounter}) => setCounter(counter + 1),
  }),
);
```

This is also useful for some _Composables_ like `branch` that takes another _Composable_ as an argument.

## Support for Symbols

Most of the _Composables_ supports the use of [ES6 Symbols](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Symbol). You can use _Symbols_ to pass _hidden_ props among your _Composables_.

_* In some cases TypeScript users will [lose type information](https://github.com/Microsoft/TypeScript/issues/5579)._

## Note for TypeScript users

_reassemble_ is written in _TypeScript_ and as such comes with its own definitions. They do not follow the same type definitions as _recompose_ so some manual work is required here.

## Support of recompose HOCs as Composables

| Name                                                  | Support | Remarks |
| ----------------------------------------------------- | :-----: | ------- |
| [branch][docs branch]                                 | ✅       ||
| [defaultProps][docs defaultProps]                     | ✅       ||
| [flattenProps][docs flattenProps]                     | ✅       ||
| [getContext][docs getContext]                         | ✅       ||
| [lifecycle][docs lifecycle]                           | ❌       | Use [Lifecycle Composables](#lifecycle)  |
| [mapProps][docs mapProps]                             | ✅       ||
| [mapPropsStream][docs mapPropsStream]                 | ❌       | File an issue if you really need this |
| [onlyUpdateForKeys][docs onlyUpdateForKeys]           | ✅       ||
| [onlyUpdateForPropTypes][docs onlyUpdateForPropTypes] | ❌       | Use [onlyUpdateForKeys][docs onlyUpdateForKeys] instead |
| [renameProp][docs renameProp]                         | ✅       ||
| [renameProps][docs renameProps]                       | ✅       ||
| [renderComponent][docs renderComponent]               | ✅       ||
| [renderNothing][docs renderNothing]                   | ✅       ||
| [setDisplayName][docs setDisplayName]                 | ✅       ||
| [setPropTypes][docs setPropTypes]                     | ✅       ||
| [setStatic][docs setStatic]                           | ✅       ||
| [shouldUpdate][docs shouldUpdate]                     | ✅       ||
| [pure][docs pure]                                     | ✅       ||
| [withContext][docs withContext]                       | ✅       | Context will not be available in other _Composables_ of the same Component |
| [withHandlers][docs withHandlers]                     | ✅       ||
| [withProps][docs withProps]                           | ✅       ||
| [withPropsOnChange][docs withPropsOnChange]           | ✅       ||
| [withReducer][docs withReducer]                       | ✅       ||
| [withState][docs withState]                           | ✅       ||
| [toClass][docs toClass]                               | ✅       ||

## Composables introduced by reassemble

 * [`debug()`](#debug)
 * [`noOp`](#noop)
 * [`omitProps()`](#omitprops)
 * [`isolate()`](#isolate)
 * [`integrate()`](#integrate)
 * [`onWillMount()`](#onwillmount)
 * [`onDidMount()`](#ondidmount)
 * [`onWillUnmount()`](#onwillunmount)
 * [`onWillReceiveProps()`](#onwillreceiveprops)
 * [`onWillUpdate()`](#onwillupdate)
 * [`onDidUpdate()`](#ondidupdate)

### `debug()`

```ts
debug(callback: (props) => void): Composable
```

Runs callback with current props. Defaults to logging to the console.

### `noOp`

```ts
noOp: Composable
```

### `omitProps()`

```ts
omitProps(...keys: string[]): Composable
```

Omit selected props.

### `isolate()`

```ts
isolate(...composables: Composable[]): Composable
```

Runs passed _Composables_ in isolation: any props created will be reverted.
Use with [`integrate()`](#integrate) to selectively keep props.

```ts
isolate(
  withProps({
    a: 1,
    b: 2,
  }),
  integrate("b"),
)
// { b: 3 }
```

### `integrate()`

```ts
integrate(...keys: string[]): Composable
```

Selectively keep props that are otherwise reverted in [`isolate()`](#isolate).

### Lifecycle

#### `onWillMount()`

```ts
onWillMount(props): Composable
```

Called during lifecycle `componentWillMount()`

#### `onDidMount()`

```ts
onDidMount(props): Composable
```

Called during lifecycle `componentDidMount()`

#### `onWillUnmount()`

```ts
onWillUnmount(props): Composable
```

Called during lifecycle `componentWillUnmount()`

#### `onWillReceiveProps()`

```ts
onWillReceiveProps(prevProps, nextProps): Composable
```

Called during lifecycle `componentWillReceiveProps()` and when state changes because some props are derived from state.

#### `onWillUpdate()`

```ts
onWillUpdate(prevProps, nextProps): Composable
```

Called during lifecycle `componentWillUpdate()`

#### `onDidUpdate()`

```ts
onDidUpdate(prevProps, nextProps): Composable
```

Called during lifecycle `componentDidUpdate()`

## Roadmap

- More performance optimizations
- More tests

## License

MIT

[docs branch]: https://github.com/acdlite/recompose/blob/master/docs/API.md#branch
[docs defaultProps]: https://github.com/acdlite/recompose/blob/master/docs/API.md#defaultprops
[docs flattenProps]: https://github.com/acdlite/recompose/blob/master/docs/API.md#flattenprops
[docs getContext]: https://github.com/acdlite/recompose/blob/master/docs/API.md#getcontext
[docs lifecycle]: https://github.com/acdlite/recompose/blob/master/docs/API.md#lifecycle
[docs mapProps]: https://github.com/acdlite/recompose/blob/master/docs/API.md#mapprops
[docs mapPropsStream]: https://github.com/acdlite/recompose/blob/master/docs/API.md#mappropsstream
[docs omitProps]: https://github.com/acdlite/recompose/blob/master/docs/API.md#omitprops
[docs onlyUpdateForKeys]: https://github.com/acdlite/recompose/blob/master/docs/API.md#onlyupdateforkeys
[docs onlyUpdateForPropTypes]: https://github.com/acdlite/recompose/blob/master/docs/API.md#onlyupdateforproptypes
[docs renameProp]: https://github.com/acdlite/recompose/blob/master/docs/API.md#renameprop
[docs renameProps]: https://github.com/acdlite/recompose/blob/master/docs/API.md#renameprops
[docs renderComponent]: https://github.com/acdlite/recompose/blob/master/docs/API.md#rendercomponent
[docs renderNothing]: https://github.com/acdlite/recompose/blob/master/docs/API.md#rendernothing
[docs setDisplayName]: https://github.com/acdlite/recompose/blob/master/docs/API.md#setdisplayname
[docs setPropTypes]: https://github.com/acdlite/recompose/blob/master/docs/API.md#setproptypes
[docs setStatic]: https://github.com/acdlite/recompose/blob/master/docs/API.md#setstatic
[docs shouldUpdate]: https://github.com/acdlite/recompose/blob/master/docs/API.md#shouldupdate
[docs pure]: https://github.com/acdlite/recompose/blob/master/docs/API.md#pure
[docs withContext]: https://github.com/acdlite/recompose/blob/master/docs/API.md#withcontext
[docs withHandlers]: https://github.com/acdlite/recompose/blob/master/docs/API.md#withhandlers
[docs withProps]: https://github.com/acdlite/recompose/blob/master/docs/API.md#withprops
[docs withPropsOnChange]: https://github.com/acdlite/recompose/blob/master/docs/API.md#withpropsonchange
[docs withReducer]: https://github.com/acdlite/recompose/blob/master/docs/API.md#withreducer
[docs withState]: https://github.com/acdlite/recompose/blob/master/docs/API.md#withstate
[docs toClass]: https://github.com/acdlite/recompose/blob/master/docs/API.md#toclass

[npm version]: https://www.npmjs.com/package/reassemble

[npm version widget]: https://img.shields.io/npm/v/reassemble.svg?style=flat-square

[build status]: https://travis-ci.org/wikiwi/reassemble

[build status widget]: https://img.shields.io/travis/wikiwi/reassemble/master.svg?style=flat-square

[coverage]: https://codecov.io/gh/wikiwi/reassemble

[coverage widget]: https://codecov.io/gh/wikiwi/reassemble/branch/master/graph/badge.svg


