import { useState } from "react";
import { loginAsHR } from "../utils/auth";

export default function LoginSignupPopup({ onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginAsHR(email, password)) {
      onLoginSuccess();
      onClose();
      window.location.href = "/dashboard"; // Redirect after login
    } else {
      setError("Invalid credentials!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded mb-3"
          />
          <button
            type="submit"       
            className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <button className="mt-3 text-red-500" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
