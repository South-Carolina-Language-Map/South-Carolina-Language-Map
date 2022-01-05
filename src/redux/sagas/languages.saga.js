import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";


//LANGUAGES GET ROUTE
function* fetchLanguages() {
  // GET ALL ITEMS
  try {
    //GET request sent to languages.router
    const response = yield axios.get("/api/languages");

    yield console.log('response', response);
    //sets response to view.sites.reducer
    yield put({ type: "SET_LANGUAGES", payload: response.data });
    yield put({type: "SET_LIST", payload: response.data });
  } catch (err) {
    yield put({ type: "FETCH_LANGUAGES_ERROR" });
    console.log("Error in fetchLanguages", err);
  }

}

//LANGUAGES GET ROUTE BY ID
function* fetchLanguage() {
  try {
    //GET request sent to languages.router
    const response = yield axios.get(`/api/languages/${action.payload}`);

    yield console.log('response', response);
    //sets response to view.sites.reducer
    yield put({ type: "SET_INFO", payload: response.data });
  } catch (err) {
    yield put({ type: "FETCH_LANGUAGES_ERROR" });
    console.log("Error in fetchLanguages", err);
  }

}

//LANGUAGE POST ROUTE
function* addLanguage() {
  try {
    //POST request to languages router
    const response = yield axios.post(`/api/languages/`, action.payload);

    yield console.log('response', response);
    //call GET request to repopulate languages list
    yield put({ type: "FETCH_LANGUAGES"});
  } catch (err) {
    yield put({ type: "ADD_LANGUAGE_ERROR" });
    console.log("Error in addLanguage", err);
  }

}

//LANGUAGE PUT ROUTE
function* updateLanguage() {
    try {
      //UPDATE request sent to languages.router based on ID
      const response = yield axios.put(`/api/languages/${action.payload}`);
  
      yield console.log('response', response);
    //call GET request to repopulate languages list
      yield put({ type: "FETCH_LANGUAGES" });
    } catch (err) {
      yield put({ type: "UPDATE_LANGUAGE_ERROR" });
      console.log("Error in updateLanguage", err);
    }
  
  }

//LANGUAGE DELETE ROUTE
function* deleteLanguage() {
    try {
      //DELETE request sent to languages.router based on ID
      const response = yield axios.delete(`/api/languages/${action.payload}`);
  
      yield console.log('response', response);
      //call GET request to repopulate languages list
      yield put({ type: "FETCH_LANGUAGES" });
    } catch (err) {
      yield put({ type: "DELETE_LANGUAGE_ERROR" });
      console.log("Error in deleteLanguage", err);
    }
  
}

function* languagesSaga() {
  // watching for actions
  yield takeLatest("FETCH_LANGUAGES", fetchLanguages);
  yield takeLatest("FETCH_LANGUAGE", fetchLanguage);
  yield takeLatest("ADD_LANGUAGE", addLanguage);
  yield takeLatest("UPDATE_LANGUAGE", updateLanguage);
  yield takeLatest("DELETE_LANGUAGE", deleteLanguage);
}


export default languagesSaga;

