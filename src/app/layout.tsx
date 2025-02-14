"use client";
// import type { Metadata } from "next";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

import "./globals.css";

// export const metadata: Metadata = {
//   title: "50 Shades of Form Submissions",
//   description:
//     "Exploring different ways and design for form submission using React and NextJs",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
