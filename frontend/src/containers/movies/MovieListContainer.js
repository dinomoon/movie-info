import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieList from '../../components/movies/MovieList';
import { getMovies } from '../../modules/movies';

const MovieListContainer = () => {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector(({ movies }) => ({
    movies: movies.movies,
    loading: movies.loading,
  }));

  useEffect(() => {
    if (!movies) {
      dispatch(getMovies());
    }
  }, [dispatch, movies]);

  return <MovieList movies={movies} loading={loading} />;
};

export default MovieListContainer;
