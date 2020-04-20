const Board = require('./board.db.model');
const tasksService = require('../tasks/task.service');

const getAll = async () => {
  return Board.find({});
};

const getBoardById = async id => {
  const res = await Board.findOne({ _id: id });
  return res;
};

const createBoard = async board => {
  return Board.create(board);
};

const deleteBoardById = async id => {
  const res = await Board.deleteOne({ _id: id });

  if (!res.deletedCount) {
    return false;
  }

  // When somebody DELETE Board, all its Tasks should be deleted as well.
  const tasks = await tasksService.getTasksByBoardId(id);
  for (const task of tasks) {
    await tasksService.deleteTaskByBoardIdAndTaskId(id, task.id);
  }

  return true;
};

const updateBoardById = async (id, data) => {
  const res = await Board.updateOne({ _id: id }, data);
  return res.ok;
};

module.exports = {
  getAll,
  createBoard,
  getBoardById,
  updateBoardById,
  deleteBoardById
};
