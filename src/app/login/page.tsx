"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    try {
      const response = await axios.post("/api/auth", { email, password });
      setToken(response.data.token); // Store token (e.g., in localStorage or cookies)
      if (token) {
        console.log("token received Successfully");
      }
      setErrorMessage("");
      const username = email.split("@")[0];
      localStorage.setItem("username", username);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
      toast.success("Login successful!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        closeButton: false,
        style: {
          width: "300px",
          fontSize: "18px",
          padding: "0 12px",
          borderRadius: "6px",
          height: "20px",
          boxShadow: "0px 0px 10px 3px #9b9b9b",
        },
      });
    } catch (error) {
      toast.error("Login failed.", {
        position: "bottom-right",
        autoClose: 1000,
        theme: "colored",
        hideProgressBar: true,
        style: {
          width: "300px",
          fontSize: "18px",
          padding: "0 12px",
          borderRadius: "6px",
          height: "20px",
          boxShadow: "0px 0px 10px 3px #9b9b9b",
        },
      });
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>
        {errorMessage && (
          <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Log In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
