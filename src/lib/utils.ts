import { Formula } from './graphtoy/types';

export function isNumber(s: string) {
  if (['-', '-.', '.', ''].includes(s)) {
    return true;
  }
  const rgx = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
  return s.match(rgx);
}

export const makeMapPartialByID = (index: number, partial: any) => (v: any) => {
  if (index === v.id) {
    return {
      ...v,
      ...partial,
    };
  }
  return v;
};

export const isBadNum = (num: number) =>
  isNaN(num) ||
  num === Number.NEGATIVE_INFINITY ||
  num === Number.POSITIVE_INFINITY ||
  Math.abs(num) > 1e9;

export const sortById = (a: Formula, b: Formula) =>
  a.id < b.id ? -1 : a.id > b.id ? 1 : 0;

export type Noop<T> = () => T;
export const noop: Noop<any> = () => {};
