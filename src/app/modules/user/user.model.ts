import mongoose from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new mongoose.Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
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

//? Creating a custom static method

userSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await User.findOne({ id });

  return existingUser;
};

export const User = mongoose.model<TUser>("User", userSchema);
