import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/student/student.route";
import { UserRoutes } from "./app/modules/user/user.route";
import { success } from "zod";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//Application routes

// app.use("/api/v1/students", StudentRoutes);
app.use("/api/v1/users", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("This is home page only ");
});

// console.log(process.cwd());

//CWD == Means Corrent Working Derectory

app.use(globalErrorHandler);

export default app;
