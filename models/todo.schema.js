const { Schema, Types, model } = require("mongoose");
const { priority } = require("../config/constants");

const todoSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: false,
      trim: true,
    },
    priority: {
      type: String,
      enum: Object.values(priority),
      default: priority.low,
    },
    dueDate: {
      type: Date,
      required: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Todo", todoSchema);
