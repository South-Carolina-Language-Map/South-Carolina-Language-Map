import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user/admin', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// Get all pending Admins from the server
function* fetchAllUsers() {
  try {
    const response = yield axios.get('/api/user/admin/pending');
    yield put({ type: 'SET_APPROVALS', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}


//ADMIN PUT APPROVAL ROUTE
function* updateAdminApproval(action) {
  try {
    //UPDATE request sent to user.router based on ID to change clearance level
    const response = yield axios.put(`/api/user/admin/${action.payload}`);
    yield console.log('response', response);
    //call GET request to repopulate approvals list
    yield put({ type: 'SET_APPROVALS' });
  } catch (err) {
    yield put({ type: "UPDATE_ADMIN_APPROVAL_ERROR" });
    console.log("Error in updateAdmin", err);
  }

}


//ADMIN DELETE ROUTE
function* deleteUser(action) {
  try {
    //DELETE request sent to user/admin route based on ID
    const response = yield axios.delete(`/api/user/admin/${action.payload}`);

    yield console.log('response', response);
    //call GET request to repopulate category list
    yield put({ type: "FETCH_UNAPPROVED" });
  } catch (err) {
    yield put({ type: "DELETE_ADMIN_ERROR" });
    console.log("Error in deleteUser", err);
  }

}


function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('FETCH_UNAPPROVED', fetchAllUsers);
  yield takeLatest('DELETE_UNAPPROVED', deleteUser);
  yield takeLatest('APPROVE_ADMIN', updateAdminApproval)
}

export default userSaga;
