import { StateCreator } from 'zustand';
import produce from 'immer';
import {GrapherSlice, GrapherSliceActions, GrapherSliceState} from './grapher-slice';

export interface Formula {
  // The value is the expression to evaluate
  value: string;
  // Should this formula show up in the graph
  enabled: boolean;
  // What is the id of this formula
  index: number;
}
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
  { enabled: true, index: 1, value: '4 + 4*smoothstep(0,0.7,sin(x+t))' },
  { enabled: true, index: 2, value: 'sqrt(9^2-x^2)' },
  { enabled: true, index: 3, value: '3*sin(x)/x' },
  { enabled: true, index: 4, value: '2*noise(3*x+t)+f3(x,t)' },
  { enabled: true, index: 5, value: '(t + floor(x-t))/2 - 5' },
  { enabled: true, index: 6, value: 'sin(f5(x,t)) - 5' },
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

export interface FormulasSliceState {
  // An array of all the formulas displayed on the graph
  formulas: Formula[];
  // An array of all the formula colors
  formulaColors: string[];
  // The currently focused formula
  focusedFormula: number;
  //  Are the formulas compiled and valid
  formulasValid: boolean;
}
export interface FormulasSliceActions {
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
   * Set the formulas validity
   * @param status
   */
  setFormulasValid: (status: boolean) => void;

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
   * Sets a formula window as focused to be used with inject
   * @param index
   */
  setFocusedFormula: (index: number) => void;

  /**
   * Inject a string in to the active formula window
   * @param value
   */
  inject: (value: string) => void;

  /**
   * Get the url and parse the formula in to the app state
   */
  parseUrlFormulas: () => void;
}

export type FormulasSlice = FormulasSliceState & FormulasSliceActions;

export const formulasSlice: StateCreator<
  FormulasSlice,
  [['zustand/devtools', never]],
  []
> = (set,getState) => ({
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
  focusedFormula: 1,
  formulasValid: false,

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

  setExampleFormulas1: () =>
    set({ formulas: exampleFormulas1, formulasValid: false }),

  setExampleFormulas2: () =>
    set({ formulas: exampleFormulas2, formulasValid: false }),

  setExampleFormulas3: () =>
    set({ formulas: exampleFormulas3, formulasValid: false }),

  setFocusedFormula: (index) => set({ focusedFormula: index }),

  inject: (value) => {
    document.execCommand('insertText', false, value);
    set({ formulasValid: false });
  },

  parseUrlFormulas: () => {},
});
