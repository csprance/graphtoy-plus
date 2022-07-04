import { defaultVisualizer } from '../store';

export function isNumber(s: string) {
  if (['-', '-.', '.', ''].includes(s)) {
    return true;
  }
  const rgx = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
  return s.match(rgx);
}

export const mapFormulaStringArray = (fs: string, idx: number) => ({
  enabled: true,
  id: idx + 1,
  value: fs,
  visualizer: defaultVisualizer,
});

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
