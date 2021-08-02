import Movie from '../../models/movie.js';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

// state에 comment 넣기
export const getCommentById = async (ctx, next) => {
  const { title, id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  try {
    const movie = await Movie.findOne({ title });
    const comments = movie.comments;
    const comment = comments.find((comment) => comment._id == id);
    ctx.state.comment = comment;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 로그인한 사용자의 comment가 맞는지 확인
export const checkOwnComment = (ctx, next) => {
  const { user, comment } = ctx.state;
  if (comment.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};

// 댓글 조회
export const read = async (ctx) => {
  const { title } = ctx.params;
  try {
    const movie = await Movie.findOne({ title }).exec();
    if (!movie) {
      return;
    }
    ctx.body = movie;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 댓글 저장
export const save = async (ctx) => {
  const { title } = ctx.params;
  const { comment } = ctx.request.body;
  const exists = await Movie.findOne({ title }).exec();
  comment[0].user = ctx.state.user;

  try {
    let movie;
    if (!exists) {
      movie = new Movie({
        title,
        comments: comment,
      });
      await movie.save();
    } else {
      movie = await Movie.findOneAndUpdate(
        { title },
        { $push: { comments: comment } },
        { new: true },
      ).exec();
    }
    ctx.body = movie;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 댓글 삭제
export const remove = async (ctx) => {
  const { title, id } = ctx.params;

  try {
    let movie;
    movie = await Movie.findOne({ title });
    let comments = movie.comments;
    comments = comments.filter((comment) => comment._id != id);

    movie = await Movie.findOneAndUpdate(
      { title },
      { $set: { comments } },
      { new: true },
    ).exec();
    ctx.body = movie;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 댓글 수정
export const update = async (ctx) => {
  const { title, id } = ctx.params;
  const { comment } = ctx.request.body;
  comment[0].user = ctx.state.user;

  try {
    let movie;
    movie = await Movie.findOne({ title });
    let comments = movie.comments;
    comments.forEach((c) => {
      if (c._id == id) {
        c.text = comment[0].text;
      }
    });
    movie = await Movie.findOneAndUpdate(
      { title },
      { $set: { comments } },
      { new: true },
    ).exec();
    ctx.body = movie;
  } catch (e) {
    ctx.throw(500, e);
  }
};
