import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cook County Order Builder",
  description: "Generates proposed orders for use in the Circuit Court of Cook County, Illinois",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={'h-full antialiased'}
    >
      <body className="min-h-full flex flex-col items-center justify-center">{children}</body>
    </html>
  );
}
