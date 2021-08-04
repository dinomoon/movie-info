import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import MovieViewer from '../../components/movie/MovieViewer';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../../modules/movies';

const MovieViewerContainer = ({ match }) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const title = match.params.title;
  const movie = movies.find((movie) => movie.title === title);

  useEffect(() => {
    dispatch(getComments('MMMM'));
  }, [dispatch, title]);

  return <MovieViewer movie={movie} />;
};

export default withRouter(MovieViewerContainer);
