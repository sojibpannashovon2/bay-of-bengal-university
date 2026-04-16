import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";

import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};
  //?if password is not given, use default password

  //?Shortcut Way
  userData.password = password || (config.default_password as string);

  // if (!password) {
  //   user.password = config.default_password as string;
  // } else {
  //   user.password = password;
  // }]

  //? Set student role

  userData.role = "student";

  //? Set Manually Genarated id

  userData.id = "2030100001";

  //? Create a user
  const newUser = await User.create(userData);

  //?Create a student
  if (Object.keys(newUser).length) {
    //Set id, _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; //? Reference Id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }

  return newUser;
};

export const userServices = {
  createStudentIntoDB,
};
