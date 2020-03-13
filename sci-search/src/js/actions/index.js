import { createAction } from "@reduxjs/toolkit";

export const setSearch = createAction("setSearch/searchQuery"); // setting user search query
export const sidebarToggle = createAction("sidebarToggle"); // setting user toggle of sidebar