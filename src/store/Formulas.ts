export const mapFormulaStringArray = (fs: string, idx: number) => ({
  enabled: true,
  id: idx + 1,
  value: fs,
  visualizer: defaultVisualizer,
});

// A formula is the data structure that describes a math formula and metadata
export interface Formula {
  // The value is the expression to evaluate
  value: string;
  // Should this formula show up in the graph
  enabled: boolean;
  // What is the id of this formula
  id: number;
  // What channel is visualized
  visualizer: [boolean, boolean, boolean];
}

export const emptyFormula = {
  value: '',
  enabled: true,
  index: -1,
};

export const defaultVisualizer: [boolean, boolean, boolean] = [
  false,
  false,
  false,
];
export const defaultFormulas: Formula[] = ['x*A', '', '', '', '', ''].map(
  mapFormulaStringArray,
);
export const exampleFormulas1: Formula[] = [
  '4 + 4*smoothstep(0,0.7,sin(x+t))*A',
  'sqrt(9^2-x^2)+B',
  '3*sin(x)/x+C',
  '2*noise(3*x+t)+f3(x,t) + D',
  '(t + floor(x-t))/2 - 5 + E',
  'sin(f5(x,t)) - 5 + F',
].map(mapFormulaStringArray);
export const exampleFormulas2: Formula[] = [
  'sqrt(8^2-x^2)',
  '-f1(x,t)',
  '7/2-sqrt(3^2-(abs(x)-3.5)^2)',
  '7/2+sqrt(3^2-(abs(x)-3.5)^2)/2',
  '3+sqrt(1-(abs(x+sin(4*t)/2)-3)^2)*2/3',
  '-3-sqrt(5^2-x^2)*(1/4+pow(0.5+0.5*sin(2*PI*t),6)/10)',
].map(mapFormulaStringArray);
export const exampleFormulas3: Formula[] = [
  '2+2*sin(floor(x+t)*4321)',
  'max(sqrt(8^2-x^2),f1(x,t))',
  '-1',
  '-2',
  '-5',
  '0',
].map(mapFormulaStringArray);
