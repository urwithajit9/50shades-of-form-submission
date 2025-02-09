// src/app/actions/registerUser.ts
"use server";

import { formSchema, FormData } from "../type"; // your Zod schema and types

export async function registerUser(data: FormData) {
  // Validate the data using Zod
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    // Convert errors: Zod returns arrays, so join them into a single string per field.
    const formattedErrors = Object.fromEntries(
      Object.entries(validation.error.flatten().fieldErrors).map(
        ([field, messages]) => [field, messages?.join(", ") || ""]
      )
    );
    return { success: false, errors: formattedErrors };
  }

  try {
    // Simulate secure API call or database operation:
    const response = await fetch("http://127.0.0.1:8000/api/registeruser/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validation.data),
    });

    if (!response.ok) {
      throw new Error("Server error during registration");
    }

    const result = await response.json();
    return { success: true, message: "Registration successful!", data: result };
  } catch (error) {
    // Return a generic error if something goes wrong on the server.
    return {
      success: false,
      errors: { global: "Registration failed. Please try again." },
    };
  }
}

export async function checkEmailAvailability(email: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/check-email?email=${email}`);
    if (!res.ok) throw new Error("Failed to validate email");
    
    const data = await res.json();
    return data.isAvailable; // Should return { available: true/false }
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
}