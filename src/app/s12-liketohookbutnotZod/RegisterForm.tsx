"use client";
import { FormData } from "./type";
import {useForm} from "react-hook-form";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateSalary,
  validatePhone,
} from "./validate_utils";

interface FormProps {
  onSubmit: (formData: FormData) => void;
}
export default function RegisterForm({ onSubmit }: FormProps) {
    const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
    } = useForm<FormData>();  

  const label_tailwind_classes = "block text-gray-700 text-sm font-bold mb-2";
  const input_tailwind_classes =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h1 className="text-2xl font-bold mb-4 border-b-2 border-blue-500">
        Register
      </h1>
      <div className="mb-4">
        <label className={label_tailwind_classes}>Name<span className="text-red-500">*</span></label>
        <input
          className={input_tailwind_classes}
         
          type="text"
          {...register("name", { validate: validateName })}
        
          placeholder="Name"
        />
        {errors.name && <p className="text-red-500 mt-2">{errors.name.message}</p>}
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>Email<span className="text-red-500">*</span></label>
        <input
          className={input_tailwind_classes}
          {...register("email", { validate: validateEmail })}
          type="email"
    
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500 mt-2">{errors.email.message}</p>}
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>Password<span className="text-red-500">*</span></label>
        <input
          className={input_tailwind_classes}
          {...register("password", { validate: validatePassword })}
          type="password"

          placeholder="Password"
        />
        {errors.password && <p className="text-red-500 mt-2">{errors.password.message}</p>}
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>Confirm Password<span className="text-red-500">*</span></label>
        <input
          className={input_tailwind_classes}
         {...register("password_confirmation", {
          validate: (value) =>
            value === watch("password") || "Passwords do not match",
        })}
          type="password"
      
          placeholder="Confirm Password"
        />
        {errors.password_confirmation && <p className="text-red-500 mt-2">{errors.password_confirmation.message}</p>}
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>Phone Number<span className="text-red-500">*</span></label>
        <input
          className={input_tailwind_classes}
          {...register("phone_number", { validate: validatePhone })}
          type="text"

          placeholder="Phone Number"
        />
        {errors.phone_number && <p className="text-red-500 mt-2">{errors.phone_number.message}</p>}
      </div>

      <div className="mb-4">
        <label className={label_tailwind_classes}>Salary<span className="text-red-500">*</span></label>
        <input
          className={input_tailwind_classes}
          {...register("salary", { validate: validateSalary })}
          type="text"

          placeholder="Salary"
        />
        {errors.salary && <p className="text-red-500 mt-2">{errors.salary.message}</p>}
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
         
          type="submit"
        >
         Submit
        </button>
      </div>
    </form>
  );
}
