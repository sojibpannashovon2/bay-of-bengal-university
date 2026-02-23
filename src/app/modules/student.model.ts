import { Schema, model } from "mongoose";
import {
  TGurdian,
  TLocalGurdian,
  TStudent,
  StudentModel,
  TUserName,
} from "./student/student.interface";
import validator from "validator";
import bcrypt from "bcrypt";
import config from "../config";
// 1. Create a Schema corresponding to the document interface.

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name Must Be Enter"],
    trim: true,
    maxLength: [20, "First Name Word, Max Allowed Character length is 20"],

    //Custom Validator

    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: "{VALUE} is not in capitalize format",
    },
  },
  middleName: {
    type: String,
    required: [true, "Middle Name Required"],
    trim: true,
  },

  lastName: {
    type: String,
    required: [true, "Last Name Required"],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: `{VALUE} is not valid`,
    },
  },
});

const gurdianSchema = new Schema<TGurdian>({
  fatherName: {
    type: String,
    required: [true, "Father Name is Required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father Contact No is Required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother Name is Required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother Occupation is Required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother Contact No is Required"],
  },
});

const localGurdianSchema = new Schema<TLocalGurdian>({
  name: {
    type: String,
    required: [true, "Local Gurdian Name is Required"],
  },
  occupation: {
    type: String,
    required: [true, "Local Gurdian Occupation is Required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local Gurdian Contact No is Required"],
  },
  address: {
    type: String,
    required: [true, "Local Gurdian Address is Required"],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: [true, "Password is required"],
    // unique: true,
    maxLength: [20, "Password can not be more than 20 characters"],
  },

  //?Built in validation
  name: {
    type: userNameSchema,
    required: [true, "Student Name is Required"],
  },
  // Mongoose Built in Validator
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message:
        '{VALUE} is not Valid  :- The gender field can only be one of the follwing: "male", "female" Or "other"',
    },
    required: true,
  },

  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    //Using NPM Validator
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "Invalid email format",
    },
  },

  contactNo: { type: String, required: true },
  emergencyContactNo: {
    type: String,
    required: [true, "Student Emergency Contact No is Required"],
  },

  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },

  presentAddress: {
    type: String,
    required: [true, "Student Present Address is Required"],
  },
  permanentAddress: {
    type: String,
    required: [true, "Student Permanent Address is Required"],
  },

  gurdian: {
    type: gurdianSchema,
    required: true,
  },

  localGurdian: {
    type: localGurdianSchema,
    required: true,
  },

  profileImage: { type: String },
  isActive: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
});

//? Pre save middleware/ hook - Document Middleware
studentSchema.pre("save", async function () {
  // console.log(this, "Pre hook: we will save data");
  // Hashing password and save into database
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
});

//? Post save middleware/ hook - Document Middleware

studentSchema.post("save", function (doc, next) {
  // console.log(this, "Post hook: we saved our data");
  doc.password = "";
  next();
});

//? Query Middleware

studentSchema.pre("find", function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } });
});

studentSchema.pre("findOne", function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } });
});

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

//? Creating a custom static method

studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

//? Creating a custom instance method
/*
studentSchema.methods.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
*/
//! 2. Create a Model.
// const User = model("User", userSchema);

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
