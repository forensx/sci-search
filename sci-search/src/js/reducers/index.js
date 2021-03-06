import { combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";
import {
  SELECT_QUERY,
  REQUEST_PAPERS,
  INVALIDATE_PAPERS,
  RECEIVE_PAPERS,
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
} from "../actions";

function selectedQuery(state = null, action) {
  switch (action.type) {
    case SELECT_QUERY:
      return action.query;
    default:
      return state;
  }
}

function papers(
  state = {
    isFetching: false,
    didInvalidate: false,
    papers: [],
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_PAPERS:
      return Object.assign({}, state, {
        didInvalidate: true,
        ID: uuidv4(),
      });
    case REQUEST_PAPERS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        ID: uuidv4(),
      });
    case RECEIVE_PAPERS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        papers: action.papers,
        lastUpdated: action.receivedAt,
        ID: uuidv4(),
      });
    default:
      return state;
  }
}

function papersByquery(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_PAPERS:
    case RECEIVE_PAPERS:
    case REQUEST_PAPERS:
      return Object.assign({}, state, {
        [action.query]: papers(state[action.query], action),
      });
    default:
      return state;
  }
}

// manage individual bookmark logic
function bookmarks(
  state = {
    bookmarks: [],
  },
  action
) {
  switch (action.type) {
    case ADD_BOOKMARK:
      console.log("Paper bookmarked from Redux: ", action.paper.ID);
      return Object.assign({}, state, {
        bookmarks: [...state.bookmarks, action.paper],
        lastUpdated: action.receivedAt,
        caseID: uuidv4(),
      });
    default:
      return state;
  }
}

// handle state management of entire bookmarkByCase system
function bookmarksByCase(state = {}, action) {
  switch (action.type) {
    case ADD_BOOKMARK:
      return Object.assign({}, state, {
        [action.caseName]: bookmarks(state[action.caseName], action),
      });
    case REMOVE_BOOKMARK:
      console.log("Removed bookmark: ", action.paper.ID);
      return state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  papersByquery,
  selectedQuery,
  bookmarksByCase,
});

export default rootReducer;
