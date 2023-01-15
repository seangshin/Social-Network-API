const router = require('express').Router();

const {
  getUsers,
  createUser,
  deleteUser,
} = require('../../controllers/userController');

// /api/users
router
.route('/')
.get(getUsers)
.post(createUser)
.delete(deleteUser);

module.exports = router;