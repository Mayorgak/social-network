const { User , Thought} = require("../models");


const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "user",
        select: "-__v",
      })
      .select("-__v")
      .then((dbsocial) => res.json(dbsocial))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "user",
        select: "-__v",
      })
      .select("-__v")
      .then((dbsocial) => {
        // If no thought is found, send 404
        if (!dbsocial) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbsocial);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create thought
  createThought({ body }, res) {
    Thought.create(body).then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: _id } },
        { new: true }
      ).then((dbsocial) => res.json(dbsocial));
    });
  },

  // update thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbsocial) => {
        if (!dbsocial) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbsocial);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbsocial) => {
        if (!dbsocial) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbsocial);
      })
      .catch((err) => res.status(400).json(err));
  },

  //add Reaaction
  addReaction(req, res) {
    console.log(req.params);
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { thoughts: req.params.thoughtId } },
      { new: true }
    )
      .then((dbsocial) => {
        if (!dbsocial) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbsocial);
      })
      .catch((err) => {
        res.json(err);
        console.log(err);
      });
  },

  // remove friend
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      req.params.thoughtId,
      { $pull: { thought: req.params.thoughtId } },
      { new: true }
    )
      .then((dbsocial) => res.json(dbsocial))
      .catch((err) => res.json(err));
  },
};

  module.exports = thoughtController;
