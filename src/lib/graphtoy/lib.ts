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
