import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

//GET all sites
function* fetchSites() {
  try{
    //Get All sites for populating explore page
    const response = yield axios.get('api/sites');
    yield put({type: 'SET_ADMIN_SITES', payload: response.data});
  }catch(err){
    yield put({type: 'FETCH_SITES_ERR'})
  }
}


//SITES POST ROUTE
function* addSite(action) {
  console.log
    try {
      //POST request to sites router
      const response = yield axios.post(`/api/sites/`, action.payload).catch(err => "err");
      if(response === "err"){
        yield put({type: "NO_COORDS" })
      }
      //call GET request to repopulate sites list
      yield put({ type: "FETCH_SITES"});
    } catch (err) {
      console.log("Error in addSite", err);
      yield put({ type: "ADD_SITE_ERROR" });
    }
  
  }
  
  //SITES PUT ROUTE
  function* updateSite(action) {
      try {
        //UPDATE request sent to sites.router based on ID
        const response = yield axios.put(`/api/sites/${action.payload.id}`, action.payload);
    
        yield console.log('response', response);
      //call GET request to repopulate sites list
        yield put({ type: "FETCH_SITES" });
      } catch (err) {
        yield put({ type: "UPDATE_SITE_ERROR" });
        console.log("Error in updateSite", err);
      }
    }

  
  //SITES DELETE ROUTE
  function* deleteSite(action) {
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
    yield takeLatest("FETCH_SITES", fetchSites);
  }
  
export default sitesSaga;
  