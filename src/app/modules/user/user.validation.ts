import * as z from "zod";

const userValidationSchema = z.object({
  //? id: z.string(),  //? Id will be Genarated by server for  privacy and policy [It will be genarated by Admin or by default created]
  password: z
    .string()
    .max(20, { message: `Password Cannot more then 20` })
    .refine((value) => typeof value === "string", {
      message: "Name must be a string",
    })
    .optional(),
  // needPasswordChange: z.boolean().optional().default(true),//? No need because it not will be added by Admin
  // role: z.enum(["student", "faculty", "admin"]),//?Role Will be created from Endpoint
  // status: z.enum(["in-progress", "blocked"]).default("in-progress"),
  // isDeleted: z.boolean().optional().default(false),
});

export const userValidation = {
  userValidationSchema,
};
