"use client";
import { useFormStore } from "../store/useFormStore";
import { FaUser, FaEnvelope, FaPhone, FaDollarSign } from "react-icons/fa";

export default function VisitingCard() {
  const { formData } = useFormStore();

  return (
    <div className="border p-6 shadow-lg rounded-lg w-80 bg-blue-200">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <FaUser className="text-blue-500" /> {formData.name || "Your Name"}
      </h2>
      <p className="text-gray-600 flex items-center gap-2">
        <FaEnvelope className="text-red-500" />
        {formData.email || "email@example.com"}
      </p>
      <p className="text-gray-600 flex items-center gap-2">
        <FaPhone className="text-green-500" />
        {formData.phone_number || "123-456-7890"}
      </p>
      <p className="text-gray-600 flex items-center gap-2">
        <FaDollarSign className="text-yellow-500" />
        Salary: {formData.salary ? `$${formData.salary}` : "$0000"}
      </p>
    </div>
  );
}
