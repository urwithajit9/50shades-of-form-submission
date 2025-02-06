"use client";
import { useRef } from "react";
import { useFormStore } from "../store/useFormStore";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaDollarSign,
  FaDownload,
} from "react-icons/fa";
import html2canvas from "html2canvas";

export default function DownloadableVisitingCard() {
  const { formData } = useFormStore();
  const cardRef = useRef<HTMLDivElement>(null);

  // Function to Capture and Download Card as Image
  const downloadCardAsImage = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current);
      const image = canvas.toDataURL("image/png");

      // Create a download link
      const link = document.createElement("a");
      link.href = image;
      link.download = "visiting_card.png";
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Card Container (Reference for Screenshot) */}
      <div
        ref={cardRef}
        className="border p-2 shadow-lg rounded-lg w-80 bg-white"
      >
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FaUser className="text-blue-500" />
          {formData.name || "Your Name"}
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
          Salary: {formData.salary ? `$${formData.salary}` : "Not Provided"}
        </p>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadCardAsImage}
        className="mt-4 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        <FaDownload />
        Download as Image
      </button>
    </div>
  );
}
