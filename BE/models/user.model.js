import mongoose from "mongoose";

import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: null },

    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: false,
    },
    

    timeLogin: { type: Date, default: null },

    isActive: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    deleteAt: { type: Date, default: null },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema, "users");

export default User;
