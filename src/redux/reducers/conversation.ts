import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isChatLoading: true,
  conversationId: null,
  error: null,
};

export const conversationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("CREATE_CONVERSATION_REQUEST", (state) => {
      state.isChatLoading = true;
      state.error = null;
    })
    .addCase("CREATE_CONVERSATION_SUCCESS", (state: any, action: any) => {
      state.isChatLoading = false;
      state.conversationId = action.payload;
    })
    .addCase("CREATE_CONVERSATION_FAILURE", (state: any, action: any) => {
      state.isChatLoading = false;
      state.error = action.payload;
    })
    .addCase("CLEAR_CONVERSATION_ERROR", (state) => {
      state.error = null;
    });
});
