import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as moviesAPI from '../lib/api/movies';
import createRequestSaga from '../lib/createRequestSaga';

const GET_MOVIES = 'movies/GET_MOVIES';
const GET_MOVIES_SUCCESS = 'movies/GET_MOVIES_SUCCESS';
const GET_MOVIES_FAILURE = 'movies/GET_MOVIES_FAILURE';

const GET_COMMENTS = 'movies/GET_COMMENTS';
const GET_COMMENTS_SUCCESS = 'movies/GET_COMMENTS_SUCCESS';
const GET_COMMENTS_FAILURE = 'movies/GET_COMMENTS_FAILURE';

export const getMovies = () => async (dispatch) => {
  dispatch({ type: GET_MOVIES }); // 요청 시작 알림
  try {
    let movies = [];
    const response = await moviesAPI.getMovies();
    const data = response.data.boxOfficeResult.dailyBoxOfficeList;
    for (let i = 0; i < data.length; i++) {
      const title = data[i].movieNm;
      const response = await moviesAPI.getMovieInfo(title);
      let { userRating, director, actor, image, pubDate } =
        response.data.items[0];

      director = director.replaceAll('|', ', ');
      director = director.slice(0, -2);
      actor = actor.replaceAll('|', ', ');
      actor = actor.slice(0, -2);

      const movieInfo = {
        title,
        rating: userRating,
        director,
        actor,
        image,
        pubDate,
      };
      movies.push(movieInfo);
    }
    dispatch({
      type: GET_MOVIES_SUCCESS,
      movies,
    });
  } catch (e) {
    dispatch({
      type: GET_MOVIES_FAILURE,
      payload: e,
      error: true,
    });
  }
};

export const getComments = createAction(GET_COMMENTS, (title) => title);

const getCommentsSaga = createRequestSaga(GET_COMMENTS, moviesAPI.getComments);

export function* moviesSaga() {
  yield takeLatest(GET_COMMENTS, getCommentsSaga);
}

const initialState = {
  loading: false,
  movies: null,
  comments: null,
  error: null,
};

const movies = handleActions(
  {
    [GET_MOVIES]: (state, action) => ({
      ...state,
      loading: true,
    }),
    [GET_MOVIES_SUCCESS]: (state, action) => ({
      movies: action.movies,
      loading: false,
    }),
    [GET_MOVIES_FAILURE]: (state, action) => ({
      ...state,
      loading: false,
    }),
    [GET_COMMENTS_SUCCESS]: (state, action) => ({
      ...state,
      comments: action.payload,
    }),
    [GET_COMMENTS_FAILURE]: (state, action) => ({
      ...state,
      comments: null,
      error: action.payload,
    }),
  },
  initialState,
);

export default movies;
