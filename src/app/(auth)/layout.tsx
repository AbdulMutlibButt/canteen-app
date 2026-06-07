import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/20 py-12 px-4">
      {children}
    </div>
  );
}
