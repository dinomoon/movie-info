import Router from 'koa-router';

const movies = new Router();

movies.get('/', (ctx) => {
  ctx.body = 'Movies';
});

export default movies;
