import * as z from "zod";

const userSchema = z.object({
  id: z.string(),
  password: z.string().max(20, { message: `Password Cannot more then 20` }),
  needPasswordChange: z.boolean().optional().default(true),
  role: z.enum(["student", "faculty", "admin"]),
  status: z.enum(["in-progress", "blocked"]).default("in-progress"),
  isDeleted: z.boolean().optional().default(false),
});

export const userValidationSchema = {
  userSchema,
};
