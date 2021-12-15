import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';

import infoReducer from './view.info.reducer';
import listReducer from './view.list.reducer';
import listTypeReducer from './view.listType.reducer';
import queriesReducer from './view.queries.reducer';
import sitesReducer from './view.sites.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

const viewReducer = combineReducers({
  infoReducer, // {} for info pane
  listReducer, // [] of objs to populate explore lists
  listTypeReducer, // '' provide context for explore clicks
  queriesReducer, // [] holds previous queries
  sitesReducer, // [] holds current list of sites to map
})

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  viewReducer,
});

export default rootReducer;
