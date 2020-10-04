const { User } = require("../models");

const UserController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "reaction",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbsocial) => res.json(dbsocial))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thought",
        select: "-__v",
      })
      .select("-__v")
      .then((dbsocial) => {
        // If no user is found, send 404
        if (!dbsocial) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbsocial);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // createUser
  createUser({ body }, res) {
    User.create(body)
      .then((dbsocial) => res.json(dbsocial))
      .catch((err) => res.status(400).json(err));
  },

  


 // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbsocial) => {
        if (!dbsocial) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbsocial);
      })
      .catch((err) => res.status(400).json(err));
  },

    // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbsocial) => {
        if (!dbsocial) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbsocial);
      })
      .catch((err) => res.status(400).json(err));
  },

   //add friend 
   addFriend(req, res) {
     console.log(req.params);
    User.findByIdAndUpdate(
      req.params.userId,
      { $push: { friends: req.params.friendId } },
      { new: true }
    )
      .then(dbsocial => {
        if (!dbsocial) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbsocial);
      })
      .catch(err => {
        res.json(err) 
        console.log(err)}
        );
      


    },

    // remove friend 
    deleteFriend(req, res) {
  User.findOneAndUpdate(
    req.params.userId ,
    { $pull: { friends: req.params.friendId  } },
    { new: true }
  )
    .then(dbsocial => res.json(dbsocial))
    .catch(err => res.json(err));
},




};
  


module.exports = UserController;
