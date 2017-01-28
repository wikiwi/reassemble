# reassemble

_reassemble_ is a library for the composition of React Higher-Order-Components optimized for performance.

[![NPM Version Widget]][npm version]
[![Build Status Widget]][build status]
[![Coverage Widget]][coverage]

## reassemble vs recompose
In most cases _reassemble_ is  a drop-in replacement for [_recompose_](https://github.com/acdlite/recompose). Conceptually both projects differ in such way that _recompose_ uses HOCs as there building blocks, whereas _reassemble_ uses _Composables_ which are just a collection of callbacks. Most noticeably is that using _reassemble_ only results in a single Higher-Order-Component and thus has a significant higher performance. It also solves the problem of [Dev Tools Ballooning](https://cloud.githubusercontent.com/assets/5077042/12974970/4c6b7d3a-d0c9-11e5-9b92-9cee3b015f8c.png) which is an issue in _recompose_.

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

## Support of recompose HOCs as Composables

| Name                                                  | Support | Remarks |
| ----------------------------------------------------- | :-----: | ------- |
| [branch][docs branch]                                 | ✅       ||
| [defaultProps][docs defaultProps]                     | ✅       ||
| [flattenProps][docs flattenProps]                     | ✅       ||
| [getContext][docs getContext]                         | ✅       ||
| [lifecycle][docs lifecycle]                           | TODO     ||
| [mapProps][docs mapProps]                             | ✅       ||
| [mapPropsStream][docs mapPropsStream]                 | ❌       | Needs further investigation |
| [omitProps][docs omitProps]                           | ✅       ||
| [onlyUpdateForKeys][docs onlyUpdateForKeys]           | TODO     ||
| [onlyUpdateForPropTypes][docs onlyUpdateForPropTypes] | TODO     ||
| [renameProp][docs renameProp]                         | ✅       ||
| [renameProps][docs renameProps]                       | ✅       ||
| [renderComponent][docs renderComponent]               | TODO     ||
| [renderNothing][docs renderNothing]                   | TODO     ||
| [setDisplayName][docs setDisplayName]                 | ✅        ||
| [setPropTypes][docs setPropTypes]                     | TODO      ||
| [setStatic][docs setStatic]                           | ✅        ||
| [shouldUpdate][docs shouldUpdate]                     | ✅        ||
| [pure][docs pure]                                     | TODO      ||
| [withContext][docs withContext]                       | TODO      ||
| [withHandlers][docs withHandlers]                     | ✅        ||
| [withProps][docs withProps]                           | ✅        ||
| [withPropsOnChange][docs withPropsOnChange]           | ✅        ||
| [withReducer][docs withReducer]                       | ✅        ||
| [withState][docs withState]                           | ✅        ||
| [wrapDisplayName][docs wrapDisplayName]               | ✅        ||
| [toClass][docs toClass]                               | TODO      | This is a noOp `assemble` always results in a class |

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
[docs wrapDisplayName]: https://github.com/acdlite/recompose/blob/master/docs/API.md#wrapdisplayname
[docs toClass]: https://github.com/acdlite/recompose/blob/master/docs/API.md#toclass

[npm version]: https://www.npmjs.com/package/reassemble

[npm version widget]: https://img.shields.io/npm/v/reassemble.svg?style=flat-square

[build status]: https://travis-ci.org/wikiwi/reassemble

[build status widget]: https://img.shields.io/travis/wikiwi/reassemble/master.svg?style=flat-square

[coverage]: https://codecov.io/gh/wikiwi/reassemble

[coverage widget]: https://codecov.io/gh/wikiwi/reassemble/branch/master/graph/badge.svg


