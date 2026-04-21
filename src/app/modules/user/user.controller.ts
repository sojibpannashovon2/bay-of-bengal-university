import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { userNameValidationSchema } from "../student/student.validation";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";

//Refactoring - Move create Student data to User Data

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
    // res.status(200).json({
    //   success: true,
    //   message:
    //   data: result,
    // });

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Student is created Sucessfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const UserControllers = {
  createStudent,
};
