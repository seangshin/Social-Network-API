const { User } = require('../models'); //import User model

module.exports = {
  //get all users in User document for social-mediaDB collection
  async getUsers(req, res) {
    try {
      const userData = await User.find();
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //create a users in User document for social-mediaDB collection
  async createUser(req, res) {
    try{
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete a user in User document
  async deleteUser(req, res) {
    try{
      const userData = await User.findOneAndRemove({ _id: req.params.userId });
      !userData 
      ? res.status(404).json({ message: 'No user found' })
      : Thought.deleteMany({ _id: { $in: userData.thoughts }});
      res.json({ message: 'User and thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};