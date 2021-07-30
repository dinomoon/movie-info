import React from 'react';
import { withRouter } from 'react-router-dom';
import MovieViewer from '../../components/movie/MovieViewer';
import { useSelector } from 'react-redux';

const MovieViewerContainer = ({ match }) => {
  const title = match.params.title;
  const movies = useSelector((state) => state.movie.movies);
  const movie = movies.filter((movie) => movie.title === title);

  return <MovieViewer movie={movie} />;
};

export default withRouter(MovieViewerContainer);
