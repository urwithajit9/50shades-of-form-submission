// store/useUserStore.ts
import { create } from "zustand";
import { FormData, User, formSchema } from "../type"; // FormData includes fields: name, email, password, password_confirmation, phone_number, salary

// Define the store state and actions
interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  addUser: (data: FormData) => Promise<void>;
  updateUser: (id: string, data: FormData) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,

  // Fetch users from the backend
  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("http://127.0.0.1:8000/api/registeruser/");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data: User[] = await res.json();
      set({ users: data });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // Add a new user (registration)
  addUser: async (data: FormData) => {
    try {
      // Assume server validates and returns the new user with an id
      const res = await fetch("http://127.0.0.1:8000/api/registeruser/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to register user");
      const newUser: User = await res.json();
      set((state) => ({ users: [...state.users, newUser] }));
    } catch (err) {
      console.error(err);
    }
  },

  // Update an existing user
  updateUser: async (id: string, data: FormData) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/registeruser/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update user");
      const updatedUser: User = await res.json();
      set((state) => ({
        users: state.users.map((user) => (user.id === id ? updatedUser : user)),
      }));
    } catch (err) {
      console.error(err);
    }
  },

  // Delete a user
  deleteUser: async (id: string) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/registeruser/${id}/`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");
      set((state) => ({ users: state.users.filter((user) => user.id !== id) }));
    } catch (err) {
      console.error(err);
    }
  },
}));
