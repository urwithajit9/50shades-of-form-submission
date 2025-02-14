"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchRepos } from "../lib/getData"; // Adjust path if needed

export default function UserDataList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["registeredUsers"], // Unique key for caching
    queryFn: fetchRepos, // API fetching function
    refetchInterval: 2000, // Fetch new data every 5 seconds
    // refetchOnWindowFocus: true, // Auto refetch when tab is focused
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  return (
    <div>
      <h2>Registered Users</h2>
      <ul>
        {data.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
