export interface GrapherTheme {
  // The color of the background
  mBackground: string;
  // The masked out background color
  mBackgroundOut: string;
  // The color of the text
  mText: string;
  // The color of the wide grids
  mGrid: string;
  // The color of the thin grids
  mGridThin: string;
  // The colors of the formulas
  mGraphs: string[];
}

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

export const FUNCS = {
  '()': {
    text: '()',
    description: 'Parenthesis',
  },
  '+': {
    text: '+',
    description: 'Add',
  },
  '-': {
    text: '-',
    description: 'Subtract',
  },
  '*': {
    text: '*',
    description: 'Multiply',
  },
  '/': {
    text: '/',
    description: 'Divide',
  },
  'rcp(x)': {
    text: 'rcp(',
    description: 'Reciprocal',
  },
  'fma(x,y,z)': {
    text: 'fma(',
    description: '',
  },
  '%': {
    text: '%',
    description: 'Modulo',
  },
  'mod(x,y)': {
    text: 'mod(',
    description: 'Modulo',
  },
  '^': {
    text: '^',
    description: 'Exponentiation',
  },
  '**': {
    text: '**',
    description: 'Exponentiation',
  },
  'pow(x,y)': {
    text: 'pow(',
    description: 'Function Exponentiation',
  },
  'exp(x)': {
    text: 'exp(',
    description: 'Exponentiation',
  },
  'exp2(x)': {
    text: 'exp2(',
    description: 'Exponentiation',
  },
  'exp10(x)': {
    text: 'exp10(',
    description: '',
  },
  'log(x)': {
    text: 'log(',
    description: '',
  },
  'log2(x)': {
    text: 'log2(',
    description: '',
  },
  'log10(x)': {
    text: 'log10(',
    description: '',
  },
  'sqrt(x)': {
    text: 'sqrt(',
    description: '',
  },
  'cbrt(x)': {
    text: 'cbrt(',
    description: '',
  },
  'rsqrt(x)': {
    text: 'rsqrt(',
    description: '',
  },
  'rcbrt(x)': {
    text: 'rcbrt(',
    description: '',
  },
  'inversesqrt(x)': {
    text: 'inversesqrt(',
    description: '',
  },
  'abs(x)': {
    text: 'abs(',
    description: '',
  },
  'sign(x)': {
    text: 'sign(',
    description: '',
  },
  'ssign(x)': {
    text: 'ssign(',
    description: '',
  },
  'cos(x)': {
    text: 'cos(',
    description: '',
  },
  'sin(x)': {
    text: 'sin(',
    description: '',
  },
  'tan(x)': {
    text: 'tan(',
    description: '',
  },
  'acos(x)': {
    text: 'acos(',
    description: '',
  },
  'asin(x)': {
    text: 'asin(',
    description: '',
  },
  'atan(x)': {
    text: 'atan(',
    description: '',
  },
  'atan2(x,y)': {
    text: 'atan2(',
    description: '',
  },
  'radians(x)': {
    text: 'radians(',
    description: '',
  },
  'degrees(x)': {
    text: 'degrees(',
    description: '',
  },
  'cosh(x)': {
    text: 'cosh(',
    description: '',
  },
  'sinh(x)': {
    text: 'sinh(',
    description: '',
  },
  'tanh(x)': {
    text: 'tanh(',
    description: '',
  },
  'acosh(x)': {
    text: 'acosh(',
    description: '',
  },
  'asinh(x)': {
    text: 'asinh(',
    description: '',
  },
  'atanh(x)': {
    text: 'atanh(',
    description: '',
  },
  'ceil(x)': {
    text: 'ceil(',
    description: '',
  },
  'floor(x)': {
    text: 'floor(',
    description: '',
  },
  'trunc(x)': {
    text: 'trunc(',
    description: '',
  },
  'round(x)': {
    text: 'round(',
    description: '',
  },
  'frac(x)': {
    text: 'frac(',
    description: '',
  },
  'fract(x)': {
    text: 'fract(',
    description: '',
  },
  'min(x,y)': {
    text: 'min(',
    description: '',
  },
  'max(x,y)': {
    text: 'max(',
    description: '',
  },
  'saturate(x)': {
    text: 'saturate(',
    description: '',
  },
  'clamp(x,c,d)': {
    text: 'clamp(',
    description: '',
  },
  'step(a,x)': {
    text: 'step(',
    description: '',
  },
  'smoothstep(a,b,x)': {
    text: 'smoothstep(',
    description: '',
  },
  'over(x,y)': {
    text: 'over(',
    description: '',
  },
  'remap(a,b,x,c,d)': {
    text: 'remap(',
    description: '',
  },
  'mix(a,b,x)': {
    text: 'mix(',
    description: '',
  },
  'lerp(a,b,x)': {
    text: 'lerp(',
    description: '',
  },
  'tri(a,x)': {
    text: 'tri(',
    description: '',
  },
  'sqr(a,x)': {
    text: 'sqr(',
    description: '',
  },
  'noise(x)': {
    text: 'noise(',
    description: '',
  },
  'cellnoise(x)': {
    text: 'cellnoise(',
    description: '',
  },
  'voronoi(x)': {
    text: 'voronoi(',
    description: '',
  },
  PI: {
    text: 'PI',
    description: '',
  },
  E: {
    text: 'E',
    description: '',
  },
  PHI: {
    text: 'PHI',
    description: '',
  },
  LN10: {
    text: 'LN10',
    description: '',
  },
  LN2: {
    text: 'LN2',
    description: '',
  },
  LOG10E: {
    text: 'LOG10E',
    description: '',
  },
  LOG2E: {
    text: 'LOG2E',
    description: '',
  },
  SQRT2: {
    text: 'SQRT2',
    description: '',
  },
  SQRT1_2: {
    text: 'SQRT1_2',
    description: '',
  },
  '𝜋': {
    text: '𝜋',
    description: '',
  },
  '𝜏': {
    text: '𝜏',
    description: '',
  },
  φ: {
    text: 'φ',
    description: '',
  },
  '²': {
    text: '²',
    description: '',
  },
  '³': {
    text: '³',
    description: '',
  },
  '⁴': {
    text: '⁴',
    description: '',
  },
  '⁵': {
    text: '⁵',
    description: '',
  },
  '⁶': {
    text: '⁶',
    description: '',
  },
  '⁷': {
    text: '⁷',
    description: '',
  },
  '⁸': {
    text: '⁸',
    description: '',
  },
  '⁹': {
    text: '⁹',
    description: '',
  },
  '½': {
    text: '½',
    description: '',
  },
  '⅓': {
    text: '⅓',
    description: '',
  },
  '⅔': {
    text: '⅔',
    description: '',
  },
  '¼': {
    text: '¼',
    description: '',
  },
  '¾': {
    text: '¾',
    description: '',
  },
  '⅕': {
    text: '⅕',
    description: '',
  },
  '⅖': {
    text: '⅖',
    description: '',
  },
  '⅗': {
    text: '⅗',
    description: '',
  },
  '⅘': {
    text: '⅘',
    description: '',
  },
  '⅙': {
    text: '⅙',
    description: '',
  },
  '⅚': {
    text: '⅚',
    description: '',
  },
  '⅐': {
    text: '⅐',
    description: '',
  },
  '⅛': {
    text: '⅛',
    description: '',
  },
  '⅜': {
    text: '⅜',
    description: '',
  },
  '⅝': {
    text: '⅝',
    description: '',
  },
  '⅞': {
    text: '⅞',
    description: '',
  },
  '⅑': {
    text: '⅑',
    description: '',
  },
  '⅒': {
    text: '⅒',
    description: '',
  },
};

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
