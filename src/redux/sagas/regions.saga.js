import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchRegions() {
  // GET ALL REGIONS
  try {
    //GET request sent to regions.router
    const response = yield axios.get("/api/regions");
    console.log("in fetchRegions");

    yield console.log('response', response);
    //sets response to view.listType.reducer
    yield put({ type: "SET_TYPE", payload: response.data });
    console.log("Response.data for fetch regions", response.data);
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
  