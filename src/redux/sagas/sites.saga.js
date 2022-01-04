import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

//SITES POST ROUTE
function* addSite(action) {
    try {
      //POST request to sites router
      const response = yield axios.post(`/api/sites/`, action.payload);
  
      yield console.log('response', response);
      //call GET request to repopulate sites list
      yield put({ type: "FETCH_SITES"});
    } catch (err) {
      yield put({ type: "ADD_SITE_ERROR" });
      console.log("Error in addSite", err);
    }
  
  }
  
  //SITES PUT ROUTE
  function* updateSite() {
      try {
        //UPDATE request sent to sites.router based on ID
        const response = yield axios.put(`/api/sites/${action.payload}`);
    
        yield console.log('response', response);
      //call GET request to repopulate sites list
        yield put({ type: "FETCH_SITES" });
      } catch (err) {
        yield put({ type: "UPDATE_SITE_ERROR" });
        console.log("Error in updateSite", err);
      }
    
    }
  
  //SITES DELETE ROUTE
  function* deleteSite() {
      try {
        //DELETE request sent to sites.router based on ID
        const response = yield axios.delete(`/api/sites/${action.payload}`);
    
        yield console.log('response', response);
        //call GET request to repopulate sites list
        yield put({ type: "FETCH_SITES" });
      } catch (err) {
        yield put({ type: "DELETE_SITE_ERROR" });
        console.log("Error in deleteSite", err);
      }
    
  }

function* sitesSaga() {
    // watching for actions
    yield takeLatest("ADD_SITE", addSite);
    yield takeLatest("UPDATE_SITE", updateSite);
    yield takeLatest("DELETE_SITE", deleteSite);
  }
  
export default sitesSaga;
  