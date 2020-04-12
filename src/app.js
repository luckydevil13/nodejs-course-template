const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { handleError } = require('./common/errorHandler');
const { logReq } = require('./common/logger');

// Exceptions catcher
process.on('uncaughtException', error => {
  handleError(error);
});

// Unhandled promise rejection
process.on('unhandledRejection', error => {
  handleError(error);
});

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.set('json spaces', 2);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
// logger middleware
app.use((req, res, next) => {
  logReq(req);
  next();
});

// routers
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use(
  '/boards/:boardId/tasks',
  (req, res, next) => {
    req.boardId = req.params.boardId;
    next();
  },
  taskRouter
);

// error handler middleware
app.use((err, req, res, next) => {
  handleError(err, res);
  next();
});

module.exports = app;
