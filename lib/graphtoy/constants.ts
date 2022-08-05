import { sortById } from '../utils';
import { Formula, GrapherTheme, Variable, VisualizerState } from './types';

/**
 * Map a formula from a string to a formula
 * We have to leave this in constants or get a weird build error
 * @param fs The formula string
 * @param id The ID of the formula
 */
export const mapFormulaStringArray = (fs: string, id: number) => ({
  enabled: true,
  id,
  value: fs,
  visualizer:
    id === 0 ? ([true, true, true] as VisualizerState) : defaultVisualizer,
});

export const defaultVariables: Variable[] = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
].map((name, idx) => ({
  name,
  id: idx,
  value: 0.0,
  step: 0.01,
  min: -1,
  max: 1,
}));

export const defaultVisualizer: [boolean, boolean, boolean] = [
  false,
  false,
  false,
];

export const emptyFormula: Formula = {
  value: '',
  enabled: true,
  id: -1,
  visualizer: defaultVisualizer,
};

export const defaultFormulas: Formula[] = ['x*A', '', '', '', '', '']
  .map(mapFormulaStringArray)
  .sort(sortById);

export const exampleFormulas1: Formula[] = [
  '4 + 4 * smoothstep(0, 0.7, sin(x+t)) * A',
  'sqrt(9^2 - x^2) + B',
  '3 * sin(x) / x + C',
  '2 * noise(3*x+t) + f3(x, t) + D',
  '(t + floor(x-t)) / (2-5) + E',
  'sin(f5(x, t)) - 5 + F',
]
  .map(mapFormulaStringArray)
  .sort(sortById);

export const exampleFormulas2: Formula[] = [
  'sqrt(8^2-x^2)',
  '-f1(x,t)',
  '7/2-sqrt(3^2-(abs(x)-3.5)^2)',
  '7/2+sqrt(3^2-(abs(x)-3.5)^2)/2',
  '3+sqrt(1-(abs(x+sin(4*t)/2)-3)^2)*2/3',
  '-3-sqrt(5^2-x^2)*(1/4+pow(0.5+0.5*sin(2*PI*t),6)/10)',
]
  .map(mapFormulaStringArray)
  .sort(sortById);

export const exampleFormulas3: Formula[] = [
  '2+2*sin(floor(x+t)*4321)',
  'max(sqrt(8^2-x^2),f1(x,t))',
  '-1',
  '-2',
  '-5',
  '0',
]
  .map(mapFormulaStringArray)
  .sort(sortById);

export const darkTheme: GrapherTheme = {
  mBackground: '#202020',
  mBackgroundOut: '#000000',
  mText: '#B0B0B0',
  mGrid: '#606060',
  mGridThin: '#404040',
  mGraphs: ['#ffc040', '#ffffa0', '#a0ffc0', '#40c0ff', '#d0a0ff', '#ff80b0'],
};

export const lightTheme: GrapherTheme = {
  mBackground: '#FFFFFF',
  mBackgroundOut: '#808080',
  mText: '#000000',
  mGrid: '#A0A0A0',
  mGridThin: '#D0D0D0',
  mGraphs: ['#ff8000', '#ffe800', '#40ff00', '#1040ff', '#ff10ff', '#ff0000'],
};

export interface FunctionParam {
  name: string;
  valueType: string;
  description: string | string[];
}
export interface FunctionData {
  text: string;
  description: string | string[];
  params: FunctionParam[];
}

