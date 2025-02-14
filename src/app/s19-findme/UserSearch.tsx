"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

const fetchUsers = async (search: string) => {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/search-users?search=${search}`
  );
  return response.data;
};

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { register, handleSubmit, watch } = useForm<{ search: string }>();

  // Fetch users dynamically when search term changes
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", searchTerm],
    queryFn: () => fetchUsers(searchTerm),
    enabled: !!searchTerm, // Fetch only when there is a search term
  });

  const onSubmit = (data: { search: string }) => {
    setSearchTerm(data.search);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-lg font-semibold mb-4">Search Users</h2>

      {/* Search Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-2">
        <input
          {...register("search")}
          type="text"
          placeholder="Enter name..."
          className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </form>

      {/* Loading & Error States */}
      {isLoading && <p className="mt-4 text-blue-500">Loading users...</p>}
      {isError && <p className="mt-4 text-red-500">Error fetching users.</p>}

      {/* User List */}
      <ul className="mt-4">
        {users?.length > 0 ? (
          users.map((user: { id: number; name: string; email: string }) => (
            <li key={user.id} className="border-b py-2">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-500 mt-2">No users found.</p>
        )}
      </ul>
    </div>
  );
};

export default UserSearch;
