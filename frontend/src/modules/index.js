import { combineReducers } from 'redux';
import { all } from '@redux-saga/core/effects';
import movies from './movies';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';

const rootReducer = combineReducers({ movies, auth, loading, user });

export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}

export default rootReducer;
