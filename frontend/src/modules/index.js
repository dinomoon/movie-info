import { combineReducers } from 'redux';
import { all } from '@redux-saga/core/effects';
import movies from './movies';
import auth, { authSaga } from './auth';
import loading from './loading';

const rootReducer = combineReducers({ movies, auth, loading });

export function* rootSaga() {
  yield all([authSaga()]);
}

export default rootReducer;
