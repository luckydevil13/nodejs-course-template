const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const createUser = user => usersRepo.createUser(user);
const getUserById = id => usersRepo.getUserById(id);
const deleteUserById = id => usersRepo.deleteUserById(id);
const updateUserById = (id, data) => {
  return usersRepo.updateUserById(id, data);
};

module.exports = {
  getAll,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById
};
