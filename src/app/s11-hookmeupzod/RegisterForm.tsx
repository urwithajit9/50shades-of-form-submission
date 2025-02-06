"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData } from "./type";
import { useState } from "react";
import { z } from "zod";

interface FormProps {
  onSubmit: (formData: FormData) => void;
}
export default function RegisterForm({ onSubmit }: FormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Validate on change or on blur if desired
  });

  // Internal submit handler: reset only if submission is successful.
  const internalSubmit = async (data: FormData) => {
    let success = false;
    try {
      await onSubmit(data);
      console.log("Form submitted successfully!");
      success = true;
      console.log(success);
    } catch (error) {
      console.error("Submission error:", error);
      // Optionally, you can display an error message here.
    }
    if (success) {
      reset(); // Only reset if the API call was successful.
    }
  };
  const label_tailwind_classes = "block text-gray-700 text-sm font-bold mb-2";
  const input_tailwind_classes =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  return (
    <form
      onSubmit={handleSubmit(internalSubmit)}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h1 className="text-2xl font-bold mb-4 border-b-2 border-blue-500">
        Register
      </h1>
      <div className="mb-4">
        <label className={label_tailwind_classes}>
          Name<span className="text-red-500">*</span>
        </label>
        <input
          className={input_tailwind_classes}
          type="text"
          {...register("name")}
          placeholder="Full Name"
        />
        {errors.name && (
          <p className="text-red-500  mt-2">{errors.name.message as string}</p>
        )}
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>
          Email<span className="text-red-500">*</span>
        </label>
        <input
          className={input_tailwind_classes}
          type="email"
          {...register("email")}
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500  mt-2">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>
          Password<span className="text-red-500">*</span>
        </label>
        <input
          className={input_tailwind_classes}
          type="password"
          {...register("password")}
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500  mt-2">{errors.password.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>
          Confirm Password<span className="text-red-500">*</span>
        </label>
        <input
          className={input_tailwind_classes}
          type="password"
          {...register("password_confirmation")}
          placeholder="Confirm Password"
        />
        {errors.password_confirmation && (
          <p className="text-red-500  mt-2">
            {errors.password_confirmation.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>
          Phone Number<span className="text-red-500">*</span>
        </label>
        <input
          className={input_tailwind_classes}
          {...register("phone_number")}
          type="text"
          placeholder="Phone Number"
        />
        {errors.phone_number && (
          <p className="text-red-500  mt-2">{errors.phone_number.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className={label_tailwind_classes}>
          Salary<span className="text-red-500">*</span>
        </label>
        <input
          className={input_tailwind_classes}
          {...register("salary")}
          type="text"
          placeholder="Salary"
        />
        {errors.salary && (
          <p className="text-red-500  mt-2">{errors.salary.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
      </div>
    </form>
  );
}
