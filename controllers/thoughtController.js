const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models'); //import User model

module.exports = {
  //get all users in User document for social-mediaDB collection
  async getThoughts(req, res) {
    try {
      const thoughtData = await Thought.find();
      res.status(200).json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //create a users in User document for social-mediaDB collection
  async createThought(req, res) {
    try{
      const thoughtData = await Thought.create(req.body);
      res.status(200).json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete a user in User document
  async deleteThought(req, res) {
    try{
      const thoughtId = ObjectId(req.body.id);
      const thoughtData = await Thought.findOneAndRemove(thoughtId);
      if (!thoughtData) return res.status(404).json('Thought not found');
      res.status(200).json(`Thought with id ${thoughtId} was deleted.`);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};