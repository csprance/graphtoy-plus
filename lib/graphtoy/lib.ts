export function stepNaN(a: number, x: number) {
  return Number.isNaN(x) || Number.isNaN(a) || x > a ? x : Number.NaN;
}
export function clamp(x: number, a: number, b: number) {
  if (x < a) return a;
  if (x > b) return b;
  return x;
}
export function saturate(x: number) {
  return clamp(x, 0.0, 1.0);
}
export function remap(a: number, b: number, x: number, c: number, d: number) {
  if (x < a) return c;
  if (x > b) return d;
  let y = (x - a) / (b - a);
  return c + (d - c) * y;
}
export function smoothstep(a: number, b: number, x: number) {
  let y = saturate((x - a) / (b - a));
  return y * y * (3.0 - 2.0 * y);
}
export function ssign(x: number) {
  return x >= 0.0 ? 1.0 : -1.0;
}
export function radians(degrees: number) {
  return (degrees * Math.PI) / 180.0;
}
export function degrees(radians: number) {
  return (radians * 180.0) / Math.PI;
}
export function inversesqrt(x: number) {
  return 1.0 / Math.sqrt(x);
}
export function rsqrt(x: number) {
  return inversesqrt(x);
}
export function rcbrt(x: number) {
  return 1.0 / Math.cbrt(x);
}
export function rcp(x: number) {
  return 1.0 / x;
}
export function fma(x: number, y: number, z: number) {
  return x * y + z;
}
export function step(a: number, x: number) {
  return x < a ? 0.0 : 1.0;
}
export function mix(a: number, b: number, x: number) {
  return a + (b - a) * x;
}
export function lerp(a: number, b: number, x: number) {
  return mix(a, b, x);
}
export function over(x: number, y: number) {
  return 1.0 - (1.0 - x) * (1.0 - y);
}
export function tri(a: number, x: number) {
  x = x / (2.0 * Math.PI);
  x = x % 1.0;
  x = x > 0.0 ? x : x + 1.0;
  if (x < a) x = x / a;
  else x = 1.0 - (x - a) / (1.0 - a);
  return -1.0 + 2.0 * x;
}
export function sqr(a: number, x: number) {
  return Math.sin(x) > a ? 1.0 : -1.0;
}
export function frac(x: number) {
  return x - Math.floor(x);
}
export function fract(x: number) {
  return frac(x);
}
export function exp2(x: number) {
  return Math.pow(2.0, x);
}
export function exp10(x: number) {
  return Math.pow(10.0, x);
}
export function mod(x: number, y: number) {
  return x - y * Math.floor(x / y);
}
export function cellnoise(x: number) {
  let n = Math.floor(x) | 0;
  n = (n << 13) ^ n;
  n &= 0xffffffff;
  let m = n;
  n = n * 15731;
  n &= 0xffffffff;
  n = n * m;
  n &= 0xffffffff;
  n = n + 789221;
  n &= 0xffffffff;
  n = n * m;
  n &= 0xffffffff;
  n = n + 1376312589;
  n &= 0xffffffff;
  n = (n >> 14) & 65535;
  return n / 65535.0;
}
export function voronoi(x: number) {
  const i = Math.floor(x);
  const f = x - i;
  const x0 = cellnoise(i - 1);
  const d0 = Math.abs(f - (-1 + x0));
  const x1 = cellnoise(i);
  const d1 = Math.abs(f - x1);
  const x2 = cellnoise(i + 1);
  const d2 = Math.abs(f - (1 + x2));
  let r = d0;
  r = d1 < r ? d1 : r;
  r = d2 < r ? d2 : r;
  return r;
}
export function noise(x: number) {
  const i = Math.floor(x) | 0;
  const f = x - i;
  const w = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  const a = (2.0 * cellnoise(i + 0) - 1.0) * (f + 0.0);
  const b = (2.0 * cellnoise(i + 1) - 1.0) * (f - 1.0);
  return 2.0 * (a + (b - a) * w);
}
// These are all taken from
// https://easings.net/
export const c1 = 1.70158;
export const c2 = c1 * 1.525;
export const c3 = c1 + 1;
export const c4 = (2 * Math.PI) / 3;
export const c5 = (2 * Math.PI) / 4.5;
export const bounceOut = (x: number) => {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
};
export const linear = (x: number) => x;
export const easeInQuad = (x: number) => {
  return x * x;
};
export const easeOutQuad = (x: number) => {
  return 1 - (1 - x) * (1 - x);
};
export const easeInOutQuad = (x: number) => {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};
export const easeInCubic = (x: number) => {
  return x * x * x;
};
export const easeOutCubic = (x: number) => {
  return 1 - Math.pow(1 - x, 3);
};
export const easeInOutCubic = (x: number) => {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
export const easeInQuart = (x: number) => {
  return x * x * x * x;
};
export const easeOutQuart = (x: number) => {
  return 1 - Math.pow(1 - x, 4);
};
export const easeInOutQuart = (x: number) => {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
};
export const easeInQuint = (x: number) => {
  return x * x * x * x * x;
};
export const easeOutQuint = (x: number) => {
  return 1 - Math.pow(1 - x, 5);
};
export const easeInOutQuint = (x: number) => {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
};
export const easeInSine = (x: number) => {
  return 1 - Math.cos((x * Math.PI) / 2);
};
export const easeOutSine = (x: number) => {
  return Math.sin((x * Math.PI) / 2);
};
export const easeInOutSine = (x: number) => {
  return -(Math.cos(Math.PI * x) - 1) / 2;
};
export const easeInExpo = (x: number) => {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
};
export const easeOutExpo = (x: number) => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};
export const easeInOutExpo = (x: number) => {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
};
export const easeInCirc = (x: number) => {
  return 1 - Math.sqrt(1 - Math.pow(x, 2));
};
export const easeOutCirc = (x: number) => {
  return Math.sqrt(1 - Math.pow(x - 1, 2));
};
export const easeInOutCirc = (x: number) => {
  return x < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
};
export const easeInBack = (x: number) => {
  return c3 * x * x * x - c1 * x * x;
};
export const easeOutBack = (x: number) => {
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
export const easeInOutBack = (x: number) => {
  return x < 0.5
    ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
    : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
};
export const easeInElastic = (x: number) => {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
};
export const easeOutElastic = (x: number) => {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
};
export const easeInOutElastic = (x: number) => {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
    : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
};
export const easeInBounce = (x: number) => {
  return 1 - bounceOut(1 - x);
};
export const easeOutBounce = (x: number) => {
  return bounceOut(x);
};
export const easeInOutBounce = (x: number) => {
  return x < 0.5
    ? (1 - bounceOut(1 - 2 * x)) / 2
    : (1 + bounceOut(2 * x - 1)) / 2;
};

/**
 * This is kind of a hacky function in which we override and add a bunch of new methods to the Math object
 * This allows us to add all of our custom code functions without needing to explicitly import each one or defined
 * it in the head
 */
export function extendMath() {
  const funcs = [
    ['noise', noise],
    ['stepNaN', stepNaN],
    ['clamp', clamp],
    ['saturate', saturate],
    ['remap', remap],
    ['smoothstep', smoothstep],
    ['ssign', ssign],
    ['radians', radians],
    ['degrees', degrees],
    ['inversesqrt', inversesqrt],
    ['rsqrt', rsqrt],
    ['rcbrt', rcbrt],
    ['rcp', rcp],
    ['fma', fma],
    ['step', step],
    ['mix', mix],
    ['lerp', lerp],
    ['over', over],
    ['tri', tri],
    ['sqr', sqr],
    ['frac', frac],
    ['fract', fract],
    ['exp2', exp2],
    ['exp10', exp10],
    ['mod', mod],
    ['cellnoise', cellnoise],
    ['voronoi', voronoi],
    ['noise', noise],
    ['linear', linear],
    ['bounceout', bounceOut],
    ['easeinquad', easeInQuad],
    ['easeoutquad', easeOutQuad],
    ['easeinoutquad', easeInOutQuad],
    ['easeincubic', easeInCubic],
    ['easeoutcubic', easeOutCubic],
    ['easeinoutcubic', easeInOutCubic],
    ['easeinquart', easeInQuart],
    ['easeoutquart', easeOutQuart],
    ['easeinoutquart', easeInOutQuart],
    ['easeinquint', easeInQuint],
    ['easeoutquint', easeOutQuint],
    ['easeinoutquint', easeInOutQuint],
    ['easeinsine', easeInSine],
    ['easeoutsine', easeOutSine],
    ['easeinoutsine', easeInOutSine],
    ['easeinexpo', easeInExpo],
    ['easeoutexpo', easeOutExpo],
    ['easeinoutexpo', easeInOutExpo],
    ['easeincirc', easeInCirc],
    ['easeoutcirc', easeOutCirc],
    ['easeinoutcirc', easeInOutCirc],
    ['easeinback', easeInBack],
    ['easeoutback', easeOutBack],
    ['easeinoutback', easeInOutBack],
    ['easeinelastic', easeInElastic],
    ['easeoutelastic', easeOutElastic],
    ['easeinoutelastic', easeInOutElastic],
    ['easeinbounce', easeInBounce],
    ['easeoutbounce', easeOutBounce],
    ['easeinoutbounce', easeInOutBounce],
  ];
  // Extend basic math
  // Always use lowercase function names
  funcs.forEach(([name, func]) => {
    // @ts-ignore
    Math[name] = func;
  });
}
