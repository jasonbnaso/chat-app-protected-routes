const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default:
        "https://icon-library.com/images/little-person-icon/little-person-icon-2.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// pre() "before saving" A salt password
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);

module.exports = User;
