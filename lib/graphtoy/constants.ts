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
  description: string;
}
export interface FunctionData {
  text: string;
  description: string;
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
      description: '',
      params: [],
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
      description: 'Function Exponentiation',
      params: [
        { name: 'x', description: '', valueType: 'number' },
        { name: 'y', description: '', valueType: 'number' },
      ],
    },
    'exp(x)': {
      text: 'exp(',
      description: 'Exponentiation',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'exp2(x)': {
      text: 'exp2(',
      description: 'Exponentiation',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'exp10(x)': {
      text: 'exp10(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'log(x)': {
      text: 'log(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'log2(x)': {
      text: 'log2(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'log10(x)': {
      text: 'log10(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
  },
  // sqrt/sign
  {
    'sqrt(x)': {
      text: 'sqrt(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'cbrt(x)': {
      text: 'cbrt(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'rsqrt(x)': {
      text: 'rsqrt(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'rcbrt(x)': {
      text: 'rcbrt(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'inversesqrt(x)': {
      text: 'inversesqrt(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'abs(x)': {
      text: 'abs(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'sign(x)': {
      text: 'sign(',
      description: '',
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
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'sin(x)': {
      text: 'sin(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'tan(x)': {
      text: 'tan(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'acos(x)': {
      text: 'acos(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'asin(x)': {
      text: 'asin(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'atan(x)': {
      text: 'atan(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'atan2(x,y)': {
      text: 'atan2(',
      description: '',
      params: [
        { name: 'x', description: '', valueType: 'number' },
        { name: 'y', description: '', valueType: 'number' },
      ],
    },
    'radians(x)': {
      text: 'radians(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'degrees(x)': {
      text: 'degrees(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
  },
  // sinh/cosh/tanh
  {
    'cosh(x)': {
      text: 'cosh(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'sinh(x)': {
      text: 'sinh(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'tanh(x)': {
      text: 'tanh(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'acosh(x)': {
      text: 'acosh(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'asinh(x)': {
      text: 'asinh(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'atanh(x)': {
      text: 'atanh(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
  },
  // frac/ceil
  {
    'ceil(x)': {
      text: 'ceil(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'floor(x)': {
      text: 'floor(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'trunc(x)': {
      text: 'trunc(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'round(x)': {
      text: 'round(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'frac(x)': {
      text: 'frac(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'fract(x)': {
      text: 'fract(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
  },
  // clamps
  {
    'min(x,y)': {
      text: 'min(',
      description: '',
      params: [
        { name: 'x', description: '', valueType: 'number' },
        { name: 'y', description: '', valueType: 'number' },
      ],
    },
    'max(x,y)': {
      text: 'max(',
      description: '',
      params: [
        { name: 'x', description: '', valueType: 'number' },
        { name: 'y', description: '', valueType: 'number' },
      ],
    },
    'saturate(x)': {
      text: 'saturate(',
      description: '',
      params: [{ name: 'x', description: '', valueType: 'number' }],
    },
    'clamp(x,c,d)': {
      text: 'clamp(',
      description: '',
      params: [
        { name: 'x', description: '', valueType: 'number' },
        { name: 'c', description: '', valueType: 'number' },
        { name: 'd', description: '', valueType: 'number' },
      ],
    },
    'step(a,x)': {
      text: 'step(',
      description: '',
      params: [
        { name: 'a', description: '', valueType: 'number' },
        { name: 'x', description: '', valueType: 'number' },
      ],
    },
    'smoothstep(a,b,x)': {
      text: 'smoothstep(',
      description: '',
      params: [
        { name: 'a', description: '', valueType: 'number' },
        { name: 'b', description: '', valueType: 'number' },
        { name: 'x', description: '', valueType: 'number' },
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
      description: '',
      params: [
        { name: 'a', description: '', valueType: 'number' },
        { name: 'b', description: '', valueType: 'number' },
        { name: 'x', description: '', valueType: 'number' },
        { name: 'c', description: '', valueType: 'number' },
        { name: 'd', description: '', valueType: 'number' },
      ],
    },
    'mix(a,b,x)': {
      text: 'mix(',
      description: '',
      params: [
        { name: 'a', description: '', valueType: 'number' },
        { name: 'b', description: '', valueType: 'number' },
        { name: 'x', description: '', valueType: 'number' },
      ],
    },
    'lerp(a,b,x)': {
      text: 'lerp(',
      description: '',
      params: [
        { name: 'a', description: '', valueType: 'number' },
        { name: 'b', description: '', valueType: 'number' },
        { name: 'x', description: '', valueType: 'number' },
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
      description: '',
      params: [],
    },
    E: {
      text: 'E',
      description: '',
      params: [],
    },
    PHI: {
      text: 'PHI',
      description: '',
      params: [],
    },
    LN10: {
      text: 'LN10',
      description: '',
      params: [],
    },
    LN2: {
      text: 'LN2',
      description: '',
      params: [],
    },
    LOG10E: {
      text: 'LOG10E',
      description: '',
      params: [],
    },
    LOG2E: {
      text: 'LOG2E',
      description: '',
      params: [],
    },
    SQRT2: {
      text: 'SQRT2',
      description: '',
      params: [],
    },
    SQRT1_2: {
      text: 'SQRT1_2',
      description: '',
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
