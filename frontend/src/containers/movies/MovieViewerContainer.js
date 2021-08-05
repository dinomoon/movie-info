import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import MovieViewer from '../../components/movies/MovieViewer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const MovieViewerContainer = ({ match }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [editText, setEditText] = useState('');
  const dispatch = useDispatch();
  const { movies, user } = useSelector(({ movies, user }) => ({
    movies: movies.movies,
    user: user.user,
  }));
  const title = match.params.title;
  const movie = movies.find((movie) => movie.title === title);

  const getComments = async (title) => {
    try {
      const response = await axios.get(`/api/movies/${title}`);
      let data = response.data;
      data = data.map((comment) => ({ ...comment, editing: false }));
      setComments(data);
    } catch (e) {
      console.log('아직 comment가 없어요');
    }
  };

  useEffect(() => {
    getComments(title);
  }, [dispatch, title]);

  const onChange = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('로그인이 필요한 서비스입니다.');
    } else {
      await axios.post(`/api/movies/${title}`, {
        comment: [{ text: comment }],
      });
      getComments(title);
    }

    setComment('');
  };

  const onRemove = async (id) => {
    await axios.delete(`/api/movies/${title}/${id}`);
    getComments(title);
  };

  const onEditToggle = (id) => {
    const filtered = comments.map((comment) => {
      if (comment._id === id) {
        setEditText(comment.text);
        return {
          ...comment,
          editing: !comment.editing,
        };
      } else {
        return comment;
      }
    });
    setComments(filtered);
  };

  const onEditTextChange = (e) => {
    setEditText(e.target.value);
  };

  const onEditSubmit = async (e, id) => {
    e.preventDefault();
    const text = e.target[0].value;
    await axios.patch(`/api/movies/${title}/${id}`, {
      comment: [{ text }],
    });
    onEditToggle(id);
    getComments(title);
  };

  return (
    <MovieViewer
      movie={movie}
      comment={comment}
      comments={comments}
      onChange={onChange}
      onSubmit={onSubmit}
      onRemove={onRemove}
      user={user}
      onEditToggle={onEditToggle}
      onEditSubmit={onEditSubmit}
      onEditTextChange={onEditTextChange}
      editText={editText}
      movieDetail="movie-detail"
    />
  );
};

export default withRouter(MovieViewerContainer);
