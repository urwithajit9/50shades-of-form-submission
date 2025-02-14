"use client";
import { useState } from "react";
import axios from "axios";

export default function UserSearch() {
  const [users, setUsers] = useState([]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const search = formData.get("search") as string;
    const searchBy = formData.get("searchBy") as string;

    const response = await axios.get(
      `http://127.0.0.1:8000/api/search-users?search=${search}&searchBy=${searchBy}`
    );
    setUsers(response.data);
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Search Users</h2>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="search"
          placeholder="Enter name or email..."
          required
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Search Options */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1">
            <input type="radio" name="searchBy" value="name" defaultChecked />
            Name
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" name="searchBy" value="email" />
            Email
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

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
