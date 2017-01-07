/**
 * @license
 * Copyright (C) 2016-present Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { ComponentClass, StatelessComponent } from "react";

export type ReactComponent<T> = ComponentClass<T> | StatelessComponent<T>;
export type ComponentEnhancer<TInner, TOutter> =
  (component: ReactComponent<TInner>) => ComponentClass<TOutter>;
export type Mapper<TIn, TOut> = (input: TIn) => TOut;
export type Predicate<T> = Mapper<T, boolean>;
export type PredicateDiff<T> = (current: T, next: T) => boolean;
export type Indexable = { [key: string]: any };
