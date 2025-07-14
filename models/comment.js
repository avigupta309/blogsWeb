const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  content: {
    type: String,
    trim: true,
    required: true,
  },
  blockId: {
    type: Schema.Types.ObjectId,
    ref: "blmodel",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "app",
  },
});

const commentModel = new model("cmnt", commentSchema);

module.exports = { commentModel };
