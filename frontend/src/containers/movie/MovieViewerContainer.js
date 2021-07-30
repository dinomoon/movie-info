import React from 'react';
import { withRouter } from 'react-router-dom';
import MovieViewer from '../../components/movie/MovieViewer';
import { useSelector } from 'react-redux';

const MovieViewerContainer = ({ match }) => {
  const title = match.params.title;
  const movies = useSelector((state) => state.movies.movies);
  const movie = movies.find((movie) => movie.title === title);
  return <MovieViewer movie={movie} />;
};

export default withRouter(MovieViewerContainer);
