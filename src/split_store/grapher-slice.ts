import { StateCreator } from 'zustand';
import Grapher from "../lib/graphtoy";

export interface GrapherSliceState {
  // This is used as the t value in our equations
  time: number;
  // What theme is applied light or dark default = dark
  theme: 'light' | 'dark';
  // What range do we display in the graph default 2
  rangeType: number; // [0, 1, 2] [0..1 = 0, -1..1 = 1, Free = 2]
  // What grid type are we displaying default = 1
  gridType: number; // [0, 1, 2] [Grid Off = 0 , Grid Dec = 1, Grid Bin = 2]
  // Is time currently paused default = false
  paused: boolean;
}

export interface GrapherSliceActions {
  /**
   * Set the time value to whatever value
   * @param time
   */
  setTime: (time: number) => void;

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

  setGrapher: (grapher: Grapher)=> void;
  grapher?: Grapher;
}

export type GrapherSlice = GrapherSliceActions & GrapherSliceState;

export const grapherSlice: StateCreator<
    GrapherSlice,
  [['zustand/devtools', never]],
  []
> = (set) => ({
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

  createLink: () => {},
  grapher: undefined,
  setGrapher: (grapher)=> {
    set({
      grapher
    })
  }
});
