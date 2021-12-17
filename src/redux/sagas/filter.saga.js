import axios from "axios";
import {put, takeLatest} from 'redux-saga/effects';
import encodeUrlStr from "../../utils/encodeUrlStr.js";

function* submitQuery(action){
    try{
        // takes a url query as payload ('?key=value')
        const response = yield axios.get(`/api/search${action.payload}`);
        yield console.log(response);
        yield put({type: 'SET_SITES', payload: response.data})
    }catch(err){
        yield put({type: 'SUBMIT_QUERY_ERR'});
        console.log('error in submitQuery', err);
    }
}

function* filterSaga(){
    yield takeLatest('SUBMIT_QUERY', submitQuery);
}

export default filterSaga;