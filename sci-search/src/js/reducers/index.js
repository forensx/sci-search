import { setSearch, sidebarToggle } from "../actions";
import { createReducer } from "@reduxjs/toolkit";

export const searchReducer = createReducer(
  {},
  {
    [setSearch]: (state, action) => {
      state.searchQuery = action.payload;
    }
  }
);

export const sidebarReducer = createReducer(
  {},
  {
    [sidebarToggle]: (state, action) => {
      state.sidebarCollapsed = action.payload;
    }
  }
);
