You can use **TanStack Query** (formerly React Query) to fetch data from a REST API and display it in your Next.js frontend. Below is a step-by-step guide to setting up **TanStack Query** in your Next.js app.

---

### **1. Install TanStack Query & Axios**

Since you're using **Axios** for API requests, install both packages:

```sh
yarn add @tanstack/react-query axios
```

or using npm:

```sh
npm install @tanstack/react-query axios
```

---

### **2. Set Up the Query Client Provider**

Wrap your application with the `QueryClientProvider` in `src/app/layout.tsx` (for Next.js App Router):

```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

---

### **3. Create a Fetch Function Using Axios**

Define a function to fetch data using Axios:

```tsx
import axios from "axios";

export const fetchRepos = async () => {
  const response = await axios.get(
    "https://api.github.com/users/octocat/repos"
  );
  return response.data;
};
```

---

### **4. Use TanStack Query to Fetch and Display Data**

Create a component that fetches and displays data:

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchRepos } from "@/lib/api"; // Adjust path if needed

export default function ReposList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["repos"], // Unique key for caching
    queryFn: fetchRepos, // API fetching function
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  return (
    <div>
      <h2>GitHub Repositories</h2>
      <ul>
        {data.map((repo: any) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

### **5. Use the Component in Your Page**

Import and use the `ReposList` component inside your page:

```tsx
import ReposList from "@/components/ReposList";

export default function HomePage() {
  return (
    <main>
      <h1>GitHub Repositories</h1>
      <ReposList />
    </main>
  );
}
```

---

### **6. Optional: Enable Query DevTools**

For debugging, install **React Query Devtools**:

```sh
yarn add @tanstack/react-query-devtools
```

Modify `layout.tsx`:

```tsx
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

---

## **Key Features of TanStack Query**

✔ **Automatic caching** & re-fetching
✔ **Optimistic updates** (for mutations)
✔ **Pagination & infinite scrolling**
✔ **Background refetching** for fresh data

Would you like to add pagination or mutations (POST/PUT/DELETE) with TanStack Query? 🚀
