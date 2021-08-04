import Router from 'koa-router';
import * as moviesCtrl from './movies.ctrl.js';
import checkLoggedIn from '../../lib/checkLoggedIn.js';

const movies = new Router();

movies.get('/:title', moviesCtrl.read);
movies.post('/:title', checkLoggedIn, moviesCtrl.save);
movies.delete(
  '/:title/:id',
  moviesCtrl.getCommentById,
  checkLoggedIn,
  moviesCtrl.checkOwnComment,
  moviesCtrl.remove,
);
movies.patch(
  '/:title/:id',
  moviesCtrl.getCommentById,
  checkLoggedIn,
  moviesCtrl.checkOwnComment,
  moviesCtrl.update,
);

export default movies;
