"use client";

import { useEffect } from "react";

import { isHR } from "@/utils/auth.js";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Dashboard() {
  useEffect(() => {
    if (!isHR()) {
      window.location.href = "/"; // Redirect to homepage if not HR
    }
  }, []);

  return (
    <div className="p-6">
      <Header/>
      <h1 className="text-2xl font-bold">HR Dashboard</h1>
      <p>Welcome to the Employee Management System!</p>
      <Footer/>
    </div>
  );
}
