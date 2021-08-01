import Router from 'koa-router';
import movies from './movies/index.js';

const api = new Router();

api.use('/movies', movies.routes());

export default api;
