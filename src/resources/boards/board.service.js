const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const createBoard = board => boardsRepo.createBoard(board);
const getBoardById = id => boardsRepo.getBoardById(id);
const deleteBoardById = id => boardsRepo.deleteBoardById(id);
const updateBoardById = (id, data) => {
  return boardsRepo.updateBoardById(id, data);
};

module.exports = {
  getAll,
  createBoard,
  getBoardById,
  updateBoardById,
  deleteBoardById
};
