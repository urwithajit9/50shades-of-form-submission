"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

const fetchUsers = async (search: string, searchBy: string) => {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/search-users?search=${search}&searchBy=${searchBy}`
  );
  return response.data;
};

const UserSearchWithEmailOrName = () => {
  const { register, handleSubmit, watch } = useForm<{
    search: string;
    searchBy: string;
  }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("name"); // Default search by name

  // Fetch users dynamically based on search term and filter
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", searchTerm, searchBy],
    queryFn: () => fetchUsers(searchTerm, searchBy),
    enabled: !!searchTerm, // Only fetch when there is a search term
  });

  const onSubmit = (data: { search: string; searchBy: string }) => {
    setSearchTerm(data.search);
    setSearchBy(data.searchBy);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-lg font-semibold mb-4">Search Users</h2>

      {/* Search Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register("search")}
          type="text"
          placeholder="Enter name or email..."
          className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Checkboxes for search criteria */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              value="name"
              {...register("searchBy")}
              defaultChecked
              className="mr-1"
            />
            <span>Search by Name</span>
          </label>

          <label className="flex items-center space-x-1">
            <input
              type="radio"
              value="email"
              {...register("searchBy")}
              className="mr-1"
            />
            <span>Search by Email</span>
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
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

export default UserSearchWithEmailOrName;
