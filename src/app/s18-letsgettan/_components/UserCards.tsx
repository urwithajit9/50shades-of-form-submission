// components/UserCards.tsx
"use client";

import React from "react";
import { useUserStore } from "../store/useUserStore";
import { User } from "../type";

interface UserCardsProps {
  users?: User[];
  onEdit: (user: User) => void;
}

export default function UserCards({ users, onEdit }: UserCardsProps) {
  const { deleteUser } = useUserStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {users?.map((user) => (
        <div key={user.id} className="border p-4 rounded shadow-md">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone_number}
          </p>
          <p>
            <strong>Salary:</strong> {user.salary}
          </p>
          <div className="mt-2 space-x-2">
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
          </div>
        </div>
      ))}
    </div>
  );
}
