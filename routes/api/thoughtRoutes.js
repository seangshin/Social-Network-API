const router = require('express').Router();

const {
  getThoughts,
  createThought,
  deleteThought,
} = require('../../controllers/thoughtController');

// /api/users
router
.route('/')
.get(getThoughts)
.post(createThought)
.delete(deleteThought);

module.exports = router;