import axios from 'axios';
import produce from 'immer';
import { useLayoutEffect } from 'react';
import create, { StoreApi, UseBoundStore } from 'zustand';
import createContext from 'zustand/context';
import { combine } from 'zustand/middleware';

import Grapher from '../lib/graphtoy';
import {
  defaultFormulas,
  defaultVariables,
  exampleFormulas1,
  exampleFormulas2,
  exampleFormulas3,
} from '../lib/graphtoy/constants';
import { Formula, Variable, VisualizerState } from '../lib/graphtoy/types';
import { makeMapPartialByID, sortById } from '../lib/utils';

let store: StoreApi<MyStore>;

type InitialState = ReturnType<typeof getDefaultInitialState>;
type UseStoreState = typeof initializeStore extends (
  ...args: never
) => UseBoundStore<infer T>
  ? T
  : never;

export const getDefaultInitialState: () => State = () => ({
  formulas: exampleFormulas1,
  grapher: new Grapher(),
  notes: '',
  variables: defaultVariables,
  formulaColors: [
    '#ffc040',
    '#ffffa0',
    '#a0ffc0',
    '#40c0ff',
    '#d0a0ff',
    '#ff80b0',
  ],
});

export const { Provider, useStoreApi, useStore } =
  createContext<UseStoreState>();

export const initializeStore = (preloadedState = {}) =>
  create<MyStore>()(
    combine({ ...getDefaultInitialState(), ...preloadedState }, (set, get) => ({
      // /////////////////////////////
      // Notes
      setNotes: (notes) => set({ notes }),
      // ////////////////////////////
      // Grapher
      setGrapher: (grapher) => set({ grapher }),
      // ////////////////////////////
      // Formulas
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
            .map(makeMapPartialByID(id, partial))
            .sort(sortById),
        })),
      setFormulaValue: (id, value) => {
        (get() as any).setFormulaByID(id, { value });
      },
      clearFormulas: () => {
        get().grapher.resetCoords();
        set({ formulas: defaultFormulas });
      },
      setExampleFormulas1: () => {
        get().grapher.resetCoords();
        set({ formulas: exampleFormulas1 });
      },
      setExampleFormulas2: () => {
        get().grapher.resetCoords();
        set({ formulas: exampleFormulas2 });
      },
      setExampleFormulas3: () => {
        get().grapher.resetCoords();
        set({ formulas: exampleFormulas3 });
      },
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
      ///////////////////////
      // link parsing stuff
      createLink: async () => {
        // Get the state of the application that matters
        const state = get();
        // Send it off to our API to be added or return the existing url for us
        const { data } = await axios.post('/api/tinyurl', {
          state: { ...state, grapher: null },
        });
        // Create our new url based on the response data
        if (!data.err) {
          const url = new URL(window.location.href);
          url.pathname = data.url;
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
        } else {
          console.log('Creating link failed!');
        }
      },
      parseUrlFormulas: () => {
        const url = new URL(window.location.href);
        const variables = url.searchParams.get('variables');
        const formulas = url.searchParams.get('formulas');
        const notes = url.searchParams.get('notes');
        if (formulas) {
          set({
            formulas: JSON.parse(formulas),
          });
        }
        if (notes) {
          set({
            notes: JSON.parse(notes),
          });
        }
        if (variables) {
          set({
            variables: JSON.parse(variables),
          });
        }
      },
      ///////////////////////
      // Variables
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
    })),
  );

export const useCreateStore = (serverInitialState: InitialState) => {
  // For SSR & SSG, always use a new store.
  if (typeof window === 'undefined') {
    return () => initializeStore(serverInitialState);
  }

  const isReusingStore = Boolean(store);
  // For CSR, always re-use same store.
  store =
    store ?? initializeStore({ ...serverInitialState, grapher: new Grapher() });
  // And if initialState changes, then merge states in the next render cycle.
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    // serverInitialState is undefined for CSR pages. It is up to you if you want to reset
    // states on CSR page navigation or not. I have chosen not to, but if you choose to,
    // then add `serverInitialState = getDefaultInitialState()` here.
    if (serverInitialState && isReusingStore) {
      store.setState(
        {
          // re-use functions from existing store
          ...store.getState(),
          // but reset all other properties.
          ...serverInitialState,
          // Always create a new grapher instance
          // since we set it to null to store in cookies
          grapher: new Grapher(),
        },
        true, // replace states, rather than shallow merging
      );
    }
  });

  return () => store;
};

export interface State {
  // Notes on the current graph.
  notes: string;
  // The main class that handles rendering the graph
  grapher: Grapher;
  // An array of all the formulas displayed on the graph
  formulas: Formula[];
  // An array of all the formula colors
  formulaColors: string[];
  // An array of adjustable variables used in formulas
  variables: Variable[];
}

export interface Actions {
  /**
   * Sets the notes on the current graph
   * @param notes
   */
  setNotes: (notes: string) => void;
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
  createLink: () => Promise<void>;
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
}

export type MyStore = State & Actions;
