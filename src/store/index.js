import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import pokemonsSlice from "./pokemons-slice";
import battleSlice from "./battle-slice";

const rootReducer = combineReducers({
  auth: authSlice,
  pokemons: pokemonsSlice,
  battle: battleSlice,
});

export const store = configureStore({
  reducer: rootReducer
});