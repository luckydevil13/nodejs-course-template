const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res, next) => {
    const user = await usersService.createUser(req.body);

    return user
      ? res.json(User.toResponse(user))
      : next({ status: 400, message: 'Bad request' });
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    const user = await usersService.getUserById(req.params.id);
    if (!user) {
      return next({ status: 404, message: 'User not found' });
    }

    res.json(User.toResponse(user));
  })
  .put(async (req, res, next) => {
    const user = await usersService.updateUserById(req.params.id, req.body);

    return user
      ? res.json(user)
      : next({ status: 400, message: 'Bad request' });
  })
  .delete(async (req, res, next) => {
    const isSuccess = await usersService.deleteUserById(req.params.id);

    return isSuccess
      ? res.status(204).json({ message: 'The user has been deleted' })
      : next({ status: 404, message: 'User not found' });
  });

module.exports = router;
