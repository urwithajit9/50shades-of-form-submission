"use client";

export default function RegisterForm() {
  const label_tailwind_classes = "block text-gray-700 text-sm font-bold mb-2";
  const input_tailwind_classes =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-2xl font-bold mb-4 border-b-2 border-blue-500">
        Register
      </h1>
      <div className="mb-4">
        <label className={label_tailwind_classes}>Name</label>
        <input
          className={input_tailwind_classes}
          type="text"
          placeholder="Name"
        />
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>Email</label>
        <input
          className={input_tailwind_classes}
          type="email"
          placeholder="Email"
        />
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>Password</label>
        <input
          className={input_tailwind_classes}
          type="password"
          placeholder="Password"
        />
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>Confirm Password</label>
        <input
          className={input_tailwind_classes}
          type="password"
          placeholder="Confirm Password"
        />
      </div>
      <div className="mb-4">
        <label className={label_tailwind_classes}>Phone Number</label>
        <input
          className={input_tailwind_classes}
          type="text"
          placeholder="Phone Number"
        />
      </div>

      <div className="mb-4">
        <label className={label_tailwind_classes}>Salary</label>
        <input
          className={input_tailwind_classes}
          type="number"
          placeholder="Salary"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
          type="button"
        >
          Register
        </button>
      </div>
    </form>
  );
}
