import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";


//CATEGORIES GET ROUTE
function* fetchCategories() {
  // GET ALL ITEMS
  try {
    //GET request sent to languages.router
    const response = yield axios.get("/api/languages");

    yield console.log('response', response);
    //sets response to view.sites.reducer
    yield put({ type: "SET_CATEGORIES", payload: response.data });
  } catch (err) {
    yield put({ type: "FETCH_CATEGORIES_ERROR" });
    console.log("Error in fetchCategories", err);
  }

}

//CATEGORIES POST ROUTE
function* addCategory() {
  // Get all for map category detail 
  try {
    //POST request to categories router
    const response = yield axios.post(`/api/categories/`, action.payload);

    yield console.log('response', response);
    //call GET request to repopulate categories list
    yield put({ type: "FETCH_CATEGORIES"});
  } catch (err) {
    yield put({ type: "ADD_CATEGORY_ERROR" });
    console.log("Error in addCategory", err);
  }

}

//CATEGORIES PUT ROUTE
function* updateCategory() {
    try {
      //UPDATE request sent to categories.router based on ID
      const response = yield axios.put(`/api/categories/${action.payload}`);
  
      yield console.log('response', response);
    //call GET request to repopulate languages list
      yield put({ type: "FETCH_CATEGORIES" });
    } catch (err) {
      yield put({ type: "UPDATE_CATEGORIES_ERROR" });
      console.log("Error in updateCategories", err);
    }
  
  }

//CATEGORIES DELETE ROUTE
function* deleteCategory() {
    try {
      //DELETE request sent to categories.router based on ID
      const response = yield axios.delete(`/api/categories/${action.payload}`);
  
      yield console.log('response', response);
      //call GET request to repopulate category list
      yield put({ type: "FETCH_CATEGORIES" });
    } catch (err) {
      yield put({ type: "DELETE_CATEGORY_ERROR" });
      console.log("Error in deleteCategory", err);
    }
  
}

function* categoriesSaga() {
  // watching for actions
  yield takeLatest("FETCH_CATEGORIES", fetchCategories);
  yield takeLatest("ADD_CATEGORY", addCategory);
  yield takeLatest("UPDATE_CATEGORY", updateCategory);
  yield takeLatest("DELETE_CATEGORY", deleteCategory);
}


export default categoriesSaga;

