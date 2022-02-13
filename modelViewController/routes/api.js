const recipesRouter = require('./recipes.router');

const apiRouter = require('express').Router();

apiRouter.get('/', (_, res) => {
  res.json({ message: 'ok' });
});

apiRouter.use('/recipes', recipesRouter);


module.exports = apiRouter;
