// Query works is Mongoose Model in Service Page
import { StudentModel } from "../student.model";
import { Student } from "./student.interface";

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};
//? Get all database from student database
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};
//?Get Single Data from student database
const getStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getStudentFromDB,
};
