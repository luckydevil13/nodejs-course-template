const Task = require('./task.model');

const boardsAndTasks = {};

const getTasksByBoardId = async boardId => {
  return boardsAndTasks[boardId] || [];
};

const getTaskByBoardIdAndTaskId = async (boardId, taskId) => {
  return (boardsAndTasks[boardId] || []).find(task => task.id === taskId);
};

const createTaskOnBoard = async (boardId, task) => {
  const newtask = new Task(task);
  boardsAndTasks[boardId] = boardsAndTasks[boardId] || [];
  boardsAndTasks[boardId].push(newtask);

  return newtask;
};

const deleteTaskByBoardIdAndTaskId = async (boardId, taskId) => {
  // TODO should unassign task's tasks upon deletion
  const tasks = await getTasksByBoardId(boardId);
  if (!tasks) {
    return false;
  }

  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (!taskIndex) {
    return false;
  }

  const index = tasks.indexOf(taskIndex);
  tasks.splice(index, 1);

  return true;
};

const updateTaskByBoardIdAndTaskId = async (boardId, taskId, data) => {
  const tasks = await getTasksByBoardId(boardId);

  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex) {
    return (tasks[taskIndex] = data);
  }
};

module.exports = {
  getTasksByBoardId,
  createTaskOnBoard,
  getTaskByBoardIdAndTaskId,
  updateTaskByBoardIdAndTaskId,
  deleteTaskByBoardIdAndTaskId
};
