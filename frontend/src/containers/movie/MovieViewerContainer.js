import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import MovieViewer from '../../components/movie/MovieViewer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const MovieViewerContainer = ({ match }) => {
  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState('');
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const { movies, user } = useSelector(({ movies, user }) => ({
    movies: movies.movies,
    user: user.user,
  }));
  const title = match.params.title;
  const movie = movies.find((movie) => movie.title === title);

  useEffect(() => {
    const getComments = async (title) => {
      try {
        const response = await axios.get(`/api/movies/${title}`);
        setComments(response.data);
      } catch (e) {
        console.log('아직 comment가 없어요');
      }
    };
    getComments(title);
  }, [dispatch, title]);

  const onChange = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`/api/movies/${title}`, { comment: [{ text: comment }] });
    setComment('');
    const response = await axios.get(`/api/movies/${title}`);
    setComments(response.data);
  };

  const onRemove = async (id) => {
    await axios.delete(`/api/movies/${title}/${id}`);
    const response = await axios.get(`/api/movies/${title}`);
    setComments(response.data);
  };

  const onEdit = async (id) => {
    setEditing(true);
  };

  if (!comments) {
    return (
      <MovieViewer
        movie={movie}
        comment={comment}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    );
  }

  return (
    <MovieViewer
      movie={movie}
      comment={comment}
      comments={comments}
      onChange={onChange}
      onSubmit={onSubmit}
      onRemove={onRemove}
      user={user}
      onEdit={onEdit}
      editing={editing}
    />
  );
};

export default withRouter(MovieViewerContainer);
