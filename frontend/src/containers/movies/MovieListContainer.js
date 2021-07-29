import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieList from '../../components/movies/MovieList';
import { getMovies } from '../../modules/movie';
import { withRouter } from 'react-router-dom';

const MovieListContainer = () => {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector(({ movie }) => ({
    movies: movie.movies,
    loading: movie.loading,
  }));

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return <MovieList movies={movies} loading={loading} />;
};

export default MovieListContainer;
