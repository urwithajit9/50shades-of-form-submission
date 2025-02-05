"use client";
import { FormData } from "./type";
import RegisterForm from "./RegisterForm";
function page() {
  // Function to handle form submission
  const handleFormSubmit = async (data: FormData) => {
    console.log("Form submitted:", data);
    alert(`Thank you, ${data.name}! Your message has been received.`);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <RegisterForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default page;
