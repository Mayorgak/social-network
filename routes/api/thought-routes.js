const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  deleteThought,
  updateThought,
  // deleteReaction,
  // addReaction,
  
 
} = require("../../controllers/thought-controller");

// // /api/thought/<userId>
// router.route("/:userId")

// Set up GET all thoughts
router.route("/").get(getAllThoughts).post(createThought);

// /api/thought/<userId>/<thoughtId>
router.route("/:id").get(getThoughtById).put(updateThought).delete(deleteThought);


// /api/thoughts/:id/reactions/
// router.route('/:id/reactions/')
// .post(addReaction);

//delete a reaction
//update a thought
// /api/thoughts/:id/reactions/<reactionId>
// router.route('/:id/reactions/:reactionId')
// .put(updateReaction)
// .delete(deleteReaction);

module.exports = router;
