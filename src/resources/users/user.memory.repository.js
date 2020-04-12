const User = require('./user.model');
const boardsService = require('../boards/board.service');
const tasksService = require('../tasks/task.service');

const users = [
  {
    id: '1',
    name: 'admin',
    login: 'admin_user',
    password: 'P@55w0rd'
  }
];

const getAll = async () => {
  return users;
};

const getUserById = async id => {
  return users.find(user => user.id === id);
};

const createUser = async user => {
  const newUser = new User(user);
  users.push(newUser);
  return newUser;
};

const deleteUserById = async id => {
  const user = await getUserById(id);
  if (!user) {
    return false;
  }
  const index = users.indexOf(user);
  users.splice(index, 1);

  // When somebody DELETE User, all Tasks where User is assignee should be updated to put userId=null.
  const boards = await boardsService.getAll();
  boards.forEach(board => {
    (async () => {
      const tasks = await tasksService.getTasksByBoardId(board.id);
      tasks.forEach(task => {
        if (task.userId === id) {
          (async () => {
            await tasksService.updateTaskByBoardIdAndTaskId(board.id, task.id, {
              ...task,
              userId: null
            });
          })();
        }
      });
    })();
  });

  return true;
};

const updateUserById = async (id, data) => {
  const user = await getUserById(id);
  if (user) {
    const index = users.indexOf(user);
    users[index].name = data.name ? data.name : users[index].name;
    users[index].login = data.login ? data.login : users[index].login;
    users[index].password = data.password
      ? data.password
      : users[index].password;

    return users[index];
  }
};

module.exports = {
  getAll,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById
};
