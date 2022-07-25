export type FncFormula = (x: number, t: number) => number;

export type OnPlayPauseFn = (paused: boolean) => void;
export type OnTimeUpdateFn = (t: number) => void;
export type OnCoordUpdateFn = ([x, y]: [number, number]) => void;
export type OnFormulaErrorFn = ({
  error,
  formula,
}: {
  error: string;
  formula: Formula;
}) => void;

export type GrapherOnEventFunctions = {
  playPause: boolean;
  formulaCompiled: number; // The ID
  time: number;
  coords: [number, number];
  formulaError: { error: any; formula: Formula };
};

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

// A formula is the data structure that describes a math formula and metadata
export interface Formula {
  // The value is the expression to evaluate
  value: string;
  // Should this formula show up in the graph
  enabled: boolean;
  // What is the id of this formula
  id: number;
  // What channel is visualized
  visualizer: VisualizerState;
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

/**
 * Red, Green, Blue
 */
export type VisualizerState = [boolean, boolean, boolean];
