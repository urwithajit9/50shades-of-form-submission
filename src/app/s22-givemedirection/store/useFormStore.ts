// store/useFormStore.ts
import { create } from "zustand";
import { formSchema, FormData } from "../type";

// Define Zustand store
interface FormState {
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
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

  // Validate form using Zod schema
  validateForm: () => {
    const validation = formSchema.safeParse(get().formData);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      set({ errors: errors as FormState["errors"] });
      return false;
    }
    return true;
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

  // Handle form submission
  submitForm: async () => {
    // if (!get().validateForm()) return;
    console.log("Inside zustand submitform");

    set({ isSubmitting: true });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/registeruser/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(get().formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Server Response:", result);
      alert(
        `Thank you, ${get().formData.name}! Your registration was successful.`
      );
      get().resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      set({ errors: { email: "Registration failed. Please try again." } });
      throw new Error("Network response was not ok");
    } finally {
      set({ isSubmitting: false });
    }
  },
}));
