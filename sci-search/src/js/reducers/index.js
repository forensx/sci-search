import { setSearch, sidebarToggle, getPapers } from "../actions";
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

export const papersReducer = createReducer(
  {},
  {
    [getPapers.GET_PAPERS]: (state, action) => {
      state.loading = true;
    },
    [getPapers.PAPERS_RECEIVED]: (state, action) => {
      state.loading = false;
      state.papersResult = action.payload;
    }
  }
);
