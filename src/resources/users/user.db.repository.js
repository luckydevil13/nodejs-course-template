const User = require('./user.db.model');
const bcrypt = require('bcrypt');
const SALT_COUNT = 3;

const boardsService = require('../boards/board.service');
const tasksService = require('../tasks/task.service');

const getAll = async () => {
  return User.find({});
};

const getUserByLogin = async login => {
  return User.findOne({ login });
};

const getUserById = async id => {
  return User.findOne({ _id: id });
};

const createUser = async user => {
  return bcrypt.hash(user.password, SALT_COUNT).then(hash => {
    return User.create({
      ...user,
      password: hash
    });
  });
};

const updateUserById = async (id, data) => {
  return bcrypt.hash(data.password, SALT_COUNT).then(hash => {
    return User.update(
      { _id: id },
      {
        ...data,
        password: hash
      }
    );
  });
};

const deleteUserById = async id => {
  const res = await User.deleteOne({ _id: id });

  if (!res.deletedCount) {
    return false;
  }

  // When somebody DELETE User, all Tasks where User is assignee should be updated to put userId=null.
  const boards = await boardsService.getAll();
  for (const board of boards) {
    const tasks = await tasksService.getTasksByBoardId(board);
    for (const task of tasks) {
      if (task.userId === id) {
        task.userId = null;
        await task.save();
      }
    }
  }

  return true;
};

module.exports = {
  getAll,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByLogin
};
