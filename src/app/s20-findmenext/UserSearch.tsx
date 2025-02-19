"use client";
import { useState } from "react";

import Form from "next/form";
// import { searchUsers } from "./action/searchUsers";

export default function UserSearch() {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Search Users</h2>

      {/* Search Form */}
      {/* <Form action={searchUsers} className="flex flex-col gap-4"> */}
      <Form action="s20-findmenext/search" className="flex flex-col gap-4">
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
      </Form>
    </div>
  );
}
