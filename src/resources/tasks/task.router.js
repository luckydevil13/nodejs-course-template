const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router
  .route('/')
  .get(async (req, res) => {
    res.json(await tasksService.getTasksByBoardId(req.boardId));
  })
  .post(async (req, res, next) => {
    const task = await tasksService.createTaskOnBoard(req.boardId, req.body);

    return task
      ? res.json(Task.toResponse(task))
      : next({ status: 400, message: 'Bad request' });
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    const task = await tasksService.getTaskByBoardIdAndTaskId(
      req.boardId,
      req.params.id
    );
    if (!task) {
      return next({ status: 404, message: 'Task not found' });
    }

    res.json(Task.toResponse(task));
  })
  .put(async (req, res, next) => {
    const task = await tasksService.updateTaskByBoardIdAndTaskId(
      req.boardId,
      req.params.id,
      req.body
    );

    return task
      ? res.json(task)
      : next({ status: 404, message: 'Task not found' });
  })
  .delete(async (req, res, next) => {
    const isSuccess = await tasksService.deleteTaskByBoardIdAndTaskId(
      req.boardId,
      req.params.id
    );

    return isSuccess
      ? res.status(204).json({ message: 'The Task has been deleted' })
      : next({ status: 404, message: 'Task not found' });
  });

module.exports = router;
