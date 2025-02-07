"use client";
import React from "react";
import { formSchema, FormData } from "./type";
import { useFormStore } from "./store/useFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

export default function RegisterForm() {
  // Get submitForm from our global Zustand store.
  const { submitForm, resetForm, updateField, isSubmitting } = useFormStore();

  // Initialize react-hook-form with the Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    // You can pre-populate default values from your Zustand store if needed:
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
      salary: "",
    },
  });

  // This is the function called after react-hook-form validates the form successfully.
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Validated data from react-hook-form:", data);
    // Optionally update Zustand store fields (if you want to keep them in sync):, but in this example
    // react-hook-form is the "source of truth" and we update Zustand on each input change.
    try {
      await updateField("name", data.name); // (optional, if you need it)
      await updateField("email", data.email);
      await updateField("password", data.password);
      await updateField("password_confirmation", data.password_confirmation);
      await updateField("phone_number", data.phone_number);
      await updateField("salary", data.salary);

      // For simplicity, we directly pass data to our store submission.
      await submitForm(data);
      reset();
      resetForm(); // Reset Zustand store fields for ui state
    } catch (error) {
      console.log(
        "Submission error, form data retained for correction.",
        error
      );

      // Handle error
    }
  };

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
        <label className={label_tailwind_classes}>
          Name<span className="text-red-500">*</span>
        </label>
        <input
          className={input_tailwind_classes}
          {...register("name")}
          type="text"
          placeholder="Name"
        />
        {errors.name && (
          <p className="text-red-500  mt-2">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>
          Email<span className="text-red-500">*</span>
        </label>
        <input
          className={input_tailwind_classes}
          {...register("email")}
          type="text" // Change type to text for email to have error msg from zod instead of default popup message
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
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        {/* {errors.password && (
          <p className="text-red-500 text-xs italic mt-2">{errors.password}</p>
        )} */}
        {/* {errors.password && (
          <ul className="text-red-500">
            {[errors.password].flat().map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )} */}
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>
          Confirm Password<span className="text-red-500">*</span>
        </label>
        <input
          className={input_tailwind_classes}
          {...register("password_confirmation")}
          type="password"
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
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
      </div>
    </form>
  );
}
