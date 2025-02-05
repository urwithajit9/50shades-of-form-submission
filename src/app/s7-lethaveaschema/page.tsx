"use client";
import { FormData } from "./type";
import RegisterForm from "./RegisterForm";

const api_endpoint = "http://127.0.0.1:8000/api/registeruser/";
function page() {
  // Function to handle form submission
  const handleFormSubmit = async (data: FormData) => {
    // Remove password_confirmation from the data before sending
    // const { password_confirmation, ...filteredData } = data;
    try {
      // making connection to backend
      const response = await fetch(api_endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        // body: JSON.stringify(filteredData), // Send only necessary data
      });

      // check response
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Form submitted:", data);
      console.log("Server Response:", result);
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
