const { Schema, model } = require("mongoose");
const moment = require("moment");


const ReactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment's _id field
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280 
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);





const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 280,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) =>
      moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
  },
  username: {
    type: String,
    required: true,
  },
  
      replies: [ReactionSchema],
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reaction.length;
});

const User = model("Thought", ThoughtSchema);

module.exports = Thought;
