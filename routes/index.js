const express = require('express');

const productoRouter = require('./products.router');
const categoriaRouter = require('./categories.router');
const usuarioRouter = require('./users.router');
const ordenesRouter = require('./orders.router');
const clienteRouter = require('./customer.router');
const authRouter = require('./auth.routes');
// const postRouter = require('./auth.routes');
// const authServiceRouter = require('./auth.service.routes')
function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/productos', productoRouter);
  router.use('/categoria', categoriaRouter);
  router.use('/usuario', usuarioRouter);
  router.use('/ordenes', ordenesRouter);
  router.use('/cliente', clienteRouter);
  router.use('/auth', authRouter);
  // router.use('/post', postRouter);
  // router.use('/auth', authServiceRouter);
}

module.exports = routerApi;
