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

export const User = mongoose.model<TUser>("User", userSchema);
