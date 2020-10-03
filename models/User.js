const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
  username: {
    type: String,
    trim: true,
    required: "Username is Required",
    unique: true,
  },

  email: {
    type: String,
    unique: true,
    required: "Email is Required",
    match: [/.+@.+\..+/],
  },

  thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      },
    ],

friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    ],
}

);

UserSchema.virtual("Count").get(function () {
  return this.friend.length;
});

const User = model("User", UserSchema);

module.exports = User;
