// store/useFormStore.ts
import { create } from "zustand";
import { registerUser } from "@/app/s15-lethaveaction/actions/formActions"; // Import server action
import { FormData } from "../type";

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
