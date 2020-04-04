const tasksRepo = require('./task.memory.repository');

const getTasksByBoardId = boardId => tasksRepo.getTasksByBoardId(boardId);
const createTaskOnBoard = (boardId, task) => {
  return tasksRepo.createTaskOnBoard(boardId, task);
};
const getTaskByBoardIdAndTaskId = (boardId, taskId) => {
  return tasksRepo.getTaskByBoardIdAndTaskId(boardId, taskId);
};
const deleteTaskByBoardIdAndTaskId = (boardId, taskId) => {
  return tasksRepo.deleteTaskByBoardIdAndTaskId(boardId, taskId);
};
const updateTaskByBoardIdAndTaskId = (boardId, taskId, data) => {
  return tasksRepo.updateTaskByBoardIdAndTaskId(boardId, taskId, data);
};

module.exports = {
  getTasksByBoardId,
  createTaskOnBoard,
  getTaskByBoardIdAndTaskId,
  updateTaskByBoardIdAndTaskId,
  deleteTaskByBoardIdAndTaskId
};
