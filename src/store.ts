import create from 'zustand';
import produce from 'immer';
import { devtools } from 'zustand/middleware';
import Grapher from './lib/graphtoy';

////////////////////////////////
// State data
////////////////////////////////
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
export const emptyFormula = {
  value: '',
  enabled: true,
  index: -1,
};
export const defaultFormulas: Formula[] = [
  { enabled: true, index: 1, value: 'x' },
  { enabled: false, index: 2, value: '' },
  { enabled: false, index: 3, value: '' },
  { enabled: false, index: 4, value: '' },
  { enabled: false, index: 5, value: '' },
  { enabled: false, index: 6, value: '' },
];
export const exampleFormulas1: Formula[] = [
  { enabled: true, index: 1, value: '4 + 4*smoothstep(0,0.7,sin(x+t))*A' },
  { enabled: true, index: 2, value: 'sqrt(9^2-x^2)+B' },
  { enabled: true, index: 3, value: '3*sin(x)/x+C' },
  { enabled: true, index: 4, value: '2*noise(3*x+t)+f3(x,t) + D' },
  { enabled: true, index: 5, value: '(t + floor(x-t))/2 - 5 + E' },
  { enabled: true, index: 6, value: 'sin(f5(x,t)) - 5 + F' },
];
export const exampleFormulas2: Formula[] = [
  { enabled: true, index: 1, value: 'sqrt(8^2-x^2)' },
  { enabled: true, index: 2, value: '-f1(x,t)' },
  { enabled: true, index: 3, value: '7/2-sqrt(3^2-(abs(x)-3.5)^2)' },
  { enabled: true, index: 4, value: '7/2+sqrt(3^2-(abs(x)-3.5)^2)/2' },
  { enabled: true, index: 5, value: '3+sqrt(1-(abs(x+sin(4*t)/2)-3)^2)*2/3' },
  {
    enabled: true,
    index: 6,
    value: '-3-sqrt(5^2-x^2)*(1/4+pow(0.5+0.5*sin(2*PI*t),6)/10)',
  },
];
export const exampleFormulas3: Formula[] = [
  { enabled: true, index: 1, value: '2+2*sin(floor(x+t)*4321)' },
  { enabled: true, index: 2, value: 'max(sqrt(8^2-x^2),f1(x,t))' },
  { enabled: true, index: 3, value: '-1' },
  { enabled: true, index: 4, value: '-2' },
  { enabled: true, index: 5, value: '-5' },
  { enabled: true, index: 6, value: '0' },
];

////////////////////////////////
// Types
////////////////////////////////
// A formula is the data structure that describes a math formula and metadata
export interface Formula {
  // The value is the expression to evaluate
  value: string;
  // Should this formula show up in the graph
  enabled: boolean;
  // What is the id of this formula
  index: number;
}

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

export interface State {
  // This is used as the t value in our equations
  time: number;
  // What theme is applied light or dark default = dark
  theme: 'light' | 'dark';
  // An array of all the formulas displayed on the graph
  formulas: Formula[];
  // An array of all the formula colors
  formulaColors: string[];
  //  Are the formulas compiled and valid
  formulasValid: boolean;
  // What range do we display in the graph default 2
  rangeType: number; // [0, 1, 2] [0..1 = 0, -1..1 = 1, Free = 2]
  // What grid type are we displaying default = 1
  gridType: number; // [0, 1, 2] [Grid Off = 0 , Grid Dec = 1, Grid Bin = 2]
  // Is time currently paused default = false
  paused: boolean;
  // An array of adjustable variables used in formulas
  variables: Variable[];
}

export interface Actions {
  /**
   * Set the time value to whatever value
   * @param time
   */
  setTime: (time: number) => void;
  /**
   * Set the formula value based on an index
   * @param index
   * @param value
   */
  setFormulaValue: (index: number, value: string) => void;
  /**
   * Toggle the formula visibility on and off in the grid
   * @param index
   */
  toggleFormulaVisibility: (index: number) => void;

