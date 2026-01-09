import express, { Application, Request, Response } from "express";
import cors from "cors";
//npm install -D @types/express  -- If there are issue found on req and res
//npm i -- save-dev @types/cors
const app: Application = express();

//parser

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// console.log(process.cwd());

//CWD == Means Corrent Working Derectory

export default app;
