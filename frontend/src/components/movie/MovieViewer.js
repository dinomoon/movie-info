import React from 'react';

const MovieViewer = ({ movie }) => {
  const { title, rating, pubDate, director, actor, image } = movie[0];
  return (
    <div className="movie-wrapper">
      <img src={image} alt="" />
      <div className="movie-info">
        <h2>{title}</h2>
        <div>{rating}</div>
        <div>{pubDate}</div>
        <div>{director}</div>
        <div>{actor}</div>
      </div>
    </div>
  );
};

export default MovieViewer;
