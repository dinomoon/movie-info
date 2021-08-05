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
        <div className="sub-info">
          <span>평점</span> {rating}
        </div>
        <div className="sub-info">
          <span>개요</span> {pubDate}년 개봉
        </div>
        <div className="sub-info">
          <span>감독</span> {director}
        </div>
        <div className="sub-info">
          <span>출연</span> {actor}
        </div>
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
