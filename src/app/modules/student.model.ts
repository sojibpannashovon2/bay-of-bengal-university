import { Schema, model, connect } from "mongoose";
import {
  Gurdian,
  LocalGurdian,
  Student,
  UserName,
} from "./student/student.interface";

// 1. Create a Schema corresponding to the document interface.

const userNameSchema = new Schema<UserName>({
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
  },
});

const gurdianSchema = new Schema<Gurdian>({
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

const localGurdianSchema = new Schema<LocalGurdian>({
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

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },

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
    validate: {
      validator: function (value: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
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
});

//! 2. Create a Model.
// const User = model("User", userSchema);

export const StudentModel = model<Student>("Student", studentSchema);
