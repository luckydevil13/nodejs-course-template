const router = require('express').Router();
const boardsService = require('./board.service');
const { ErrorHandler } = require('../../common/errorHandler');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      return res.json(await boardsService.getAll());
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const board = await boardsService.createBoard(req.body);

      if (!board) {
        throw new ErrorHandler(400, 'Bad request');
      }

      return res.json(board);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const board = await boardsService.getBoardById(req.params.id);
      if (!board) {
        throw new ErrorHandler(404, 'Board not found');
      }

      return res.json(board);
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const board = await boardsService.updateBoardById(
        req.params.id,
        req.body
      );

      if (!board) {
        throw new ErrorHandler(400, 'Bad request');
      }

      return res.json(board);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const isSuccess = await boardsService.deleteBoardById(req.params.id);

      if (!isSuccess) {
        throw new ErrorHandler(404, 'Board not found');
      }

      return res.status(204).json({ message: 'The Board has been deleted' });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
