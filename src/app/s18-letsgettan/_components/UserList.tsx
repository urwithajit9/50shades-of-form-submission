// components/UserList.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import UserTable from "./UserTable";
import UserCards from "./UserCards";
import RegisterForm from "./RegisterForm";
import { User, FormData } from "../type";

export default function UserList() {
  const { fetchUsers } = useUserStore();
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Callback for edit: load selected user into the form
  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  // Callback for form submission after editing
  const handleFormSubmit = async (data: FormData) => {
    if (editingUser) {
      // Call update action
      await useUserStore.getState().updateUser(editingUser.id, data);
      setEditingUser(null);
    } else {
      // Call add action
      await useUserStore.getState().addUser(data);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Registered Users</h1>
        <div>
          <button
            onClick={() => setViewMode("table")}
            className="mr-2 p-2 bg-gray-200 rounded"
          >
            Table View
          </button>
          <button
            onClick={() => setViewMode("card")}
            className="p-2 bg-gray-200 rounded"
          >
            Card View
          </button>
        </div>
      </div>

      {/* Show the form for registration/editing */}
      <RegisterForm
        initialData={editingUser || undefined}
        onSubmit={handleFormSubmit}
      />

      {/* Display users in the selected view */}
      {viewMode === "table" ? (
        <UserTable onEdit={handleEdit} />
      ) : (
        <UserCards onEdit={handleEdit} />
      )}
    </div>
  );
}
