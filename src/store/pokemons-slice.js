import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import pokemonsService from "../services/pokemons";
import { ERROR } from "../constants/constants";

export const getPokemons = createAsyncThunk(
  'pokemons/getPokemons',
  async ({ page, perPage }, { rejectWithValue }) => {
    try {
      const data = await pokemonsService.getPokemons({ page, perPage });
      return data;
    } catch (error) {
      return rejectWithValue(ERROR.DEFAULT);
    }
  }
);

const initialState = {
  totalCount: null,
  pokemons: [],
  loading: false,
  error: null
}

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    clearPokemonsState: (state) => {
      state.pokemons = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPokemons.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getPokemons.fulfilled, (state, action) => {
      state.pokemons = [
        ...state.pokemons,
        ...action.payload.pokemons
      ]

      state.total = action.payload.total;
      state.loading = false;
    });

    builder.addCase(getPokemons.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  }
});

export const { clearPokemonsState } = pokemonsSlice.actions;
export default pokemonsSlice.reducer;