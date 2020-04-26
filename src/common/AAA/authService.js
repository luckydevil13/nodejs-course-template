const usersRepo = require('../../resources/users/user.db.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { ErrorHandler } = require('../errorHandler');

const checkUser = async params => {
  const user = (await usersRepo.getUserByLogin(params.login)) || {};
  const res = await bcrypt.compare(params.password, user.password);

  if (!res) {
    throw new ErrorHandler(403, 'Forbidden');
  }

  return jwt.sign(
    {
      userId: user.id,
      login: user.login
    },
    JWT_SECRET_KEY
  );
};

const checkToken = (req, res, next) => {
  if (req.url === '/login' || req.url === '/doc' || req.url === '/') {
    next();
  } else {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ErrorHandler(401, 'Unauthorized');
    }

    try {
      jwt.verify(authHeader.substring(7), JWT_SECRET_KEY);
      next();
    } catch (error) {
      next(error);
    }
  }
};

module.exports = {
  checkUser,
  checkToken
};
