"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://list-project-backend-1.onrender.com/api/subagents/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log(data);
      if (!response.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("agenttoken", data.token);
      //   console.log(data.token);
      router.push("/agentdashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-800">
          Welcome Back
        </h2>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              required
            />
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Login"}
          </button>
        </form>

        <div className="text-center mt-5">
          <Link
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Back to Admin page
          </Link>
        </div>
      </div>
    </div>
  );
}
