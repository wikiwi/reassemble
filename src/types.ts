import { ComponentClass, StatelessComponent } from "react";

export type ReactComponent<T> = ComponentClass<T> | StatelessComponent<T>;
export type ComponentEnhancer<TInner, TOutter> =
  (component: ReactComponent<TInner>) => ComponentClass<TOutter>;
export type Mapper<TIn, TOut> = (input: TIn) => TOut;
export type Predicate<T> = Mapper<T, boolean>;
export type PredicateDiff<T> = (current: T, next: T) => boolean;
export type Indexable = { [key: string]: any };
