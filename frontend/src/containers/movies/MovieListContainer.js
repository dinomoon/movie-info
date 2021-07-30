import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieList from '../../components/movies/MovieList';
import { getMovies } from '../../modules/movie';

const MovieListContainer = () => {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector(({ movie }) => ({
    movies: movie.movies,
    loading: movie.loading,
  }));

  useEffect(() => {
    if (!movies) {
      dispatch(getMovies());
    }
  }, [dispatch, movies]);

  return <MovieList movies={movies} loading={loading} />;
};

export default MovieListContainer;
