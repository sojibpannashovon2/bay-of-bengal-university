import mongoose from "mongoose";
import { TUser } from "./user.interface";

import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new mongoose.Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },

    // password: {
    //   type: String,
    //   required: [true, "Password is required"],
    //? unique: true,
    //   maxLength: [20, "Password can not be more than 20 characters"],
    // },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },

    //   createdAt:{
    //     type:Date,
    //     default:Date.now(),
    //   }

    //? Bydefaut
  },
  {
    timestamps: true,
  },
);

//? Pre save middleware/ hook - Document Middleware
userSchema.pre("save", async function () {
  // console.log(this, "Pre hook: we will save data");
  // Hashing password and save into database
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
});

//? Post save middleware/ hook - Document Middleware

userSchema.post("save", function (doc, next) {
  // console.log(this, "Post hook: we saved our data");
  doc.password = " ";
  next();
});

//? Creating a custom static method

userSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await User.findOne({ id });

  return existingUser;
};

export const User = mongoose.model<TUser>("User", userSchema);
