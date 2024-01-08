import { AuthenticatedUser } from '@canny-games/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  user: AuthenticatedUser | null;
}

const initialState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<AuthenticatedUser>) => {
      state.user = action.payload;
    },
  },
});

export const { logout, setUser } = userSlice.actions;
