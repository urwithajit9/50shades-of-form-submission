// store/useFormStore.ts
import { create } from "zustand";
import { registerUser } from "@/app/s15-lethaveactiontogether/actions/formActions"; // Import server action
import { FormData } from "../type";

import axios from "axios";

interface EmailStore {
  isEmailValid: boolean | null;
  emailError: string | null;
  checkEmail: (email: string) => Promise<void>;
  resetEmailStatus: () => void;
}

export const useEmailStore = create<EmailStore>((set) => ({
  isEmailValid: null,
  emailError: null,
  checkEmail: async (email: string) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/check-email?email=${email}`
      );
      const isAvailable = await response.data.isAvailable; // Assuming API returns { available: true/false }
      if (!isAvailable) {
        set({ isEmailValid: false, emailError: "Email is already taken" });
      } else {
        set({ isEmailValid: true, emailError: null });
      }
    } catch (error) {
      console.error("Email validation error:", error);
      set({
        isEmailValid: false,
        emailError: "Error checking email availability",
      });
    }
  },
  resetEmailStatus: () => {
    set({ isEmailValid: null, emailError: null });
  },
}));

// Define Zustand store
interface FormState {
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>> & { global?: string };
  isSubmitting: boolean;
  updateField: (field: keyof FormData, value: string) => void;
  // validateForm: () => boolean; // this will be taken care by React Hook form with zod resolver
  resetForm: () => void;
  submitForm: () => Promise<void>;
}

export const useFormStore = create<FormState>((set, get) => ({
  formData: {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone_number: "",
    salary: "",
  },
  errors: {},
  isSubmitting: false,

  // Update a specific field in form data
  updateField: (field, value) => {
    set((state) => ({
      formData: { ...state.formData, [field]: value },
      errors: { ...state.errors, [field]: "" }, // Reset error when user types
    }));
  },

  // Reset form fields
  resetForm: () => {
    set({
      formData: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone_number: "",
        salary: "",
      },
      errors: {},
      isSubmitting: false,
    });
  },
  // Submit form securely via Server Action
  submitForm: async () => {
    set({ isSubmitting: true });
    const result = await registerUser(get().formData); // Calls server action

    if (result.success) {
      set({ errors: {} });
      set((state) => ({
        formData: {
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
          phone_number: "",
          salary: "",
        },
      }));
    } else {
      // Update the errors field with errors returned from the server action:
      set({ errors: result.errors || { global: result.message } });
      // Optionally, throw error if you want to prevent further actions:
      set({ isSubmitting: false });

      throw new Error("Submission failed");
    }

    set({ isSubmitting: false });
  },
}));
