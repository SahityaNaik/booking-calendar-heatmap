import { useReducer } from 'react';

const initialState = {
  isDragging: false,
  selectionStart: null,
  selectionEnd: null,
};

function selectionReducer(state, action) {
  switch (action.type) {
    case 'START_SELECTION':
      return {
        ...state,
        isDragging: true,
        selectionStart: action.payload,
        selectionEnd: action.payload,
      };
    case 'UPDATE_SELECTION':
      if (!state.isDragging) return state;
      return {
        ...state,
        selectionEnd: action.payload,
      };
    case 'END_SELECTION':
      return {
        ...state,
        isDragging: false,
      };
    case 'RESET_SELECTION':
      return initialState;
    default:
      return state;
  }
}

/**
 * Custom hook to manage the drag-to-select interaction state.
 * Uses useReducer to handle complex state transitions atomically.
 */
export function useCalendarSelection() {
  const [state, dispatch] = useReducer(selectionReducer, initialState);

  const startSelection = (date) => dispatch({ type: 'START_SELECTION', payload: date });
  const updateSelection = (date) => dispatch({ type: 'UPDATE_SELECTION', payload: date });
  const endSelection = () => dispatch({ type: 'END_SELECTION' });
  const resetSelection = () => dispatch({ type: 'RESET_SELECTION' });

  return {
    ...state,
    startSelection,
    updateSelection,
    endSelection,
    resetSelection,
  };
}
