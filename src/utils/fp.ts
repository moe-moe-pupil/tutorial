import { Lazy } from "fp-ts/lib/function";

const switchCase = <T extends string | number | symbol, U>(value: T, cases: Record<T, Lazy<U>>, def: Lazy<U>) =>
  value in cases ? cases[value]() : def();

export const test_mapNumber = (num:number) => switchCase<number, string>(num, { 10: () => '100', 3: () => '350' }, () => 'hello')


