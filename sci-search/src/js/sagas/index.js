import { put, takeLatest, all } from 'redux-saga/effects';

function* fetchSearch(search) {
    console.log("User searched (setting in App): ", search);
    const papers = yield axios.get(`http://localhost:5000/search/${search}/2`)
        .then(response => {
            papersResult = response.data.results
        });    
    yield put({ type: "PAPERS_RECEIVED", papers: papersResult});
}
function* actionWatcher() {
     yield takeLatest('GET_PAPERS', fetchSearch)
}

export default function* rootSaga() {
   yield all([
   actionWatcher(),
   ]);
}