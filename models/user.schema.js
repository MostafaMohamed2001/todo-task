const { Schema , model } = require("mongoose");
const bcrypt = require("bcrypt");

const { levels } = require("../config/constants");

const userSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique:true,
    },
    experienceYears: {
      type: Number,
      required: true,
      min: 0,
    },
    level: {
      type: String,
      enum: Object.values(levels),
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 32,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = model("User", userSchema);
