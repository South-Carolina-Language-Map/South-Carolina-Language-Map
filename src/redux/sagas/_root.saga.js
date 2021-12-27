import { all } from 'redux-saga/effects';
import categoriesSaga from './categories.saga';
import languagesSaga from './languages.saga';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import mapSaga from './map.saga';
import regionsSaga from './regions.saga';
import sitesSaga from './sites.saga';
import filterSaga from './filter.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    languagesSaga(),
    categoriesSaga(),
    mapSaga(),
    regionsSaga(),
    sitesSaga(),
    filterSaga(),
  ]);
}
