"use client";
import { useFormStore } from "../store/useFormStore";

export default function RegisterForm() {
  const { formData, errors, isSubmitting, updateField, submitForm } =
    useFormStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateField(name as keyof typeof formData, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm();
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
        <label className={label_tailwind_classes}>
          Name<span className="text-red-500">*</span>
        </label>
        <input
          className={input_tailwind_classes}
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        {errors.name && <p className="text-red-500  mt-2">{errors.name[0]}</p>}
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>
          Email<span className="text-red-500">*</span>
        </label>
        <input
          className={input_tailwind_classes}
          name="email"
          type="text" // Change type to text for email to have error msg from zod instead of default popup message
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500  mt-2">{errors.email[0]}</p>
        )}
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>
          Password<span className="text-red-500">*</span>
        </label>
        <input
          className={input_tailwind_classes}
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
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
          <p className="text-red-500">{errors.password[0]}</p>
        )}
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>
          Confirm Password<span className="text-red-500">*</span>
        </label>
        <input
          className={input_tailwind_classes}
          name="password_confirmation"
          type="password"
          value={formData.password_confirmation}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        {errors.password_confirmation && (
          <p className="text-red-500  mt-2">{errors.password_confirmation}</p>
        )}
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>
          Phone Number<span className="text-red-500">*</span>
        </label>
        <input
          className={input_tailwind_classes}
          name="phone_number"
          type="text"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        {errors.phone_number && (
          <p className="text-red-500  mt-2">{errors.phone_number}</p>
        )}
      </div>

      <div className="mb-4">
        <label className={label_tailwind_classes}>
          Salary<span className="text-red-500">*</span>
        </label>
        <input
          className={input_tailwind_classes}
          name="salary"
          type="text"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary"
        />
        {errors.salary && <p className="text-red-500  mt-2">{errors.salary}</p>}
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