  /**
   * Inject a string in to the active formula window
   * @param value
   */
  inject: (value: string) => void;
  /**
   * Set the formulas validity
   * @param status
   */
  setFormulasValid: (status: boolean) => void;
  /**
   * Clear all the formulas and replace them with empty formulas
   */
  clearFormulas: () => void;
  /**
   * Set the formulas to the example formulas 1
   */
  setExampleFormulas1: () => void;
  /**
   * Set the formulas to the example formulas 2
   */
  setExampleFormulas2: () => void;
  /**
   * Set the formulas to the example formulas 2
   */
  setExampleFormulas3: () => void;
  /**
   * Toggle the theme between light and dark
   */
  toggleTheme: () => void;
  /**
   * Toggle the grid type between
   * [0, 1, 2] [Grid Off = 0 , Grid Dec = 1, Grid Bin = 2]
   */
  toggleGridType: () => void;
  /**
   * Toggle the range between
   * [0, 1, 2] [0..1 = 0, -1..1 = 1, Free = 2]
   */
  toggleRange: () => void;
  /**
   * Play or pause the graph time
   */
  togglePlay: () => void;
  /**
   * Given the state of the application create a link we can parse into the app state
   */
  createLink: () => void;
  /**
   * Get the url and parse the formula in to the app state
   */
  parseUrlFormulas: () => void;
  setVariable: (index: number, partial: Partial<Variable>) => void;
  setGrapher: (grapher: Grapher) => void;
  grapher?: Grapher;
}

export type MyStore = State & Actions;

export const useStore = create<State & Actions>()((set, getState) => ({
  grapher: undefined,
  setGrapher: (grapher) => set({ grapher }),
  // ////////////////////////////
  // Time Data
  //state
  time: 0,
  paused: false,
  //actions
  setTime: (time) => set((state) => ({ time })),
  togglePlay: () => {
    set((state) => ({
      paused: !state.paused,
    }));
  },
  // ////////////////////////////
  // Theme
  // state
  theme: 'light',
  // actions
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

  // ////////////////////////////
  // Grid Data
  // state
  gridType: 0,
  // actions
  toggleGridType: () =>
    set((state) => ({ gridType: (state.gridType + 1) % 3 })),

  // ////////////////////////////
  // Range Data
  // state
  rangeType: 2,
  // actions
  toggleRange: () => set((state) => ({ rangeType: (state.rangeType + 1) % 3 })),

  // ////////////////////////////
  // Formulas
  // state
  formulas: exampleFormulas1,
  formulaColors: [
    '#ffc040',
    '#ffffa0',
    '#a0ffc0',
    '#40c0ff',
    '#d0a0ff',
    '#ff80b0',
  ],
  formulasValid: false,
  // actions
  toggleFormulaVisibility: (index) => {
    set({ formulasValid: false });
    set((state) => ({
      formulas: [
        ...state.formulas.map((f) => ({
          ...f,
          enabled: f.index === index ? !f.enabled : f.enabled,
        })),
      ],
    }));
  },
  setFormulasValid: (status) => set((state) => ({ formulasValid: status })),
  setFormulaValue: (index, value) =>
    set(
      produce((state) => {
        state.formulasValid = false;
        state.formulas[index] = { ...state.formulas[index], value };
      })
    ),
  clearFormulas: () => set({ formulas: defaultFormulas }),
  setExampleFormulas1: () =>
    set({ formulas: exampleFormulas1, formulasValid: false }),
  setExampleFormulas2: () =>
    set({ formulas: exampleFormulas2, formulasValid: false }),
  setExampleFormulas3: () =>
    set({ formulas: exampleFormulas3, formulasValid: false }),
  inject: (value) => {
    document.execCommand('insertText', false, value);
    set({ formulasValid: false });
  },

  ///////////////////////
  // link parsing stuff
  createLink: () => {},
  parseUrlFormulas: () => {},

  ///////////////////////
  // Variables
  variables: defaultVariables,
  setVariable: (index, partial) =>
    set((state) => ({
      formulasValid: false,
      variables: state.variables.map((v) => {
        if (index === v.id) {
          return {
            ...v,
            ...partial,
          };
        }
        return v;
      }),
    })),
}));
