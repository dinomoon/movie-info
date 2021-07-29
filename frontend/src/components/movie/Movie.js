import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Movie = (movie) => {
  const { title, rating, pubDate, director, actor, image } = movie.movie;
  return (
    <div className="movie-wrapper">
      <img src={image} alt="" />
      <div className="movie-info">
        <h2>
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

export default withRouter(Movie);
