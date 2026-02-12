import { z } from "zod";

export const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First Name Must Be Enter")
    .max(20, "First Name Word, Max Allowed Character length is 20")
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: "First name must start with a capital letter",
      },
    ),

  middleName: z.string().trim().min(1, "Middle Name Required"),

  lastName: z
    .string()
    .trim()
    .min(1, "Last Name Required")
    .regex(/^[A-Za-z]+$/, "Last Name must contain only alphabets"),
});

export const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father Name is Required"),
  fatherOccupation: z.string().min(1, "Father Occupation is Required"),

  fatherContactNo: z.string().min(1, "Father Contact No is Required"),

  motherName: z.string().min(1, "Mother Name is Required"),

  motherOccupation: z.string().min(1, "Mother Occupation is Required"),

  motherContactNo: z.string().min(1, "Mother Contact No is Required"),
});

export const localGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local Guardian Name is Required"),

  occupation: z.string().min(1, "Local Guardian Occupation is Required"),

  contactNo: z.string().min(1, "Local Guardian Contact No is Required"),

  address: z.string().min(1, "Local Guardian Address is Required"),
});

//? Main Student Schema

const studentValidationSchema = z.object({
  id: z.string().min(1, "Student ID is Required"),

  name: userNameValidationSchema,

  gender: z.enum(["male", "female", "other"], {
    message: 'Gender must be one of: "male", "female", or "other"',
  }),

  dateOfBirth: z.string().optional(),

  email: z
    .string()
    .min(1, "Email is Required")
    .email("Invalid email format")
    .transform((val) => val.toLowerCase()),

  contactNo: z.string().min(1, "Contact No is Required"),

  emergencyContactNo: z
    .string()
    .min(1, "Student Emergency Contact No is Required"),

  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),

  presentAddress: z.string().min(1, "Student Present Address is Required"),

  permanentAddress: z.string().min(1, "Student Permanent Address is Required"),

  gurdian: guardianValidationSchema,

  localGurdian: localGuardianValidationSchema,

  profileImage: z.string(),

  isActive: z.enum(["active", "blocked"]).default("active"),
});

/* ===============================
   5️⃣ Type Inference
================================= */


export default studentValidationSchema;