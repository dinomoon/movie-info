import Router from 'koa-router';
import auth from './auth/index.js';
import movies from './movies/index.js';

const api = new Router();

api.use('/movies', movies.routes());
api.use('/auth', auth.routes());

export default api;
