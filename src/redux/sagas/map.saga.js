import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchAll() {
  // GET ALL ITEMS
  try {
    //GET request sent to map.router
    const response = yield axios.get("/api/map");

    yield console.log('response', response);
    //sets response to view.sites.reducer
    yield put({ type: "SET_SITES", payload: response.data });
  } catch (err) {
    yield put({ type: "FETCH_ALL_ERROR" });
    console.log("Error in fetchAll", err);
  }

}


function* fetchLanguageDetail() {
  // Get all for map language detail 
  try {
    //GET request sent to map.router based on ID
    const response = yield axios.get(`/api/map/${action.payload}`);

    yield console.log('response', response);
    //sets response to view.info.reducer
    yield put({ type: "SET_INFO", payload: response.data });
  } catch (err) {
    yield put({ type: "FETCH_LANGUAGE_DETAIL_ERROR" });
    console.log("Error in fetchLanguageDetail", err);
  }

}


function* mapSaga() {
  // watching for actions
  yield takeLatest("FETCH_ALL", fetchAll);
  yield takeLatest("FETCH_LANGUAGE_DETAIL", fetchLanguageDetail);
}


export default mapSaga;

