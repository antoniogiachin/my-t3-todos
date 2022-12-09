import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ModalState {
  id: string;
  header: string;
  content: React.ReactNode;
  funcToExecute?: () => unknown | Promise<unknown>;
  actionLabel?: string;
}

const initialState: ModalState = {
  id: "",
  header: "",
  content: "",
  funcToExecute: undefined,
  actionLabel: undefined,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    SET_MODAL: (state, action: PayloadAction<ModalState>) => {
      state.id = action.payload.id;
      state.header = action.payload.header;
      state.content = action.payload.content;
      if (action.payload.funcToExecute) {
        state.funcToExecute = action.payload.funcToExecute;
        state.actionLabel = action.payload.actionLabel;
      }
    },
    RESET_MODAL: (state) => {
      state.id = initialState.id;
      state.header = initialState.header;
      state.content = initialState.content;
      state.funcToExecute = initialState.funcToExecute;
      state.actionLabel = initialState.actionLabel;
    },
  },
});

// selectors
export const getModalState = (state: RootState) => state.modal;
export const getModalId = (state: RootState) =>
  state.modal.id 

export const { SET_MODAL, RESET_MODAL } = modalSlice.actions;

export default modalSlice.reducer;
