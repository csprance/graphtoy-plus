// A variable is a data structure that can be used in a formula and value dynamically adjusted with a slider
export interface Variable {
  // The name of the variable which is also the identifier
  name: string;
  // The value of the variable
  value: number;
  // primary key
  id: number;
  // The min value this variable can accept
  min: number;
  // The max value this variable can accept
  max: number;
  // How much the value should be incremented by
  step: number;
}

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
