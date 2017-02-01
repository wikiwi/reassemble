# Benchmark

These benchmarks calculates the time it takes to render a composed component and to unmount it afterwards.

You can run the bechmarks using e.g. `npm run bench -- ./benchmark/withHandlers`.

## Results

These are the results running on a _Debian 8_ VM with 4096 MB RAM and 4 Cores.
The Host has a 2,2 GHz Intel Core i7 and runs VMWare Fusion.

### withHandlers()

Composing 10x `withHandlers()`

[Source](./withHandlers.tsx)

```bash
recompose x 3,264 ops/sec ±2.63% (77 runs sampled)
recompact x 4,855 ops/sec ±2.08% (75 runs sampled)
reassemble x 5,159 ops/sec ±2.89% (70 runs sampled)
Fastest is reassemble
```

### withState()

Composing 10x `withState()`

[Source](./withState.tsx)

```bash
recompose x 3,238 ops/sec ±2.08% (79 runs sampled)
recompact x 5,186 ops/sec ±1.75% (77 runs sampled)
reassemble x 5,101 ops/sec ±3.16% (74 runs sampled)
Fastest is recompact,reassemble
```

### withProps()

Composing 10x `withProps()`

[Source](./withProps.tsx)

```bash
recompose x 9,488 ops/sec ±1.80% (78 runs sampled)
recompact x 5,346 ops/sec ±1.38% (77 runs sampled)
reassemble x 7,799 ops/sec ±1.60% (77 runs sampled)
Fastest is recompose
```

### withPropsOnChange()

Composing 10x `withPropsOnChange()`

[Source](./withPropsOnChange.tsx)

```bash
recompose x 3,393 ops/sec ±3.54% (76 runs sampled)
recompact x 5,257 ops/sec ±1.48% (78 runs sampled)
reassemble x 7,081 ops/sec ±1.33% (79 runs sampled)
Fastest is reassemble
```

### Use Case #1: withKeyboardFocus()

[Source](./withKeyboardFocus.tsx)

```bash
recompose x 7,063 ops/sec ±3.70% (76 runs sampled)
recompact x 5,773 ops/sec ±1.93% (74 runs sampled)
reassemble x 6,412 ops/sec ±2.50% (75 runs sampled)
Fastest is recompose
```
