import { useReducer } from 'react';

interface State {
  guessed: boolean;
  rightAnswer: boolean;
  streak: number;
  selectedTypes: Type[];
}

type Action =
  | { type: 'right' }
  | { type: 'wrong' }
  | { type: 'reset' }
  | { type: 'pushGuess'; payload: { guess: Type } }
  | { type: 'popGuess'; payload: { guess: Type } };

const initialState: State = {
  guessed: false,
  rightAnswer: false,
  streak: 0,
  selectedTypes: [],
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'right':
      return {
        rightAnswer: true,
        streak: state.streak + 1,
        guessed: true,
        selectedTypes: state.selectedTypes,
      };
    case 'wrong':
      return {
        rightAnswer: false,
        streak: 0,
        guessed: true,
        selectedTypes: state.selectedTypes,
      };
    case 'reset':
      return {
        rightAnswer: false,
        streak: state.streak,
        guessed: false,
        selectedTypes: [],
      };
    case 'pushGuess':
      return {
        rightAnswer: false,
        streak: state.streak,
        guessed: false,
        selectedTypes: [...state.selectedTypes, action.payload.guess],
      };
    case 'popGuess':
      return {
        rightAnswer: false,
        streak: state.streak,
        guessed: false,
        selectedTypes: state.selectedTypes.filter(
          (type) => type !== action.payload.guess
        ),
      };
    default:
      return state;
  }
};

export const useGameStates = () => useReducer(reducer, initialState);
