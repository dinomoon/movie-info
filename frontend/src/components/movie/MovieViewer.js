import React from 'react';
import moment from 'moment';

const MovieViewer = ({
  movie,
  comment,
  comments,
  onSubmit,
  onChange,
  onRemove,
  user,
  onEdit,
  editing,
}) => {
  const { title, rating, pubDate, director, actor, image } = movie;
  return (
    <>
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
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="댓글"
          value={comment}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <ul className="comment-list">
        {comments &&
          comments.map((comment) => (
            <li key={comment._id}>
              <div className="comment-top">
                <span className="username">{comment.user.username}</span>
                <span className="date">
                  {moment(comment.createdDate).format('YYYY.MM.DD hh:mm')}
                </span>
              </div>
              <span>{comment.text}</span>
              {!editing && user && comment.user._id === user._id && (
                <>
                  <button type="button" onClick={() => onRemove(comment._id)}>
                    수정
                  </button>
                  <button type="button" onClick={() => onRemove(comment._id)}>
                    삭제
                  </button>
                </>
              )}
              {editing && (
                <>
                  <button type="button" onClick={() => onRemove(comment._id)}>
                    취소
                  </button>
                  <button type="button" onClick={() => onRemove(comment._id)}>
                    확인
                  </button>
                </>
              )}
            </li>
          ))}
      </ul>
    </>
  );
};

export default MovieViewer;
