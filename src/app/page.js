// export default function Home() {
//   return <div>Hello World</div>;
// }
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-blue-800 mb-6">
            List Management System
          </h1>
          <p className="text-xl text-gray-700 mb-12">
            A powerful platform for admin users to manage agents and distribute
            lists efficiently
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => router.push("/login")}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="px-8 py-3 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-lg shadow-md border border-blue-300 transition-colors cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
