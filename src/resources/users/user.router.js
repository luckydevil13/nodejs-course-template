const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { ErrorHandler } = require('../../common/errorHandler');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const users = await usersService.getAll();
      // map user fields to exclude secret fields like "password"
      return res.json(users.map(User.toResponse));
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await usersService.createUser(req.body);

      if (!user) {
        throw new ErrorHandler(400, 'Bad request');
      }

      return res.json(User.toResponse(user));
    } catch (error) {
      next(error);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const user = await usersService.getUserById(req.params.id);
      if (!user) {
        throw new ErrorHandler(404, 'User not found');
      }

      return res.json(User.toResponse(user));
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const user = await usersService.updateUserById(req.params.id, req.body);

      if (!user) {
        throw new ErrorHandler(400, 'Bad request');
      }

      return res.json(user);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const isSuccess = await usersService.deleteUserById(req.params.id);
      if (!isSuccess) {
        throw new ErrorHandler(404, 'User not found');
      }

      return res.status(204).json({ message: 'The user has been deleted' });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
