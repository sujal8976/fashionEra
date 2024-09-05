import { createSlice } from "@reduxjs/toolkit";

const initialPageState = {
  onPage: "",
};

export const onPageCategorySlice = createSlice({
  name: "onPageCategory",
  initialState: initialPageState,
  reducers: {
    setOnPage(state, action) {
      state.onPage = action.payload;
    },
  },
});

export const { setOnPage } = onPageCategorySlice.actions;

export default onPageCategorySlice.reducer;
