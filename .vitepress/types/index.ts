/**
 * A stricter version of {@link Extract<T, U>} that ensures every member of `U` can successfully extract something from `T`.
 * @example
 * type A = 'a' | 'b' | 'c'
 * type B = PickLiteral<A, 'a' | 'b'> // 'a' | 'b'
 */
export type ExtractStrict<T, U extends T> = U;
