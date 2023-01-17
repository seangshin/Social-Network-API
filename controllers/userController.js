const { ObjectId } = require('mongoose').Types;
const { User } = require('../models'); //import User model

module.exports = {
  //get all users in User document for social-mediaDB collection
  async getUsers(req, res) {
    try {
      const userData = await User.find();
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //get single user in User document for social-mediaDB collection
  async getOneUser(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.userId });
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //create a users in User document for social-mediaDB collection
  async createUser(req, res) {
    try{
      const userData = await User.create(req.body);
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update a users in User document for social-mediaDB collection
  async updateUser(req, res) {
    try{
      const userData = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true });
      if (!userData) return res.status(404).json('User not found');
      res.status(200).json(`User with id ${req.params.userId} was updated.`);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete a user in User document
  async deleteUser(req, res) {
    try{
      const userData = await User.findOneAndRemove(req.params.userId);
      if (!userData) return res.status(404).json('User not found');
      res.status(200).json(`User with id ${req.params.userId} was deleted.`);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};