import { Request, Response } from "express";

import { userNameValidationSchema } from "../student/student.validation";
import { userServices } from "./user.service";

//Refactoring - Move create Student data to User Data

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;

    //?creating  a schema validation using zod

    // const zodParsedData = userNameValidationSchema.parse(studentData);

    //? Will call service function to send this data
    const result = await userServices.createStudentIntoDB(
      password,
      studentData,
    );
    //? Send Response
    res.status(200).json({
      success: true,
      message: "Student is created Sucessfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      messsage: error.message || "Something Went Wrong",
      error: error,
    });
  }
};

export const UserControllers = {
  createStudent,
};
