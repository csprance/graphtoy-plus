import { StateCreator } from 'zustand';

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
    value: 0,
    step: 0.01,
    min: -1,
    max: 1,
}));

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
export interface VariableSliceState {
    variables: Variable[];
}
export interface VariableSliceActions {
    setVariable: (index: number, value: number) => void;
}

export type VariablesSlice = VariableSliceActions & VariableSliceState;

export const variablesSlice: StateCreator<
    VariableSliceState & VariableSliceActions,
    [['zustand/devtools', never]],
    []
    > = (set) => ({
    ///////////////////////
    // Variables
    variables: defaultVariables,
    setVariable: (index, value) =>
        set((state) => ({
            formulasValid: false,
            variables: state.variables.map((v) => ({
                ...v,
                value: v.id === index ? value : v.value,
            })),
        })),
});
