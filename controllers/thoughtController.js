const { User, Thought } = require('../models'); //import Thought model

module.exports = {
  //get all thoughts in Thought document for social-mediaDB collection
  async getThoughts(req, res) {
    try {
      const thoughtData = await Thought.find();
      res.status(200).json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //get single thought in Thought document for social-mediaDB collection
  async getOneThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
      res.status(200).json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //create a thought in Thought document for social-mediaDB collection
  async createThought(req, res) {
    try{
      const thoughtData = await Thought.create(req.body);
      res.status(200).json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update a thoughts in Thought document for social-mediaDB collection
  async updateThought(req, res) {
    try{
      const thoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true });
      if (!thoughtData) return res.status(404).json('Thought not found');
      res.status(200).json(`Thought with id ${req.params.thoughtId} was updated.`);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete a thought in Thought document
  async deleteThought(req, res) {
    try{
      const thoughtData = await Thought.findOneAndRemove(req.params.thoughtId);
      if (!thoughtData) return res.status(404).json('Thought not found');
      res.status(200).json(`Thought with id ${req.params.thoughtId} was deleted.`);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};