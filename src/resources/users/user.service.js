const usersRepo = require('./user.db.repository');

const getAll = () => usersRepo.getAll();
const createUser = user => usersRepo.createUser(user);
const getUserById = id => usersRepo.getUserById(id);
const deleteUserById = id => usersRepo.deleteUserById(id);
const getUserByLogin = login => usersRepo.getUserByLogin(login);
const updateUserById = (id, data) => {
  return usersRepo.updateUserById(id, data);
};

module.exports = {
  getAll,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByLogin
};
