import { createAction, handleActions } from 'redux-actions';
import * as moviesAPI from '../lib/api/movies';

const GET_MOVIES = 'movies/GET_MOVIES';
const GET_MOVIES_SUCCESS = 'movies/GET_MOVIES_SUCCESS';
const GET_MOVIES_FAILURE = 'movies/GET_MOVIES_FAILURE';

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
      payload: movies,
    });
  } catch (e) {
    dispatch({
      type: GET_MOVIES_FAILURE,
      payload: e,
      error: true,
    });
  }
};

const initialState = {
  loading: false,
  movies: null,
};

const movie = handleActions(
  {
    [GET_MOVIES]: (state, action) => ({
      ...state,
      loading: true,
    }),
    [GET_MOVIES_SUCCESS]: (state, action) => ({
      movies: action.payload,
      loading: false,
    }),
    [GET_MOVIES_FAILURE]: (state, action) => ({
      ...state,
      loading: false,
    }),
  },
  initialState,
);

export default movie;
