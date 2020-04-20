const Task = require('./task.db.model');

const getTasksByBoardId = async id => {
  return await Task.find({ boardId: id });
};

const getTaskByBoardIdAndTaskId = async (boardId, taskId) => {
  const res = await Task.findOne({ _id: taskId, boardId });

  return res;
};

const createTaskOnBoard = async (boardId, task) => {
  task.boardId = boardId;

  return await Task.create(task);
};

const deleteTaskByBoardIdAndTaskId = async (boardId, taskId) => {
  const res = await Task.deleteOne({ _id: taskId, boardId });
  return res.ok;
};

const updateTaskByBoardIdAndTaskId = async (boardId, taskId, data) => {
  const res = await Task.updateOne({ _id: taskId, boardId }, data);

  return res.ok;
};

module.exports = {
  getTasksByBoardId,
  createTaskOnBoard,
  getTaskByBoardIdAndTaskId,
  updateTaskByBoardIdAndTaskId,
  deleteTaskByBoardIdAndTaskId
};
