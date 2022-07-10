import produce from 'immer';
import create from 'zustand';

import Grapher from '../lib/graphtoy';
import { makeMapPartialByID, sortById } from '../lib/utils';
import {
  Formula,
  VisualizerState,
  defaultFormulas,
  exampleFormulas1,
  exampleFormulas2,
  exampleFormulas3,
} from './Formulas';
import { Variable, defaultVariables } from './Variables';

export interface State {
  // An array of all the formulas displayed on the graph
  formulas: Formula[];
  // An array of all the formula colors
  formulaColors: string[];
  // An array of adjustable variables used in formulas
  variables: Variable[];
}

export interface Actions {
  /**
   * Set the formula value based on an index
   * @param id
   * @param value
   */
  setFormulaValue: (id: number, value: string) => void;
  /**
   * Set a formula partial using an id
   * @param id
   * @param partial
   */
  setFormulaByID: (id: number, partial: Partial<Formula>) => void;
  /**
   * Toggle the formula visibility on and off in the grid
   * @param id The ID of the formula to toggle
   */
  toggleFormulaVisibility: (id: number) => void;
  /**
   * Inject a string in to the active formula window
   * @param value The value to inject
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
   * Set and derive the state of the visualizers on each Formula given a visualizer state and an id
   * @param id The ID of the formula to set the visualizer state on
   * @param visualizerState a VisualizerState
   */
  setVisualizers: (id: number, visualizerState: VisualizerState) => void;
  /**
   * Given the state of the application create a link we can parse into the app state
   */
  createLink: () => void;
  /**
   * Get the url and parse the formula in to the app state
   */
  parseUrlFormulas: () => void;
  /**
   * Set a value on a variable
   * @param id The ID of the variable to set
   * @param partial A partial of a Variable to set
   */
  setVariable: (id: number, partial: Partial<Variable>) => void;
  /**
   * Add Grapher to our state to manipulate it globally
   * @param grapher
   */
  setGrapher: (grapher: Grapher) => void;
  grapher: Grapher;
}

export type MyStore = State & Actions;

export const useStore = create<MyStore>()((set, get) => ({
  // ////////////////////////////
  // Grapher
  grapher: new Grapher(),
  setGrapher: (grapher) => set({ grapher }),

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
      formulas: state.formulas
        .map(makeMapPartialByID(id + 1, partial))
        .sort(sortById),
    })),
  setFormulaValue: (id, value) => {
    get().setFormulaByID(id, { value });
  },
  clearFormulas: () => set({ formulas: defaultFormulas }),
  setExampleFormulas1: () => set({ formulas: exampleFormulas1 }),
  setExampleFormulas2: () => set({ formulas: exampleFormulas2 }),
  setExampleFormulas3: () => set({ formulas: exampleFormulas3 }),
  setVisualizers: (id, visualizerState) =>
    set(
      produce((draft) => {
        // Given an id and a visualizer state for that formula derive the other visualizer states
        // Only one Channel can be active for all formulas (One Red for all Formulas, One Green, one Blue)
        // Set the one we want to modify

        // Loop through the others and decide if they should be turned off
        for (let i = 0; i < draft.formulas.length; i++) {
          const f = draft.formulas[i];
          // If a value is true then all the others should be false otherwise leave em the same
          f.visualizer[0] = visualizerState[0] ? false : f.visualizer[0];
          f.visualizer[1] = visualizerState[1] ? false : f.visualizer[1];
          f.visualizer[2] = visualizerState[2] ? false : f.visualizer[2];
        }
        draft.formulas[id].visualizer = visualizerState;
      }),
    ),
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