export const FUNCS: Record<string, FunctionData>[] = [
  // Common Operations
  {
    '()': {
      text: '()',
      description: 'Parenthesis',
      params: [],
    },
    '+': {
      text: '+',
      description: 'Add',
      params: [],
    },
    '-': {
      text: '-',
      description: 'Subtract',
      params: [],
    },
    '*': {
      text: '*',
      description: 'Multiply',
      params: [],
    },
    '/': {
      text: '/',
      description: 'Divide',
      params: [],
    },
    'rcp(x)': {
      text: 'rcp(',
      description: 'Reciprocal',
      params: [
        {
          name: 'x',
          description: 'The value to get the recriprocal of',
          valueType: 'number',
        },
      ],
    },
    'fma(x,y,z)': {
      text: 'fma(',
      description:
        'Multiply-add Returns x*y+z. The function computes the result without losing precision in any intermediate result.',
      params: [
        {
          name: 'x',
          description: 'The value to multiply',
          valueType: 'number',
        },
        {
          name: 'y',
          description: 'The value to multiply',
          valueType: 'number',
        },
        {
          name: 'z',
          description: 'The value to add.',
          valueType: 'number',
        },
      ],
    },
    '%': {
      text: '%',
      description: 'Modulo',
      params: [],
    },
    'mod(x,y)': {
      text: 'mod(',
      description: 'Modulo',
      params: [
        {
          name: 'x',
          description: 'The value to get the modulo of',
          valueType: 'number',
        },
        {
          name: 'y',
          description: 'The modulo value Example:  x % _y_',
          valueType: 'number',
        },
      ],
    },
  },
  // Exp/Log
  {
    '^': {
      text: '^',
      description: 'Exponentiation',
      params: [],
    },
    '**': {
      text: '**',
      description: 'Exponentiation',
      params: [],
    },
    'pow(x,y)': {
      text: 'pow(',
      description: 'Returns x to the power y.',
      params: [
        { name: 'x', description: 'A base value.', valueType: 'number' },
        {
          name: 'y',
          description: 'The power to raise the base.',
          valueType: 'number',
        },
      ],
    },
    'exp(x)': {
      text: 'exp(',
      description:
        'Natural exponential function. EXP(x) returns the natural exponential of x.',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'exp2(x)': {
      text: 'exp2(',
      description:
        'Returns the base-2 exponential function of x, which is 2 raised to the power x: 2x.',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'exp10(x)': {
      text: 'exp10(',
      description: 'return the value of 10 raised to the power of x.',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'log(x)': {
      text: 'log(',
      description: 'Returns the natural logarithm x.',
      params: [
        {
          name: 'x',
          description: 'Scalar of which to determine the natural logarithm.',
          valueType: 'number',
        },
      ],
    },
    'log2(x)': {
      text: 'log2(',
      description: 'Returns the base-2 logarithm x.',
      params: [
        {
          name: 'x',
          description: 'Scalar of which to determine the base-2 logarithm.',
          valueType: 'number',
        },
      ],
    },
    'log10(x)': {
      text: 'log10(',
      description: 'Returns the base-10 logarithm x',
      params: [
        {
          name: 'x',
          description: 'Scalar of which to determine the base-10 logarithm.',
          valueType: 'number',
        },
      ],
    },
  },
  // sqrt/sign
  {
    'sqrt(x)': {
      text: 'sqrt(',
      description: 'Returns the square root of a.',
      params: [
        {
          name: 'x',
          description: 'Scalar of which to determine the square root.',
          valueType: 'number',
        },
      ],
    },
    'cbrt(x)': {
      text: 'cbrt(',
      description: 'Returns the cube root of a number',
      params: [
        {
          name: 'x',
          description: 'Scalar to get the cube root of.',
          valueType: 'number',
        },
      ],
    },
    'rsqrt(x)': {
      text: 'rsqrt(',
      description:
        'Returns an approximation to the reciprocal square root of a.',
      params: [
        {
          name: 'x',
          description:
            'scalar of which to determine the reciprocal square root',
          valueType: 'number',
        },
      ],
    },
    'rcbrt(x)': {
      text: 'rcbrt(',
      description: 'Returns the inverse cube-root value of the input.',
      params: [
        {
          name: 'x',
          description: 'scalar of which to determine the inverse cube root',
          valueType: 'number',
        },
      ],
    },
    'inversesqrt(x)': {
      text: 'inversesqrt(',
      description: 'return the inverse of the square root of the parameter',
      params: [
        {
          name: 'x',
          description:
            'The value of which to take the inverse of the square root.',
          valueType: 'number',
        },
      ],
    },
    'abs(x)': {
      text: 'abs(',
      description: 'Returns the absolute value of a scalar.',
      params: [
        {
          name: 'x',
          description: 'Scalar of which to determine the absolute value.',
          valueType: 'number',
        },
      ],
    },
    'sign(x)': {
      text: 'sign(',
      description: [
        "Returns positive one, zero, or negative one for each of the components of x based on the component's sign.",
        '1) Returns -1 component if the respective component of x is negative.',
        '2) Returns 0 component if the respective component of x is zero.',
        '3) Returns 1 component if the respective component of x is positive.',
        '4) Ideally, NaN returns NaN.',
      ],
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'ssign(x)': {
      text: 'ssign(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
  },
  // sin/cos/tan
  {
    'cos(x)': {
      text: 'cos(',
      description:
        'Returns the cosine of x in radians. The return value is in the range [-1,+1].',
      params: [
        {
          name: 'x',
          description: 'Scalar of which to determine the cosine.',
          valueType: 'number',
        },
      ],
    },
    'sin(x)': {
      text: 'sin(',
      description:
        'Returns the sine of x in radians. The return value is in the range [-1,+1].',
      params: [
        {
          name: 'x',
          description: 'Scalar of which to determine the sine.',
          valueType: 'number',
        },
      ],
    },
    'tan(x)': {
      text: 'tan(',
      description: 'Returns the tangent of x in radians.',
      params: [
        {
          name: 'x',
          description: 'Scalar of which to determine the tangent.',
          valueType: 'number',
        },
      ],
    },
    'acos(x)': {
      text: 'acos(',
      description:
        'Returns the arccosine of x in the range [0,pi], expecting x to be in the range [-1,+1].',
      params: [
        {
          name: 'x',
          description: 'Scalar of which to determine the arccosine.',
          valueType: 'number',
        },
      ],
    },
    'asin(x)': {
      text: 'asin(',
      description:
        'Returns the arcsine of a in the range [-pi/2,+pi/2], expecting a to be in the range [-1,+1].',
      params: [
        {
          name: 'x',
          description: 'Scalar of which to determine the arcsine.',
          valueType: 'number',
        },
      ],
    },
    'atan(x)': {
      text: 'atan(',
      description:
        'Returns the arctangent of x in the range of -pi/2 to pi/2 radians.',
      params: [
        {
          name: 'x',
          description: 'scalar of which to determine the arctangent.',
          valueType: 'number',
        },
      ],
    },
    'atan2(y, x)': {
      text: 'atan2(',
      description:
        'atan2 calculates the arctangent of y/x. atan2 is well defined for every point other than the origin, even if x equals 0 and y does not equal 0.',
      params: [
        {
          name: 'x',
          description:
            'Scalar for numerator of ratio of which to determine the arctangent.',
          valueType: 'number',
        },
        {
          name: 'y',
          description:
            'Scalar of denominator of ratio of which to determine the arctangent.',
          valueType: 'number',
        },
      ],
    },
    'radians(x)': {
      text: 'radians(',
      description: 'Convert a value to radians from degrees',
      params: [
        { name: 'x', description: 'A value in degrees', valueType: 'number' },
      ],
    },
    'degrees(x)': {
      text: 'degrees(',
      description: 'Convert a value to degrees from radians',
      params: [
        { name: 'x', description: 'A value in radians', valueType: 'number' },
      ],
    },
  },
  // sinh/cosh/tanh
  {
    'cosh(x)': {
      text: 'cosh(',
      description: 'Returns the hyperbolic cosine of a.',
      params: [
        {
          name: 'x',
          description: 'The specified value, in radians.',
          valueType: 'number',
        },
      ],
    },
    'sinh(x)': {
      text: 'sinh(',
      description: 'Returns the hyperbolic sine of x.',
      params: [
        {
          name: 'x',
          description: 'The specified value, in radians.',
          valueType: 'number',
        },
      ],
    },
    'tanh(x)': {
      text: 'tanh(',
      description: 'Returns the hyperbolic tangent of x.',
      params: [
        {
          name: 'x',
          description: 'The specified value, in radians.',
          valueType: 'number',
        },
      ],
    },
    'acosh(x)': {
      text: 'acosh(',
      description: 'Returns the hyperbolic arccosine of x.',
      params: [
        {
          name: 'x',
          description: 'The specified value, in radians.',
          valueType: 'number',
        },
      ],
    },
    'asinh(x)': {
      text: 'asinh(',
      description: 'Returns the hyperbolic arcsine of x.',
      params: [
        {
          name: 'x',
          description: 'The specified value, in radians.',
          valueType: 'number',
        },
      ],
    },
    'atanh(x)': {
      text: 'atanh(',
      description: 'Returns the hyperbolic arctangent of x.',
      params: [
        {
          name: 'x',
          description: 'The specified value, in radians.',
          valueType: 'number',
        },
      ],
    },
  },
  // frac/ceil
  {
    'ceil(x)': {
      text: 'ceil(',
      description:
        'Returns the ceiling or smallest integer not less than a scalar',
      params: [
        {
          name: 'x',
          description: 'Value to get the ceil of',
          valueType: 'number',
        },
      ],
    },
    'floor(x)': {
      text: 'floor(',
      description:
        'Returns the floor or largest integer not greater than a scalar ',
      params: [
        { name: 'x', description: 'Value to floor', valueType: 'number' },
      ],
    },
    'trunc(x)': {
      text: 'trunc(',
      description:
        'Returns the integral value nearest to but no larger in magnitude than x.\n',
      params: [
        { name: 'x', description: 'Value to truncate', valueType: 'number' },
      ],
    },
    'round(x)': {
      text: 'round(',
      description: 'Returns the rounded value of a scalar',
      params: [
        { name: 'x', description: 'Value to round', valueType: 'number' },
      ],
    },
    'frac(x)': {
      text: 'frac(',
      description: 'Returns the fractional portion of a scalar.',
      params: [
        {
          name: 'x',
          description: 'Value to return the fractional portion of',
          valueType: 'number',
        },
      ],
    },
    'fract(x)': {
      text: 'fract(',
      description: 'Returns the fractional portion of a scalar.',
      params: [
        {
          name: 'x',
          description: 'Value to return the fractional portion of',
          valueType: 'number',
        },
      ],
    },
  },
  // clamps
  {
    'min(x,y)': {
      text: 'min(',
      description: 'The x or y parameter, whichever is the smallest value.',
      params: [
        { name: 'x', description: 'The x input value.', valueType: 'number' },
        { name: 'y', description: 'The y input value.', valueType: 'number' },
      ],
    },
    'max(x,y)': {
      text: 'max(',
      description: 'The x or y parameter, whichever is the largest value.',
      params: [
        {
          name: 'x',
          description: 'The x input value.',
          valueType: 'number',
        },
        { name: 'y', description: 'The y input value.', valueType: 'number' },
      ],
    },
    'saturate(x)': {
      text: 'saturate(',
      description: [
        'Returns x saturated to the range [0,1] as follows:',
        '1) Returns 0 if x is less than 0; else\n',
        '2) Returns 1 if x is greater than 1; else\n',
        '3) Returns x otherwise.',
      ],
      params: [
        { name: 'x', description: 'A value to saturate', valueType: 'number' },
      ],
    },
    'clamp(x,c,d)': {
      text: 'clamp(',
      description: [
        'Returns x clamped to the range [a,b] as follows:',
        '1) Returns a if x is less than a; else',
        '2) Returns b if x is greater than b; else',
        '3) Returns x otherwise.',
      ],
      params: [
        { name: 'x', description: 'The value to clamp', valueType: 'number' },
        { name: 'c', description: 'The min value', valueType: 'number' },
        { name: 'd', description: 'The max value', valueType: 'number' },
      ],
    },
    'step(y,x)': {
      text: 'step(',
      description:
        'Compares two values, returning 0 or 1 based on which value is greater. (x >= y) ? 1 : 0',
      params: [
        {
          name: 'y',
          description: 'The first value to compare',
          valueType: 'number',
        },
        {
          name: 'x',
          description: 'The second value to compare',
          valueType: 'number',
        },
      ],
    },
    'smoothstep(a,b,x)': {
      text: 'smoothstep(',
      description:
        'Returns a smooth Hermite interpolation between 0 and 1, if x is in the range [min, max].\n',
      params: [
        {
          name: 'a',
          description: 'The minimum range of the x parameter.',
          valueType: 'number',
        },
        {
          name: 'b',
          description: 'The maximum range of the x parameter.',
          valueType: 'number',
        },
        {
          name: 'x',
          description: 'The specified value to be interpolated.',
          valueType: 'number',
        },
      ],
    },
    'over(x,y)': {
      text: 'over(',
      description: '',
      params: [
        { name: 'x', description: '', valueType: 'number' },
        { name: 'y', description: '', valueType: 'number' },
      ],
    },
  },
  // glsl
  {
    'remap(a,b,x,c,d)': {
      text: 'remap(',
      description: 'Remap a value from an old range to a new range.',
      params: [
        {
          name: 'a',
          description: 'The old minimum value.',
          valueType: 'number',
        },
        {
          name: 'b',
          description: 'The old maximum value.',
          valueType: 'number',
        },
        { name: 'x', description: 'The value to remap.', valueType: 'number' },
        { name: 'c', description: 'The new min value.', valueType: 'number' },
        { name: 'd', description: 'The new max value.', valueType: 'number' },
      ],
    },
    'mix(a,b,x)': {
      text: 'mix(',
      description: 'Performs a linear interpolation.',
      params: [
        { name: 'a', description: 'The first value', valueType: 'number' },
        { name: 'b', description: 'The second value', valueType: 'number' },
        {
          name: 'x',
          description:
            'A value that linearly interpolates between the a parameter and the b parameter.',
          valueType: 'number',
        },
      ],
    },
    'lerp(a,b,x)': {
      text: 'lerp(',
      description: 'Performs a linear interpolation.',
      params: [
        { name: 'a', description: 'The first value', valueType: 'number' },
        { name: 'b', description: 'The second value', valueType: 'number' },
        {
          name: 'x',
          description:
            'A value that linearly interpolates between the a parameter and the b parameter.',
          valueType: 'number',
        },
      ],
    },
    'tri(a,x)': {
      text: 'tri(',
      description: '',
      params: [
        { name: 'a', description: '', valueType: 'number' },
        { name: 'x', description: '', valueType: 'number' },
      ],
    },
    'sqr(a,x)': {
      text: 'sqr(',
      description: '',
      params: [
        { name: 'a', description: '', valueType: 'number' },
        { name: 'x', description: '', valueType: 'number' },
      ],
    },
    'noise(x)': {
      text: 'noise(',
      description: '',
      params: [{ name: 'a', description: '', valueType: 'number' }],
    },
    'cellnoise(x)': {
      text: 'cellnoise(',
      description: '',
      params: [{ name: 'a', description: '', valueType: 'number' }],
    },
    'voronoi(x)': {
      text: 'voronoi(',
      description: '',
      params: [{ name: 'a', description: '', valueType: 'number' }],
    },
  },
  // irrational
  {
    PI: {
      text: 'PI',
      description: '3.14159265359',
      params: [],
    },
    E: {
      text: 'E',
      description: "Euler's number: 2.71828",
      params: [],
    },
    PHI: {
      text: 'PHI',
      description: '1.61803 (AKA The Golden Ratio)',
      params: [],
    },
    LN10: {
      text: 'LN10',
      description: '2.3025850929940459 A value that represents the logarithm base e of 10, the natural logarithm of 10.',
      params: [],
    },
    LN2: {
      text: 'LN2',
      description: '0.69314718055994529 A value that represents the logarithm base e of 2, the natural logarithm of 2.',
      params: [],
    },
    LOG10E: {
      text: 'LOG10E',
      description: '0.43429448190325182 A value that represents the logarithm base 10 of e, the common logarithm of e.',
      params: [],
    },
    LOG2E: {
      text: 'LOG2E',
      description: '1.4426950408889634 A value that represents the logarithm base 2 of e, the binary logarithm of e.',
      params: [],
    },
    SQRT2: {
      text: 'SQRT2',
      description: '1.4142135623730951 A value that represents √2.',
      params: [],
    },
    SQRT1_2: {
      text: 'SQRT1_2',
      description: '0.70710678118654757 Stores a value that represents the following equivalent values: (√2)/2, √(½), and 1/(√2).',
      params: [],
    },
  },
  // irrational symbols
  {
    '𝜋': {
      text: '𝜋',
      description: '',
      params: [],
    },
    '𝜏': {
      text: '𝜏',
      description: '',
      params: [],
    },
    φ: {
      text: 'φ',
      description: '',
      params: [],
    },
    '²': {
      text: '²',
      description: '',
      params: [],
    },
    '³': {
      text: '³',
      description: '',
      params: [],
    },
    '⁴': {
      text: '⁴',
      description: '',
      params: [],
    },
    '⁵': {
      text: '⁵',
      description: '',
      params: [],
    },
    '⁶': {
      text: '⁶',
      description: '',
      params: [],
    },
    '⁷': {
      text: '⁷',
      description: '',
      params: [],
    },
    '⁸': {
      text: '⁸',
      description: '',
      params: [],
    },
    '⁹': {
      text: '⁹',
      description: '',
      params: [],
    },
  },
  // Fractional Symbols
  {
    '½': {
      text: '½',
      description: '',
      params: [],
    },
    '⅓': {
      text: '⅓',
      description: '',
      params: [],
    },
    '⅔': {
      text: '⅔',
      description: '',
      params: [],
    },
    '¼': {
      text: '¼',
      description: '',
      params: [],
    },
    '¾': {
      text: '¾',
      description: '',
      params: [],
    },
    '⅕': {
      text: '⅕',
      description: '',
      params: [],
    },
    '⅖': {
      text: '⅖',
      description: '',
      params: [],
    },
    '⅗': {
      text: '⅗',
      description: '',
      params: [],
    },
    '⅘': {
      text: '⅘',
      description: '',
      params: [],
    },
    '⅙': {
      text: '⅙',
      description: '',
      params: [],
    },
    '⅚': {
      text: '⅚',
      description: '',
      params: [],
    },
    '⅐': {
      text: '⅐',
      description: '',
      params: [],
    },
    '⅛': {
      text: '⅛',
      description: '',
      params: [],
    },
    '⅜': {
      text: '⅜',
      description: '',
      params: [],
    },
    '⅝': {
      text: '⅝',
      description: '',
      params: [],
    },
    '⅞': {
      text: '⅞',
      description: '',
      params: [],
    },
    '⅑': {
      text: '⅑',
      description: '',
      params: [],
    },
    '⅒': {
      text: '⅒',
      description: '',
      params: [],
    },
  },
];

export const kPHI = '(1.61803398874989484820)';

// ripped from Ed Mackey
export const kBlackList = [
  '?',
  '=',
  '[',
  ']',
  "'",
  ';',
  'new',
  'ml',
  '$',
  ').',
  'alert',
  'ook',
  'ipt',
  'doc',
  'win',
  'set',
  'get',
  'tim',
  'net',
  'post',
  'black',
  'z',
  'if',
];

export const symbolSubs = [
  ['^', '**'],
  ['²', '**2'],
  ['³', '**3'],
  ['\u2074', '**4'],
  ['\u2075', '**5'],
  ['\u2076', '**6'],
  ['\u2077', '**7'],
  ['\u2078', '**8'],
  ['\u2079', '**9'],
  ['𝜋', 'PI'],
  ['π', 'PI'],
  ['𝛑', 'PI'],
  ['𝝅', 'PI'],
  ['𝞹', 'PI'],
  ['PHI', kPHI],
  ['\u03C6', kPHI],
  ['TAU', '(2*PI)'],
  ['𝜏', '(2*PI)'],
  ['½', '(1/2)'],
  ['⅓', '(1/3)'],
  ['⅔', '(2/3)'],
  ['¼', '(1/4)'],
  ['¾', '(3/4)'],
  ['⅕', '(1/5)'],
  ['⅖', '(2/5)'],
  ['⅗', '(3/5)'],
  ['⅘', '(4/5)'],
  ['⅙', '(1/6)'],
  ['⅚', '(5/6)'],
  ['⅐', '(1/7)'],
  ['⅛', '(1/8)'],
  ['⅜', '(3/8)'],
  ['⅝', '(5/8)'],
  ['⅞', '(7/8)'],
  ['⅑', '(1/9)'],
  ['⅒', '(1/10)'],
];
