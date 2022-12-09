import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ModalState {
  id: string;
  header: string;
  content: React.ReactNode;
  isInformativeModal: boolean;
}

const initialState: ModalState = {
  id: "",
  header: "",
  content: "",
  isInformativeModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    SET_MODAL: (state, action: PayloadAction<ModalState>) => {
      state.id = action.payload.id;
      state.header = action.payload.header;
      state.content = action.payload.content;
      state.isInformativeModal = action.payload.isInformativeModal;
    },
    RESET_MODAL: (state) => {
      state.id = initialState.id;
      state.header = initialState.header;
      state.content = initialState.content;
      state.isInformativeModal = initialState.isInformativeModal;
    },
  },
});

// selectors
export const getModalState = (state: RootState) => state.modal;
export const getModalId = (state: RootState) => state.modal.id;

export const { SET_MODAL, RESET_MODAL } = modalSlice.actions;

export default modalSlice.reducer;
