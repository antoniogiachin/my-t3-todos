import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface User {
  name: string;
  email: string;
  image: string;
  id: string;
  role: string;
}

interface UserExtras {
  description: string;
}

interface UserSlice {
  user: User;
  extras: UserExtras;
}

const initialState: UserSlice = {
  user: {
    name: "",
    email: "",
    image: "",
    id: "",
    role: "",
  },
  extras: { description: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_USER_INFOS: (state, action: PayloadAction<User>) => {
      state.user = { ...action.payload };
    },
  },
});

// selectors
export const getUser = (state: RootState) => state.user.user;

export const { SET_USER_INFOS } = userSlice.actions;

export default userSlice.reducer;
