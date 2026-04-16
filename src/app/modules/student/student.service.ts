// Query works is Mongoose Model in Service Page
import { Student } from "./student.model";
import { TStudent } from "./student.interface";

//? Get all database from student database
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
//?Get Single Data from student database
const getStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

//?Delete Single Data from student database
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};
export const StudentServices = {
  // createStudentIntoDB,  Refactoring to user service
  getAllStudentsFromDB,
  getStudentFromDB,
  deleteStudentFromDB,
};
