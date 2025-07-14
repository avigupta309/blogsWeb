const { Schema, model } = require("mongoose");

const blogsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },

    coverImageUrl: {
      required: true,
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "app",
    },
  },
  { timestamps: true }
);

const blogsModel = new model("blmodel", blogsSchema);

module.exports = { blogsModel };
