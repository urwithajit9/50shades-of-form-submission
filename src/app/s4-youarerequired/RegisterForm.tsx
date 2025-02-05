"use client";
import { FormData } from "./type";
import { useState } from "react";

interface FormProps {
  onSubmit: (formData: FormData) => void;
}
export default function RegisterForm({ onSubmit }: FormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone_number: "",
    salary: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
      salary: 0,
    }); // Reset form
  };

  const label_tailwind_classes = "block text-gray-700 text-sm font-bold mb-2";
  const input_tailwind_classes =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h1 className="text-2xl font-bold mb-4 border-b-2 border-blue-500">
        Register
      </h1>
      <div className="mb-4">
        <label className={label_tailwind_classes}>Name</label>
        <input
          className={input_tailwind_classes}
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>Email</label>
        <input
          className={input_tailwind_classes}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>Password</label>
        <input
          className={input_tailwind_classes}
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>Confirm Password</label>
        <input
          className={input_tailwind_classes}
          name="password_confirmation"
          type="password"
          value={formData.password_confirmation}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>Phone Number</label>
        <input
          className={input_tailwind_classes}
          name="phone_number"
          type="text"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
        />
      </div>

      <div className="mb-4">
        <label className={label_tailwind_classes}>Salary</label>
        <input
          className={input_tailwind_classes}
          name="salary"
          type="number"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>
      </div>
    </form>
  );
}
