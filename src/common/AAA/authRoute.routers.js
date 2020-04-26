const authService = require('./authService');
const router = require('express').Router();

router.route('/').post(async (req, res, next) => {
  try {
    const token = await authService.checkUser(req.body);

    return res.json({ token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
