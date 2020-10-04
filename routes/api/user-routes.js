const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,


 } = require("../../controllers/user-controller");

// Set up GET all and POST at /api/user
router.route("/").get(getAllUsers).post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);


//user adds a friend
//user deletes a friend
// /api/users/<userId>/friends/<friendId>
router.route('/:userId/friends/:friendId')
.post(addFriend).delete(deleteFriend);



module.exports = router;
