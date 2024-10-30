import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import battleService from '../services/battle';
import { ERROR } from "../constants/constants";

export const COMPUTER_ACTION = 'computersPokemon';
export const USER_ACTION = 'usersPokemon';

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

export const makeAction = createAsyncThunk(
  'battleSlice/makeAttack',
  async (data, { rejectWithValue }) => {
    try {
      return await battleService.attack(data);

    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue(error.response?.data.message);
      }

      return rejectWithValue(ERROR.DEFAULT);
    }
  }
);

export const quitBattle = createAsyncThunk(
  'battleSlice/quitBattle',
  async (id, { rejectWithValue }) => {
    try {
      return await battleService.quit(id);

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
  actions: [],
  currentAction: USER_ACTION,
  loading: false,
  error: null,
  hp: null,
  winner: null
}

const battleSlice = createSlice({
  name: 'battleSlice',
  initialState,
  reducers: {
    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    },
    setCurrentAction: (state, action) => {
      state.currentAction = action.payload;
    },
    setHP: (state, action) => {
      state.hp = action.payload;
    },
    clearBattleState: (state) => {
      state.winner = null;
      state.buttle = null;
      state.actions = [];
      state.loading = false;
      state.currentAction = USER_ACTION;
    }
  },
  extraReducers: (builder) => {
    function setLoading(state) {
      state.loading = true;
    }

    function setBattle(state, action) {
      state.battle = action.payload;
      state.loading = false;
      if (action.payload.actions.length) {
        state.actions = action.payload.actions;
      }
    }

    function setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    }

    builder.addCase(makeAction.fulfilled, (state, action) => {
      if (action.payload.winnerId) {
        state.winner = action.payload;
        state.hp[state.currentAction === USER_ACTION ? COMPUTER_ACTION : USER_ACTION] = 0;
        state.actions.unshift(action.payload.action);

        return;
      }

      state.actions.unshift(action.payload);

      if (state.currentAction === USER_ACTION) {
        state.currentAction = COMPUTER_ACTION;
      } else {
        state.currentAction = USER_ACTION;
      }

      state.hp[state.currentAction] = action.payload.opponentHp;
    });

    builder.addCase(quitBattle.fulfilled, (state) => {
      state.loading = false;
    });

    builder
      .addCase(startBattle.pending, setLoading)
      .addCase(getBattle.pending, setLoading)
      .addCase(makeAction.pending, setLoading);

    builder
      .addCase(startBattle.fulfilled, setBattle)
      .addCase(getBattle.fulfilled, setBattle);

    builder
      .addCase(startBattle.rejected, setError)
      .addCase(getBattle.rejected, setError);
  }
});

export const {
  setSelectedPokemon,
  setCurrentAction,
  setHP,
  clearBattleState
} = battleSlice.actions;
export default battleSlice.reducer;