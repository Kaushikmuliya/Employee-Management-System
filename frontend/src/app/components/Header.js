"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { isHR, logout } from "@/utils/auth.js";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isHR());
  }, []);

  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Employee Management</h1>
        <div className="space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          {loggedIn && <Link href="/dashboard" className="hover:underline">Dashboard</Link>}
          {loggedIn && (
            <button
              onClick={() => {
                logout();
                window.location.href = "/";
              }}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
