"use client";
import React, { useEffect } from "react";
import { formSchema, FormData } from "../type";
import { useFormStore } from "../store/useFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

// import { useQuery, useQueryClient } from "@tanstack/react-query";

interface RegisterFormProps {
  initialData?: FormData; // If provided, the form is in "edit" mode
  onSubmit: (data: FormData) => Promise<void>;
}

export default function RegisterForm({
  initialData,
  onSubmit,
}: RegisterFormProps) {
  // Get submitForm from our global Zustand store.
  const { formData, updateField, submitForm, errors, isSubmitting } =
    useFormStore();

  // Initialize react-hook-form with the Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    // validation on change
    mode: "onChange", // Validate fields on every change
    reValidateMode: "onChange", // Revalidate on change (if necessary)
    // You can pre-populate default values from your Zustand store if needed:
    defaultValues: initialData || formData,
  });

  // If initialData changes, reset the form with the new data (useful for edit mode)
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  // When the form is submitted:
  const onSubmitHandler: SubmitHandler<FormData> = async (data) => {
    try {
      // Call the Zustand store's submit function, which in turn calls the server action.
      await submitForm();
      // Only reset local RHF if submission succeeded (since the store clears formData on success).
      reset();
    } catch (error) {
      console.error("Submission error:", error);
      // Errors are now synced in the Zustand store (accessible via errors)
    }
  };

  const handleChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      updateField(field, e.target.value);
    };

  const {
    ref: nameRef,
    onChange: nameOnChange,
    ...nameRest
  } = register("name", { required: "Name is required" });

  const {
    ref: emailRef,
    onChange: emailOnChange,
    ...emailRest
  } = register("email", { required: "Email is required" });

  const {
    ref: phonenumberRef,
    onChange: phonenumberOnChange,
    ...phonenumberRest
  } = register("phone_number", { required: "Phone Number is required" });

  const {
    ref: salaryRef,
    onChange: salaryOnChange,
    ...salaryRest
  } = register("salary", { required: "Salary is required" });

  const {
    ref: passwordRef,
    onChange: passwordOnChange,
    ...passwordRest
  } = register("password", { required: "Password is required" });

  const {
    ref: confirmPasswordRef,
    onChange: confirmPasswordOnChange,
    ...confirmPasswordRest
  } = register("password_confirmation", {
    required: "Confirm Password is required",
  });

  const combinedOnChangeForName = (e: React.ChangeEvent<HTMLInputElement>) => {
    nameOnChange(e); // Let react-hook-form update and validate
    handleChange("name")(e); // Update Zustand store for the "name" field
  };

  const combinedOnChangeForEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    emailOnChange(e); // Let react-hook-form update and validate
    handleChange("email")(e); // Update Zustand store for the "email" field
  };

  const combinedOnChangeForSalary = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    emailOnChange(e); // Let react-hook-form update and validate
    handleChange("salary")(e); // Update Zustand store for the "email" field
  };
  const combinedOnChangeForPhoneNumber = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    phonenumberOnChange(e); // Let react-hook-form update and validate
    handleChange("phone_number")(e); // Update Zustand store for the "phone_number" field
  };

  const combinedOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    passwordOnChange(e); // Let react-hook-form update and validate
    handleChange("password")(e); // Update Zustand store for the "password" field
  };

  const combinedOnChangePasswordConfirmation = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    confirmPasswordOnChange(e); // Let react-hook-form update and validate
    handleChange("password_confirmation")(e); // Update Zustand store for the "password_confirmation" field
  };

  const label_tailwind_classes = "block text-gray-700 text-sm font-bold mb-2";
  const input_tailwind_classes =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h1 className="text-2xl font-bold mb-4 border-b-2 border-blue-500">
        {initialData ? "Edit User" : "Register"}
      </h1>
      <div className="mb-4">
        <label className={label_tailwind_classes}>
          Name<span className="text-red-500">*</span>
        </label>
        <input
          className={input_tailwind_classes}
          // {...register("name")}
          value={formData.name} // Bind to Zustand store
          {...nameRest}
          ref={nameRef}
          onChange={combinedOnChangeForName}
          type="text"
          placeholder="Name"
        />
        {/* Display error from react-hook-form validation or Zustand global errors */}
        {formErrors.name ? (
          <p className="text-red-500 mt-2">{formErrors.name.message}</p>
        ) : errors.name ? (
          <p className="text-red-500 mt-2">{errors.name}</p>
        ) : null}
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>
          Email<span className="text-red-500">*</span>
        </label>
        <input
          className={input_tailwind_classes}
          value={formData.email}
          {...emailRest}
          ref={emailRef}
          onChange={combinedOnChangeForEmail}
          type="text" // Change type to text for email to have error msg from zod instead of default popup message
          placeholder="Email"
        />
        {formErrors.email ? (
          <p className="text-red-500 mt-2">{formErrors.email.message}</p>
        ) : errors.email ? (
          <p className="text-red-500 mt-2">{errors.email}</p>
        ) : null}
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>
          Password<span className="text-red-500">*</span>
        </label>
        <input
          className={input_tailwind_classes}
          value={formData.password}
          {...passwordRest}
          ref={passwordRef}
          onChange={combinedOnChangePassword}
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
        {formErrors.password ? (
          <p className="text-red-500 mt-2">{formErrors.password.message}</p>
        ) : errors.password ? (
          <p className="text-red-500 mt-2">{errors.password}</p>
        ) : null}
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>
          Confirm Password<span className="text-red-500">*</span>
        </label>
        <input
          className={input_tailwind_classes}
          value={formData.password_confirmation}
          {...confirmPasswordRest}
          ref={confirmPasswordRef}
          onChange={combinedOnChangePasswordConfirmation}
          type="password"
          placeholder="Confirm Password"
        />
        {formErrors.password_confirmation ? (
          <p className="text-red-500 mt-2">
            {formErrors.password_confirmation.message}
          </p>
        ) : errors.password_confirmation ? (
          <p className="text-red-500 mt-2">{errors.password_confirmation}</p>
        ) : null}
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>
          Phone Number<span className="text-red-500">*</span>
        </label>
        <input
          className={input_tailwind_classes}
          {...phonenumberRest}
          ref={phonenumberRef}
          value={formData.phone_number}
          onChange={combinedOnChangeForPhoneNumber}
          type="text"
          placeholder="Phone Number"
        />
        {formErrors.phone_number ? (
          <p className="text-red-500 mt-2">{formErrors.phone_number.message}</p>
        ) : errors.phone_number ? (
          <p className="text-red-500 mt-2">{errors.phone_number}</p>
        ) : null}
      </div>

      <div className="mb-4">
        <label className={label_tailwind_classes}>
          Salary<span className="text-red-500">*</span>
        </label>
        <input
          className={input_tailwind_classes}
          {...salaryRest}
          ref={salaryRef}
          onChange={combinedOnChangeForSalary}
          value={formData.salary}
          type="text"
          placeholder="Salary"
        />
        {formErrors.salary ? (
          <p className="text-red-500 mt-2">{formErrors.salary.message}</p>
        ) : errors.salary ? (
          <p className="text-red-500 mt-2">{errors.salary}</p>
        ) : null}
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={isSubmitting}
        >
          {initialData ? "Update User" : "Register"}
        </button>
      </div>
      {errors.global && (
        <p className="text-red-500 text-center mt-2">{errors.global}</p>
      )}
    </form>
  );
}
