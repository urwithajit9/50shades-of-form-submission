// components/UserTable.tsx
"use client";

import React from "react";
import { useUserStore, User } from "../store/useUserStore";

interface UserTableProps {
  onEdit: (user: User) => void;
}

export default function UserTable({ onEdit }: UserTableProps) {
  const { users, deleteUser } = useUserStore();

  return (
    <table className="min-w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Phone</th>
          <th className="border p-2">Salary</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="text-center">
            <td className="border p-2">{user.name}</td>
            <td className="border p-2">{user.email}</td>
            <td className="border p-2">{user.phone_number}</td>
            <td className="border p-2">{user.salary}</td>
            <td className="border p-2 space-x-2">
              <button
                onClick={() => onEdit(user)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteUser(user.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
