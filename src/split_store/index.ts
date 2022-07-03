import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { grapherSlice, GrapherSlice } from './grapher-slice';
import { variablesSlice, VariablesSlice } from './variables-slice';
import {
  defaultFormulas,
  formulasSlice,
  FormulasSlice,
} from './formulas-slice';

export const useStore = create<
  GrapherSlice &
    VariablesSlice &
    FormulasSlice & {
      clearFormulas: () => void;
    }
>()(
  devtools((...a) => {
    // destructure a
    const [set, get] = a;
    return {
      ...grapherSlice(...a),
      ...variablesSlice(...a),
      ...formulasSlice(...a),
      clearFormulas: () => {
        const {grapher} = get();
        if (grapher) {
          grapher.clearFormulas();
        }

        set({ formulas: defaultFormulas });
      },
    };
  })
);
