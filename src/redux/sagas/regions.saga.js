import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchRegions() {
  // GET ALL REGIONS
  try {
    //GET request sent to regions.router
    const response = yield axios.get("/api/regions");

    yield console.log('response', response);
    //sets response to view.listType.reducer
    yield put({ type: "SET_REGIONS", payload: response.data });
    yield put({ type: "SET_LIST", payload: response.data });
  } catch (err) {
    yield put({ type: "FETCH_REGIONS_ERROR" });
    console.log("Error in fetchRegions", err);
  }

}

function* regionsSaga() {
    // watching for actions
    yield takeLatest("FETCH_REGIONS", fetchRegions);
  }
  
  
  export default regionsSaga;
  