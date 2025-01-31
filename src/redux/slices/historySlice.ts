import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HistoryAction, HistoryState } from '../../types';

const initialState: HistoryState = { //two arrays 
  past: [],
  future: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: { //Adds a new action to the past history and Clears the future (since redo should only work when undo has been used).
    addToHistory: (state, action: PayloadAction<HistoryAction>) => {
      state.past.push(action.payload);
      state.future = [];
    },
    undo: (state) => { //Moves the last action from past to future. This means reverting the last action.
      const lastAction = state.past[state.past.length - 1];
      if (lastAction) {
        state.past.pop();
        state.future.push(lastAction);
      }
    },
    redo: (state) => { //Moves the last undone action from future back to past.This means re-applying the undone change.
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