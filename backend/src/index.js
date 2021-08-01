import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import api from './api/index.js';
dotenv.config();

const { PORT, MONGO_URI } = process.env;

const app = new Koa();
const router = new Router();

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

router.use('/api', api.routes());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
