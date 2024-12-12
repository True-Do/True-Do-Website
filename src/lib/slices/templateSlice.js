import { createSlice } from '@reduxjs/toolkit';

const templateSlice = createSlice({
  name: 'template',
  initialState: {
    templateValue1: 0,
  },
  reducers: {
    setTemplate: (state, data) => {
      state.templateValue1 = data.payload.templateValue1;
    },
  },
});

const templateActions = templateSlice.actions;
let templateReducer = templateSlice.reducer;
export { templateActions, templateReducer };
