import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import battleService from '../services/battle';
import { ERROR } from "../constants/constants";

export const startBattle = createAsyncThunk(
  'battleSlice/startBattle',
  async (data, { rejectWithValue }) => {
    try {
      return await battleService.startBattle(data);
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue(error.response?.data.message);
      }

      return rejectWithValue(ERROR.DEFAULT);
    }
  }
);

export const getBattle = createAsyncThunk(
  'battleSlice/getBattle',
  async (id, { rejectWithValue }) => {
    try {
      return await battleService.getBattle(id);
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue(error.response?.data.message);
      }

      return rejectWithValue(ERROR.DEFAULT);
    }
  }
);

const initialState = {
  selectedPokemon: null,
  battle: null,
  loading: false,
  error: null
}

const battleSlice = createSlice({
  name: 'battleSlice',
  initialState,
  reducers: {
    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    }
  },
  extraReducers: (builder) => {
    function setLoading(state) {
      state.loading = true;
    }

    function setBattle(state, action) {
      state.battle = action.payload;
      state.loading = false;
    }

    function setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    }

    builder
      .addCase(startBattle.pending, setLoading)
      .addCase(getBattle.pending, setLoading);

    builder
      .addCase(startBattle.fulfilled, setBattle)
      .addCase(getBattle.fulfilled, setBattle);

    builder
      .addCase(startBattle.rejected, setError)
      .addCase(getBattle.rejected, setError);
  }
});

export const { setSelectedPokemon } = battleSlice.actions;
export default battleSlice.reducer;