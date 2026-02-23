import { Schema, model, connect, Model } from "mongoose";

export type TGurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TLocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  gender: "male" | "female" | "other";
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

  presentAddress: string;
  permanentAddress: string;
  gurdian: TGurdian;
  localGurdian: TLocalGurdian;
  profileImage?: string;
  isActive: "active" | "blocked";
  isDeleted: boolean;
};

//? Now creating the static method

export interface StudentModel extends Model<TStudent> {
  isUserExist(id: string): Promise<TStudent | null>;
}

//! If Student is null than is controller studentSchema.methods will be error

/*
 --- This is for creating instance method ---
export type StudentMethods = {
  isUserExist(id: string): Promise<TStudent | null>;
};


export type StudentModel = Model<
  TStudent,
  Record<string, never>
  // StudentMethods
>;
*/
