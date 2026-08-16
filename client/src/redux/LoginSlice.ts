import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Users } from "../Types";

interface LoginState {
  user: Users | null;
}

const initialState: LoginState = {
  user: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = loginSlice.actions;
export default loginSlice.reducer;
