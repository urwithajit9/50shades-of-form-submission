import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "50 Shades of Form Submissions",
  description:
    "Exploring different ways and design for form submission using React and NextJs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
