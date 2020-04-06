// SEARCH SYSTEM
export const SELECT_QUERY = "SELECT_QUERY";
export function selectQuery(query) {
  return {
    type: SELECT_QUERY,
    query
  };
}

export const REQUEST_PAPERS = "REQUEST_PAPERS";
function requestPapers(query) {
  return {
    type: REQUEST_PAPERS,
    query
  };
}

export const RECEIVE_PAPERS = "RECEIVE_PAPERS";
function receivePapers(query, json) {
  return {
    type: RECEIVE_PAPERS,
    query,
    papers: json.results.map(child => child),
    receivedAt: Date.now()
  };
}

export const INVALIDATE_PAPERS = "INVALIDATE_PAPERS";
export function invalidatePapers(query) {
  return {
    type: INVALIDATE_PAPERS,
    query
  };
}

function fetchPapers(query) {
  return dispatch => {
    dispatch(requestPapers(query));
    return fetch(`http://localhost:5000/search/${query}/3`)
      .then(response => response.json())
      .then(json => dispatch(receivePapers(query, json)));
  };
}

function shouldFetchPapers(state, query) {
  const papers = state.papersByquery[query];
  if (!papers) {
    return true;
  } else if (papers.isFetching) {
    return false;
  } else {
    return papers.didInvalidate;
  }
}

export function fetchPapersIfNeeded(query) {
  return (dispatch, getState) => {
    if (shouldFetchPapers(getState(), query)) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchPapers(query));
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  };
}
// END SEARCH SYSTEM

// BOOKMARKS SYSTEM
export const ADD_BOOKMARK_NEW_CASE = "ADD_BOOKMARK_NEW_CASE";
export function addBookmark_newCase(paper, caseName) {
  return {
    type: ADD_BOOKMARK_NEW_CASE,
    paper,
    caseName,
    receivedAt: Date.now()
  };
}

export const REMOVE_BOOKMARK = "REMOVE_BOOKMARK";
export function removeBookmark(paper, caseName) {
  return {
    type: REMOVE_BOOKMARK,
    paper,
    caseName,
    receivedAt: Date.now()
  };
}