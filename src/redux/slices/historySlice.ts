import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HistoryAction, HistoryState } from '../../types';

const initialState: HistoryState = {
  past: [],
  future: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<HistoryAction>) => {
      state.past.push(action.payload);
      state.future = [];
    },
    undo: (state) => {
      const lastAction = state.past[state.past.length - 1];
      if (lastAction) {
        state.past.pop();
        state.future.push(lastAction);
      }
    },
    redo: (state) => {
      const nextAction = state.future[state.future.length - 1];
      if (nextAction) {
        state.future.pop();
        state.past.push(nextAction);
      }
    },
  },
});

export const { addToHistory, undo, redo } = historySlice.actions;
export default historySlice.reducer;