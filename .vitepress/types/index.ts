/**
 * Pick literal from union
 * @example
 * type A = 'a' | 'b' | 'c'
 * type B = PickLiteral<A, 'a' | 'b'> // 'a' | 'b'
 */
export type PickLiteral<A, B extends A> = B;
