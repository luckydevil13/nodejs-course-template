const router = require('express').Router();
const tasksService = require('./task.service');
const { ErrorHandler } = require('../../common/errorHandler');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      return res.json(await tasksService.getTasksByBoardId(req.boardId));
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const task = await tasksService.createTaskOnBoard(req.boardId, req.body);

      if (!task) {
        throw new ErrorHandler(400, 'Bad request');
      }

      return res.json(task);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const task = await tasksService.getTaskByBoardIdAndTaskId(
        req.boardId,
        req.params.id
      );

      if (!task) {
        throw new ErrorHandler(404, 'Task not found');
      }

      return res.json(task);
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const task = await tasksService.updateTaskByBoardIdAndTaskId(
        req.boardId,
        req.params.id,
        req.body
      );

      if (!task) {
        throw new ErrorHandler(404, 'Task not found');
      }

      return res.json(task);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const isSuccess = await tasksService.deleteTaskByBoardIdAndTaskId(
        req.boardId,
        req.params.id
      );

      if (!isSuccess) {
        throw new ErrorHandler(404, 'Task not found');
      }

      return res.status(204).json({ message: 'The Task has been deleted' });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
