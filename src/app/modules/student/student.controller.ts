import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    //? Will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);
    //? Send Response
    res.status(200).json({
      success: true,
      message: "Student is created Sucessfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: "Something Went Wrong",
      error: error,
    });
  }
};
//Get student data from database

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Students are retrieved Sucessfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

//?Get Single Student from Database

const getStudent = async (req: Request, res: Response) => {
  try {
    // const studentId = req.params.studentId;
    const { studentId } = req.params;

    const result = await StudentServices.getStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      messsage: "Student is retrieved Sucessfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: "Something Went Wrong",
      error: error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getStudent,
};
