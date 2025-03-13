"use client";
import { FormData } from "./type";
import RegisterForm from "./RegisterForm";
import { insertUser } from "./server/adduser";

function page() {
  // Function to handle form submission
  const handleFormSubmit = async (data: FormData) => {
    // Remove password_confirmation from the data before sending
    // const { password_confirmation, ...filteredData } = data;
    try {
      // making connection to backend
      const response = await insertUser(data);

      console.log("Server Response:", response);
      alert(`Thank you, ${data.name}! Your message has been received.`);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Registration failed. Please try again.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <RegisterForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default page;
