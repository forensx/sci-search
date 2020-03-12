import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        search: searchReducer,
        bookmarks: bookmarksReducer,
        papers: papersReducer
    }
  })