import React from 'react';
import { Link } from 'react-router-dom';

const MovieItem = ({ movie }) => {
  const { title, rating, pubDate, director, actor, image } = movie;
  return (
    <div className="movie-wrapper">
      <img src={image} alt="" />
      <div className="movie-info">
        <h2 className="title">
          <Link to={`/movie/${title}`}>{title}</Link>
        </h2>
        <div>{rating}</div>
        <div>{pubDate}</div>
        <div>{director}</div>
        <div>{actor}</div>
      </div>
    </div>
  );
};

const MovieList = ({ movies, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movies) {
    return null;
  }

  return (
    <div className="movie-container">
      {movies.map((movie, idx) => (
        <MovieItem key={idx} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
