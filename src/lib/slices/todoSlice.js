import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
  },
  reducers: {
    setTodos: (state, data) => {
      state.todos = data.payload.todos;
    },
  },
});

const todoActions = todoSlice.actions;
let todoReducer = todoSlice.reducer;
export { todoActions, todoReducer };
