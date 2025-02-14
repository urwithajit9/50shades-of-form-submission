"use client";
import React from "react";
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
        console.error("Network response was not ok:", response.statusText);
        const errorText = await response.text(); // Get error details from the server
        throw new Error(errorText || "Network response was not ok");
      }
      const result = await response.json();
      console.log("Form submitted:", data);
      console.log("Server Response:", result);
      alert(`Thank you, ${data.name}! Your message has been received.`);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Registration failed. Please try again.");
      throw error; // Rethrow the error to be caught by the calling code
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <RegisterForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default page;
