const router = require('express').Router();
const boardsService = require('./board.service');

router
  .route('/')
  .get(async (req, res) => {
    res.json(await boardsService.getAll());
  })
  .post(async (req, res, next) => {
    const board = await boardsService.createBoard(req.body);

    return board
      ? res.json(board)
      : next({ status: 400, message: 'Bad request' });
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    const board = await boardsService.getBoardById(req.params.id);
    if (!board) {
      return next({ status: 404, message: 'Board not found' });
    }

    res.json(board);
  })
  .put(async (req, res, next) => {
    const board = await boardsService.updateBoardById(req.params.id, req.body);

    return board
      ? res.json(board)
      : next({ status: 400, message: 'Bad request' });
  })
  .delete(async (req, res, next) => {
    const isSuccess = await boardsService.deleteBoardById(req.params.id);

    return isSuccess
      ? res.status(204).json({ message: 'The Board has been deleted' })
      : next({ status: 404, message: 'Board not found' });
  });

module.exports = router;
