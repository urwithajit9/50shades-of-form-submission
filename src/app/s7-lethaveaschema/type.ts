import {z} from "zod"



export const formSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(6),
  password_confirmation: z.string().min(6),
  phone_number: z.string().min(10),
  salary: z.string().nonempty(),
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
