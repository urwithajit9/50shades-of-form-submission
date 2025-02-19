"use client";
import { useState } from "react";
import React from "react";
import { useSearchParams } from "next/navigation"; // Get URL params
import { searchUsers } from "../action/searchUsers";

function Search() {
  const [users, setUsers] = useState([]);
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Search Results */}
      <div className="mt-6">
        {users.length > 0 ? (
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-3">Search Results:</h3>
            <ul className="space-y-2">
              {users.map((user: any) => (
                <li
                  key={user.id}
                  className="p-3 border-b border-gray-300 last:border-none"
                >
                  <span className="font-semibold">{user.name}</span> -{" "}
                  <span className="text-gray-600">{user.email}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 mt-3">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default Search;
