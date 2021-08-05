import React from 'react';

const MovieItem = ({ movie }) => {
  const { title, rating, pubDate, director, actor, image } = movie;
  return (
    <>
      <div className="movie-detail">
        <img src={image} alt="포스터 사진" />
        <div className="movie-info">
          <h2 className="title">{title}</h2>
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
    </>
  );
};

export default MovieItem;
