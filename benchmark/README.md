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
recompose x 762 ops/sec ±2.38% (76 runs sampled)
recompact x 2,135 ops/sec ±2.87% (76 runs sampled)
reassemble x 2,689 ops/sec ±3.10% (71 runs sampled)
Fastest is reassemble
```

### withState()

Composing 10x `withState()`

[Source](./withState.tsx)

```bash
recompose x 767 ops/sec ±4.22% (75 runs sampled)
recompact x 2,083 ops/sec ±3.35% (76 runs sampled)
reassemble x 2,525 ops/sec ±2.54% (77 runs sampled)
Fastest is reassemble
```

### withProps()

Composing 10x `withProps()`

[Source](./withProps.tsx)

```bash
recompose x 3,487 ops/sec ±4.27% (76 runs sampled)
recompact x 2,278 ops/sec ±1.68% (80 runs sampled)
reassemble x 3,111 ops/sec ±1.54% (81 runs sampled)
Fastest is recompose
```

### Use Case #1: withKeyboardFocus()

[Source](./withKeyboardFocus.tsx)

```bash
recompose x 2,485 ops/sec ±6.41% (77 runs sampled)
recompact x 2,370 ops/sec ±2.29% (77 runs sampled)
reassemble x 2,733 ops/sec ±3.80% (74 runs sampled)
Fastest is reassemble
```
