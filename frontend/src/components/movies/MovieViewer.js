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
  onEditToggle,
  onEditSubmit,
  onEditTextChange,
  editText,
}) => {
  const { title, rating, pubDate, director, actor, image } = movie;
  return (
    <section className="movie-detail-section">
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
      <div className="comment-length">댓글 {comments.length}개</div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="재밌어요"
          value={comment}
          onChange={onChange}
        />
        <button type="submit" disabled={!comment}>
          등록
        </button>
      </form>
      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment._id}>
            <div className="comment-top">
              <span className="username">{comment.user.username}</span>
              <span className="date">
                {moment(comment.createdDate).format('YYYY.MM.DD HH:mm')}
              </span>
            </div>
            {!comment.editing && (
              <span className="comment-text">{comment.text}</span>
            )}
            {!comment.editing && user && comment.user._id === user._id && (
              <>
                <button
                  className="edit"
                  type="button"
                  onClick={() => onEditToggle(comment._id)}
                >
                  수정
                </button>
                <button
                  className="delete"
                  type="button"
                  onClick={() => onRemove(comment._id)}
                >
                  삭제
                </button>
              </>
            )}
            {comment.editing && (
              <>
                <form onSubmit={(e) => onEditSubmit(e, comment._id)}>
                  <input
                    type="text"
                    value={editText}
                    onChange={onEditTextChange}
                  />
                  <button
                    type="button"
                    className="cancel"
                    onClick={() => onEditToggle(comment._id)}
                  >
                    취소
                  </button>
                  <button className="submit" type="submit">
                    확인
                  </button>
                </form>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MovieViewer;
