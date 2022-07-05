import create from 'zustand';

import Grapher from '../lib/graphtoy';
import { makeMapPartialByID } from '../lib/utils';
import {
  Formula,
  defaultFormulas,
  exampleFormulas1,
  exampleFormulas2,
  exampleFormulas3,
} from './Formulas';
import { Variable, defaultVariables } from './Variables';

export interface State {
  // This is used as the t value in our equations
  time: number;
  // What theme is applied light or dark default = dark
  theme: 'light' | 'dark';
  // An array of all the formulas displayed on the graph
  formulas: Formula[];
  // An array of all the formula colors
  formulaColors: string[];
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
  setFormulaValue: (id: number, value: string) => void;

  /**
   * Set a formula partial using an id
   * @param index
   * @param partial
   */
  setFormulaByID: (id: number, partial: Partial<Formula>) => void;

  /**
   * Toggle the formula visibility on and off in the grid
   * @param index
   */
  toggleFormulaVisibility: (id: number) => void;

  /**
   * Inject a string in to the active formula window
   * @param value
   */
  inject: (value: string) => void;
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
  setVariable: (id: number, partial: Partial<Variable>) => void;
  setGrapher: (grapher: Grapher) => void;
  grapher?: Grapher;
}

export type MyStore = State & Actions;

export const useStore = create<MyStore>()((set, get) => ({
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
  // actions
  toggleFormulaVisibility: (id) =>
    set((state) => ({
      formulas: [
        ...state.formulas.map((f) => ({
          ...f,
          enabled: f.id === id ? !f.enabled : f.enabled,
        })),
      ],
    })),
  setFormulaByID: (id, partial) =>
    set((state) => ({
      formulas: state.formulas.map(makeMapPartialByID(id + 1, partial)),
    })),
  setFormulaValue: (id, value) => {
    get().setFormulaByID(id, { value });
  },
  clearFormulas: () => set({ formulas: defaultFormulas }),
  setExampleFormulas1: () => set({ formulas: exampleFormulas1 }),
  setExampleFormulas2: () => set({ formulas: exampleFormulas2 }),
  setExampleFormulas3: () => set({ formulas: exampleFormulas3 }),
  inject: (value) => {
    document.execCommand('insertText', false, value);
  },

  ///////////////////////
  // link parsing stuff
  createLink: () => {
    // Get the state of the application that matters
    const state = get();
    const url = new URL(window.location.href);
    url.searchParams.set('variables', JSON.stringify(state.variables));
    url.searchParams.set('formulas', JSON.stringify(state.formulas));
    // Push it to clipboard and set it as the current URL
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url.toString()).then(
        function () {
          window.location.replace(url);
        },
        function (err) {
          window.location.replace(url);
        },
      );
    } else {
      window.location.replace(url);
    }
  },
  parseUrlFormulas: () => {
    const url = new URL(window.location.href);
    const variables = url.searchParams.get('variables');
    const formulas = url.searchParams.get('formulas');
    if (formulas && variables) {
      set({
        formulas: JSON.parse(formulas),
        variables: JSON.parse(variables),
      });
    }
  },

  ///////////////////////
  // Variables
  variables: defaultVariables,
  setVariable: (id, partial) =>
    set((state) => ({
      variables: state.variables
        .map(makeMapPartialByID(id, partial))
        .map((v) => ({
          ...v,
          // prevent Divide by zero
          value: v.value === 0 ? v.value + Number.EPSILON : v.value,
        })),
    })),
}));
