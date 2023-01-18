const { Thought } = require('../models'); //import Thought model

module.exports = {
  //get all thoughts in Thought document for social-mediaDB collection
  async getThoughts(req, res) {
    try {
      const thoughtData = await Thought.find();
      thoughtData.formattedTimestamp;
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
      const thoughtData = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thoughtData) return res.status(404).json('Thought not found');
      res.status(200).json(`Thought with id ${req.params.thoughtId} was deleted.`);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //create a reaction in Thought document for social-mediaDB collection
  async createReaction(req, res) {
    try{
      const thoughtData = await Thought.findById(req.params.thoughtId);
      if (!thoughtData) return res.status(404).json(`Thought not found.`);

      const newReaction = { reactionBody: req.body.reactionBody , username: req.body.username }
      thoughtData.reactions.push(newReaction);

      await thoughtData.save();
      res.status(200).json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete a reaction in Thought document for social-mediaDB collection
  async deleteReaction(req, res) {
    try{
      const thoughtData = await Thought.findById(req.params.thoughtId);
      if (!thoughtData) return res.status(404).json(`Thought not found.`);
      thoughtData.reactions.pull({ _id: req.body._id });

      await thoughtData.save();
      res.status(200).json(`Reaction deleted.`);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};