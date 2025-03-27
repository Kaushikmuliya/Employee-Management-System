"use client";

export function loginAsHR(email, password) {
  if (email === "hr@example.com" && password === "password123") {
    localStorage.setItem("isHR", "true");
    return true;
  }
  return false;
}

export function isHR() {
  return localStorage.getItem("isHR") === "true";
}

export function logout() {
  localStorage.removeItem("isHR");
}
