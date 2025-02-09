import { z } from "zod";

// for picking all error messages and showing as list
const passwordSchema = z
  .string()
  .min(1, "Password is required") // If blank, show only this error
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one digit")
  .regex(/[\W_]/, "Password must contain at least one special character");

// for picking only one error message
// const passwordSchema = z
//   .string()
//   .min(1, "Password is required")
//   .refine((val) => val.length >= 8, {
//     message: "Password must be at least 8 characters",
//   })
//   .refine((val) => /[A-Z]/.test(val), {
//     message: "Must contain at least one uppercase letter",
//   })
//   .refine((val) => /[a-z]/.test(val), {
//     message: "Must contain at least one lowercase letter",
//   })
//   .refine((val) => /[0-9]/.test(val), {
//     message: "Must contain at least one digit",
//   })
//   .refine((val) => /[\W_]/.test(val), {
//     message: "Must contain at least one special character",
//   });

const emailSchmea = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email format")
  .refine(async (email) => {
    const res = await fetch(`http://127.0.0.1:8000/api/check-email?email=${email}`);
    const data = await res.json();
    return data.isAvailable; // API should return { available: true/false }
  }, { message: "Email already taken from Zod" });

const nameSchema = z
  .string()
  .min(6, "Name is required (minimum 6 characters) ")
  .regex(/^[A-Za-z\s]+$/, "Name must contain only letters");

// ✅ Define Zod Schema for Validation
export const formSchema = z
  .object({
    name: nameSchema,
    email: emailSchmea,
    password: passwordSchema,
    password_confirmation: z.string(),
    salary: z.string().regex(/^\d+$/, "Salary must be a positive number"),
    phone_number: z
      .string()
      .regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

// ✅ Define TypeScript Type (Auto-inferred from Zod Schema)
export type FormData = z.infer<typeof formSchema>;

// export interface FormData {
//   name: string;
//   email: string;
//   password: string;
//   password_confirmation: string;
//   phone_number: string;
//   salary: string;
// }
