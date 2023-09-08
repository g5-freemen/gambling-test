import { RootState } from '../store';
import { ActionType } from './types';
import { SET_CURRENCIES, SET_GAMESLIST, SET_PROVIDERS } from './actions/globalActions';

const initialState = {
  games: {},
  currencies: [],
  providers: [],
};

export default function globalReducer(state = initialState, action: ActionType = {}) {
  switch (action.type) {
    case SET_GAMESLIST: {
      return { ...state, games: action.payload };
    }
    case SET_CURRENCIES: {
      return { ...state, currencies: action.payload };
    }
    case SET_PROVIDERS: {
      return { ...state, providers: action.payload };
    }

    default: {
      return state;
    }
  }
}

export const setGames = (value: any) => ({
  type: SET_GAMESLIST,
  payload: value,
});
export const setCurrencies = (value: any) => ({
  type: SET_CURRENCIES,
  payload: value,
});
export const setProviders = (value: any) => ({
  type: SET_PROVIDERS,
  payload: value,
});

export const selectGames = (store: RootState) => store.globalReducer.games;
export const selectProviders = (store: RootState) => store.globalReducer.providers;
export const selectCurrencies = (store: RootState) => store.globalReducer.currencies;
