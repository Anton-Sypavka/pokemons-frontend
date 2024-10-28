import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import auth from "../services/auth";
import { BrowserProvider } from "ethers";
import localStorageService from "../services/localStorageService";
import { ERROR } from "../constants/constants";

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

export const loginWithMetamask = createAsyncThunk(
  'auth/loginWithMetamask',
  async (_, { rejectWithValue }) => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const { nonce } = await auth.generateNonce({ address });

      const signature = await signer.signMessage(nonce);

      const { user, access_token, refresh_token } = await auth.validateSignature({ signature, nonce });

      localStorageService.setTokens({ access_token, refresh_token });

      return user;

    } catch (error) {
      if (error.response?.status === 400) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue(ERROR.DEFAULT);
    }
  }
);

export const checkIsLoggedIn = createAsyncThunk(
  'auth/checkIsLoggedIn',
  async (_, { rejectWithValue }) => {
    try {
      const access_token = localStorageService.getToken(ACCESS_TOKEN);
      const refresh_token = localStorageService.getToken(REFRESH_TOKEN);

      if (!access_token && !refresh_token) {
        return;
      }

      return await auth.checkIsLoggedIn();

    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue(error.response?.data.message);
      }

      return rejectWithValue(ERROR.DEFAULT);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut(state) {
      state.user = null;
      localStorageService.removeTokens();
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    function setUser(state, action) {
      state.user = action.payload;
      state.loading = false;
    }

    function setLoading(state) {
      state.loading = true;
    }

    function setError(state, action) {
      if (action.payload === ERROR.UNAUTHORIZED) {
        state.user = null;

        localStorageService.removeTokens();
      }

      state.error = action.payload;
      state.loading = false;
    }

    builder
      .addCase(loginWithMetamask.pending, setLoading)
      .addCase(checkIsLoggedIn.pending, setLoading);

    builder
      .addCase(loginWithMetamask.fulfilled, setUser)
      .addCase(checkIsLoggedIn.fulfilled, setUser);

    builder
      .addCase(loginWithMetamask.rejected, setError)
      .addCase(checkIsLoggedIn.rejected, setError);
  }
});

export const {
  logOut,
  clearError
} = authSlice.actions;
export default authSlice.reducer;