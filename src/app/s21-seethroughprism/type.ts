import {z} from "zod"



// ✅ Define Zod Schema for Validation
export const formSchema = z.object({
  name: z.string().min(6, "Name is required").regex(/^[A-Za-z\s]+$/, "Name must contain only letters"),
  email: z.string().min(6, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must have at least one uppercase letter")
    .regex(/[a-z]/, "Password must have at least one lowercase letter")
    .regex(/[0-9]/, "Password must have at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must have at least one special character"),
  password_confirmation: z.string(),
  salary: z.string().regex(/^\d+$/, "Salary must be a positive number"),
  phone_number: z.string().regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
}).refine((data) => data.password === data.password_confirmation, {
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
